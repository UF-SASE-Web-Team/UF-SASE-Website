import { useIsMobile } from "@/client/hooks/useIsMobile";
import { cn } from "@/shared/utils";
import React, { useEffect, useRef, useState } from "react";
import ImageButton from "./ImageButton";

interface SlideData {
  category: string;
  name: string;
  date: Date;
  semester: string;
  embedUrl: string;
  thumbnailUrl: string;
  relative_order: number;
}

interface Semester {
  name: string;
  slides: Array<SlideData>;
}

const EventsSlides: React.FC = () => {
  const [selectedSemester, setSelectedSemester] = useState<number>(0);
  const [view, setView] = useState<"slides" | "recordings">("slides");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [semesters, setSemesters] = useState<Array<Semester>>([]);
  const fetchedSlides = useRef(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const [selectedCategories, setSelectedCategories] = useState<Array<string>>([]);
  const categories = ["GBM", "Workshop", "Professional", "Service"];

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) => (prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]));
  };

  type RawSlideData = Omit<SlideData, "date"> & { date: string };

  useEffect(() => {
    (async () => {
      try {
        if (fetchedSlides.current) return;
        fetchedSlides.current = true;
        setLoading(true);

        const resp = await fetch("api/events/slides/", { method: "GET" });
        const rawData = (await resp.json()) as Array<RawSlideData>;

        if (!Array.isArray(rawData)) {
          throw new Error("Invalid data format");
        }

        const slideData: Array<SlideData> = rawData.map((deck) => ({
          ...deck,
          date: new Date(deck.date),
        }));

        const semesterMap = new Map<string, Semester>();
        slideData.forEach((deck) => {
          if (!semesterMap.has(deck.semester)) {
            semesterMap.set(deck.semester, { name: deck.semester, slides: [] });
          }
          semesterMap.get(deck.semester)?.slides.push(deck);
        });
        const display = Array.from(semesterMap.values());

        // sort slides within each semester by relative_order
        display.forEach((semester) => {
          semester.slides.sort((a, b) => {
            const r = (a.relative_order ?? 0) - (b.relative_order ?? 0);
            if (r !== 0) return r;
            return b.date.getTime() - a.date.getTime();
          });
        });

        const TERM_ORDER: Record<string, number> = { Spring: 1, Summer: 2, Fall: 3 };

        const termRank = (name: string) => {
          const parts = name.trim().split(/\s+/);
          let year = 0;
          let term = "";

          if (parts.length >= 2) {
            if (/^\d{4}$/.test(parts[0])) {
              year = Number(parts[0]);
              term = parts.slice(1).join(" ");
            } else if (/^\d{4}$/.test(parts[1])) {
              term = parts[0];
              year = Number(parts[1]);
            }
          }
          return year * 10 + (TERM_ORDER[term] ?? 0);
        };

        // newest semester first (2025 Spring before 2024 Fall)
        display.sort((a, b) => termRank(b.name) - termRank(a.name));

        setSemesters(display);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
        console.log("Slides could not be fetched", error);
      }
    })();
  }, []);

  const filteredSlides =
    semesters[selectedSemester]?.slides.filter((deck) => {
      if (selectedCategories.length === 0) return true;
      return selectedCategories.some((cat) => deck.category.toLowerCase().includes(cat.toLowerCase()));
    }) || [];

  return (
    <div className="relative flex w-screen flex-col items-center gap-5 p-5 font-redhat">
      {/* Semester Buttons */}
      {semesters.length > 0 && (
        <div className={cn("mb-6 w-full border-b-2 border-border pr-44", isMobile ? "scrollbar-thinner overflow-x-auto whitespace-nowrap" : "")}>
          <div className="flex w-max min-w-full gap-4">
            {semesters.map((semester) => (
              <button
                key={semester.name}
                className={cn(
                  "whitespace-nowrap border-b-2 p-3 px-6 transition-all duration-300 ease-in-out",
                  semesters[selectedSemester]?.name === semester.name
                    ? "border-saseGreen font-semibold text-foreground"
                    : "border-transparent text-foreground hover:border-gray-400",
                )}
                onClick={() => setSelectedSemester(semesters.indexOf(semester))}
              >
                {semester.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* View Dropdown (Top right) */}
      <div ref={dropdownRef} className="absolute right-5 top-5 z-10 hidden">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex w-40 items-center justify-between rounded-xl border border-foreground bg-background px-2 py-2 font-redhat text-foreground"
        >
          <span>{view === "slides" ? "Slides" : "Recordings"}</span>
          <svg
            className="h-4 transition-transform duration-200"
            style={{ transform: isDropdownOpen ? "rotate(270deg)" : "rotate(90deg)" }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div
          className={cn("absolute left-0 w-40 transform overflow-hidden rounded-xl border border-border bg-background transition-all duration-200", {
            "pointer-events-auto translate-y-0 opacity-100": isDropdownOpen,
            "pointer-events-none -translate-y-2 opacity-0": !isDropdownOpen,
          })}
        >
          {view === "slides" ? (
            <div
              onClick={() => {
                setView("recordings");
                setIsDropdownOpen(false);
              }}
              className="cursor-pointer p-2 font-redhat duration-300 ease-in-out hover:text-[1.05rem] hover:text-saseBlue"
            >
              Recordings
            </div>
          ) : (
            <div
              onClick={() => {
                setView("slides");
                setIsDropdownOpen(false);
              }}
              className="cursor-pointer p-2 font-redhat duration-300 ease-in-out hover:text-[1.05rem] hover:text-saseBlue"
            >
              Slides
            </div>
          )}
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category);
          return (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={cn(
                "rounded-full px-3 py-1 text-sm font-semibold transition-colors",
                isSelected
                  ? "bg-saseGreen text-white"
                  : "transform bg-gray-200 text-gray-800 transition duration-200 ease-in-out hover:scale-105 hover:bg-gray-300",
              )}
            >
              {category}
            </button>
          );
        })}
        {selectedCategories.length > 0 && (
          <button
            onClick={() => setSelectedCategories([])}
            className="rounded-full bg-red-400 px-3 py-1 text-xs font-semibold text-white hover:bg-red-500"
          >
            Clear
          </button>
        )}
      </div>

      {/* Slides Display */}
      {view === "slides" ? (
        error ? (
          <div className="flex h-full w-full items-center justify-center">
            <p className="text-lg text-red-500">Failed to load slides. Please try again.</p>
          </div>
        ) : loading ? (
          <div className="flex h-full w-full items-center justify-center">
            <p className="text-lg">Loading presentation slides...</p>
          </div>
        ) : semesters.length > 0 ? (
          <div className="grid h-full w-full grid-cols-1 justify-items-center gap-6 overflow-y-auto p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredSlides.length > 0 ? (
              filteredSlides.map((deck, index) => (
                <div key={index} className="flex w-full flex-col items-center">
                  {deck.thumbnailUrl && (
                    <ImageButton imageUrl={deck.thumbnailUrl} slideUrl={deck.embedUrl} title={deck.name} category={deck.category} />
                  )}
                  {deck.category && deck.name && (
                    <div className="mt-2 text-center text-sm text-foreground">
                      <p>
                        <span className="font-semibold">{deck.category}:</span> <span>{deck.name}</span>
                      </p>
                      <p className="text-xs text-foreground">
                        {deck.date.toLocaleDateString("en-US", {
                          year: "2-digit",
                          month: "numeric",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-full mt-10 text-center text-lg text-muted-foreground">No events found for the selected categories.</div>
            )}
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <p className="text-lg">No slides available.</p>
          </div>
        )
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <p className="font-redhat text-lg">Recordings coming soon...</p>
        </div>
      )}
    </div>
  );
};

export default EventsSlides;
