import { fetchMentorMenteeRelations } from "@/client/api/mentorMentee";
import { fetchUser } from "@/client/api/users";
import { useDimensions } from "@/client/hooks/useDimensions";
import { ClientOnly, SASE_COLORS } from "@/shared/utils";
import { useNavigate } from "@tanstack/react-router";
import * as d3 from "d3";
import React, { useEffect, useRef, useState } from "react";
import type { ForceGraphMethods, LinkObject, NodeObject } from "react-force-graph-2d";
import ForceGraph2D from "react-force-graph-2d";

// You need to define these yourself! Lol silly me.
type GraphNode = {
  id: string;
  name: string;
  username: string;
  role: "mentor" | "mentee" | "both";
};
type GraphLink = {
  source: string;
  target: string;
};

type FgNode = NodeObject<GraphNode>;
type FgLink = LinkObject<FgNode, GraphLink>;

interface GraphData {
  nodes: Array<GraphNode>;
  links: Array<GraphLink>;
}

const MentorMenteeGraph: React.FC = () => {
  const [containerRef, dims] = useDimensions<HTMLElement>();
  const fgRef = useRef<ForceGraphMethods<FgNode, FgLink> | null>(null);
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const centerRef = useRef<d3.ForceCenter<FgNode> | null>(null);
  const navigate = useNavigate();

  // fetch mentors & mentees once on mount
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    async function fetchData() {
      try {
        timeoutId = setTimeout(() => {
          setError("Request timed out. Please refresh the page.");
        }, 10000);

        const relations = await fetchMentorMenteeRelations();

        if (!relations || relations.length === 0) {
          clearTimeout(timeoutId);
          setGraphData({ nodes: [], links: [] });
          return;
        }

        const links = relations.map(({ menteeId: t, mentorId: m }) => ({
          source: m,
          target: t,
        }));

        const uniqueIds = Array.from(new Set(relations.flatMap(({ menteeId, mentorId }) => [mentorId, menteeId])));

        //fetch users with error handling for each user
        const userPromises = uniqueIds.map(async (id) => {
          try {
            return await fetchUser(id);
          } catch (err) {
            console.error(`Failed to fetch user ${id}:`, err);
            return null; //return null for failed fetches
          }
        });

        const usersWithNulls = await Promise.all(userPromises);
        const users = usersWithNulls.filter((u) => u !== null); //filter out failed fetches

        if (users.length === 0) {
          clearTimeout(timeoutId);
          setError("No valid users found in mentor-mentee relationships.");
          return;
        }

        const mentorsSet = new Set(relations.map((r) => r.mentorId));
        const menteesSet = new Set(relations.map((r) => r.menteeId));
        const nodes: Array<GraphNode> = users.map((u) => {
          const isMentor = mentorsSet.has(u.id);
          const isMentee = menteesSet.has(u.id);
          const role: GraphNode["role"] = isMentor && isMentee ? "both" : isMentor ? "mentor" : "mentee";

          //use username if firstName/lastName empty
          const fullName = u.firstName && u.lastName ? `${u.firstName} ${u.lastName}`.trim() : u.firstName || u.lastName || u.username;

          return {
            id: u.id,
            name: fullName,
            username: u.username,
            role,
          };
        });

        //filter out links where either user wasn't found
        const validUserIds = new Set(users.map((u) => u.id));
        const validLinks = links.filter((link) => validUserIds.has(link.source) && validUserIds.has(link.target));

        clearTimeout(timeoutId);
        setGraphData({ nodes, links: validLinks });
      } catch (err) {
        clearTimeout(timeoutId);
        console.error("Failed to load graph data", err);
        setError("Failed to load graph data. Please try again.");
      }
    }

    fetchData();
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // reconfigure forces & zoom on size or data change
  useEffect(() => {
    if (!dims || !fgRef.current || !graphData) return;
    const fg = fgRef.current;
    // We have global anti-gravity
    fg.d3Force("charge")?.strength(-10);

    fg.d3Force("link")?.distance(50);

    const centerF = d3.forceCenter(dims.width / 2, dims.height / 2);
    fg.d3Force("center", centerF);
    centerRef.current = centerF;

    const randomWind = () => {
      let nodes: Array<FgNode> = [];
      type State = { vxBias: number; vyBias: number; nextAt: number };
      let states: Array<State> = [];
      const strength = 0.05;

      function force() {
        const now = Date.now();
        nodes.forEach((n, i) => {
          const s = states[i];
          // time to pick a new random bias
          if (now >= s.nextAt) {
            s.vxBias = (Math.random() - 0.5) * strength;
            s.vyBias = (Math.random() - 0.5) * strength;
            // schedule next change 1–3 s from now
            s.nextAt = now + 1000 + Math.random() * 2000;
          }
          const nn = n as FgNode;
          nn.vx = (nn.vx ?? 0) + s.vxBias;
          nn.vy = (nn.vy ?? 0) + s.vyBias;
        });
      }

      // D3 calls this once so we can capture the node array
      force.initialize = (x: Array<FgNode>) => {
        nodes = x;
        states = nodes.map(() => ({
          vxBias: 0,
          vyBias: 0,
          nextAt: Date.now() + 1000 + Math.random() * 2000,
        }));
      };

      return force;
    };
    // register it under some name
    fg.d3Force("randomWind", randomWind());

    // Initial zoom to fit
    setTimeout(() => fg.zoomToFit(0, 100), 100);
  }, [dims, graphData]);

  return (
    <ClientOnly>
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "600px",
          border: "1px solid #ccc",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        {error && (
          <p
            style={{
              fontSize: "1.5rem",
              fontWeight: 500,
              color: "#ef4444",
              textAlign: "center",
              padding: "20px",
            }}
          >
            {error}
          </p>
        )}
        {!graphData && !error && (
          <p
            style={{
              fontSize: "2.25rem",
              fontWeight: 500,
            }}
          >
            Loading data…
          </p>
        )}
        {graphData && !error && (
          <ForceGraph2D
            nodeCanvasObjectMode={() => "after"}
            nodeCanvasObject={(node, ctx, globalScale) => {
              const nodeRadius = 5;
              const fontSize = Math.max(12 / globalScale, 3);
              const x = node.x ?? 0;
              const y = node.y ?? 0;
              ctx.font = `${fontSize}px Sans-Serif`;
              ctx.textAlign = "center";
              ctx.textBaseline = "top";
              const text = node.name || "";
              const textMetrics = ctx.measureText(text);
              const textWidth = textMetrics.width;
              const textHeight = fontSize;
              const padding = 2;
              //background rectangle
              ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
              ctx.fillRect(x - textWidth / 2 - padding, y + nodeRadius + 2 - padding, textWidth + padding * 2, textHeight + padding * 2);
              ctx.fillStyle = "#000";
              ctx.fillText(text, x, y + nodeRadius + 2);
            }}
            nodeColor={(node) => {
              switch (node.role) {
                case "mentor":
                  return SASE_COLORS.green;
                case "mentee":
                  return SASE_COLORS.blue;
                case "both":
                  return SASE_COLORS.blueLight;
              }
            }}
            onNodeClick={(node) => {
              navigate({ to: `/users/${node.username}/${node.id}` });
            }}
            ref={fgRef as React.MutableRefObject<ForceGraphMethods<FgNode, FgLink>>}
            graphData={graphData}
            width={dims?.width}
            height={dims?.height}
            nodeLabel={(d) => d.username}
            /** arrowheads on every link, pointing from mentor → mentee **/
            linkDirectionalArrowLength={6} // a nice, visible arrow size
            linkDirectionalArrowColor={() => "#555"} // match your link color
            linkDirectionalArrowRelPos={1} // arrow sits at the target end
            // linkDirectionalParticles={1}
            // linkDirectionalParticleSpeed={0.005}
            // linkDirectionalParticleWidth={2}
            // linkDirectionalParticleColor={() => "#999"}
          />
        )}
      </div>
    </ClientOnly>
  );
};

export default MentorMenteeGraph;
