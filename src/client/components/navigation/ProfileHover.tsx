import { fetchUser } from "@/client/api/users";
import { useAuth } from "@/client/hooks/AuthContext";
import type { SelectUser } from "@/shared/schema/userSchema";
import { Link } from "@tanstack/react-router";
import React, { useEffect, useRef, useState } from "react";

interface ProfileHoverProps {
  isLoggedIn: boolean;
  onLogout: () => void;
  isHomePage: boolean;
}

export const ProfileHover: React.FC<ProfileHoverProps> = ({ isHomePage, isLoggedIn, onLogout }) => {
  const { id } = useAuth();
  const [show, setShow] = useState(false);
  const [user, setUser] = useState<SelectUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hideTimeout = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    return () => {
      if (hideTimeout.current) window.clearTimeout(hideTimeout.current as number);
    };
  }, []);

  useEffect(() => {
    if (show && !user && id) {
      setLoading(true);
      fetchUser(id)
        .then((u) => setUser(u))
        .catch((err) => setError(String(err)))
        .finally(() => setLoading(false));
    }
  }, [show, id, user]);

  const handleEnter = () => {
    if (hideTimeout.current) {
      window.clearTimeout(hideTimeout.current as number);
      hideTimeout.current = null;
    }
    setShow(true);
  };

  const handleLeave = () => {
    // small delay so moving to popup won't immediately hide it
    hideTimeout.current = window.setTimeout(() => setShow(false), 150);
  };

  if (!isLoggedIn) {
    return (
      <Link to="/login">
        <button
          className={`inline-block transform rounded-full border-2 ${isHomePage ? "border-white" : "border-foreground"} whitespace-nowrap bg-saseBlue px-5 py-1 text-white duration-300 hover:scale-105 hover:bg-saseGreen hover:text-black`}
          onClick={onLogout}
        >
          Log In
        </button>
      </Link>
    );
  }

  return (
    <div ref={containerRef} className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave} onFocus={handleEnter} onBlur={handleLeave}>
      <Link to="/profile">
        <button
          aria-haspopup="true"
          aria-expanded={show}
          className={`transform rounded-full ${isHomePage ? "text-white" : "text-foreground"} duration-300 hover:scale-105`}
        >
          <span className="icon-[qlementine-icons--user-16] h-8 w-8" />
        </button>
      </Link>

      {/* Popup */}
      {show && (
        <div
          role="dialog"
          aria-label="Profile summary"
          className={`absolute right-0 z-50 mt-2 w-64 rounded-md border shadow-lg ${isHomePage ? "bg-background text-foreground" : "bg-background text-foreground"}`}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          <div className="p-4">
            {loading ? (
              <div className="text-sm">Loading...</div>
            ) : error ? (
              <div className="text-sm text-red-500">Error loading</div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-slate-300" />
                <div className="flex flex-col">
                  <div className="text-sm font-semibold">{user?.firstName || user?.username}</div>
                  {user?.lastName && <div className="text-xs opacity-80">{user?.lastName}</div>}
                  {user?.email && <div className="text-xs opacity-70">{user?.email}</div>}
                </div>
              </div>
            )}

            <div className="mt-3 flex items-center justify-between gap-2">
              <Link
                to="/profile"
                className={`inline-block rounded px-3 py-1 text-sm ${isHomePage ? "bg-saseBlue text-white" : "bg-saseBlue text-white"}`}
              >
                View Profile
              </Link>
              <button onClick={onLogout} className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-800">
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileHover;
