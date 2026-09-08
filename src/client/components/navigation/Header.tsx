import DarkButton from "@/client/components/custom_ui/DarkButton";
import { DarkModeContext } from "@/client/components/custom_ui/DarkModeProvider";
import { useAuth } from "@/client/hooks/AuthContext";
import { cn } from "@/shared/utils";
import { useIsMobile } from "@hooks/useIsMobile";
import { DesktopMenu } from "@navigation/DesktopMenu";
import { Logo } from "@navigation/Logo";
import { MobileMenu } from "@navigation/MobileMenu";
import ProfileHover from "@navigation/ProfileHover";
import { SearchBar } from "@navigation/SearchBar";
import { useLocation } from "@tanstack/react-router";
import { Squash as Hamburger } from "hamburger-react";
import React, { useContext, useEffect, useRef, useState } from "react";

const SCREEN_BREAKPOINT = 1024;

const navItems = [
  { name: "Home", path: "/" },
  {
    name: "About",
    path: "/about",
    children: [
      { name: "Board", path: "/board" },
      { name: "Past Board", path: "/past-board" },
      { name: "Sponsors", path: "/sponsors" },
    ],
  },
  {
    name: "Events",
    path: "/events",
    children: [
      { name: "SASEHacks", path: "/sasehacks" },
      { name: "SERC", path: "/serc" },
      { name: "Gulf Games", path: "/gulfgames" },
      { name: "STEM Connect", path: "/stemconnect" },
      { name: "Gallery", path: "/gallery" },
      { name: "Blogs", path: "/blogs" },
    ],
  },
  {
    name: "Programs",
    path: "/programs",
    children: [
      { name: "Interns", path: "/interns" },
      { name: "Gator Rover", path: "/set" },
      { name: "SWEET", path: "/webdev" },
      { name: "Sports", path: "/sports" },
      { name: "Mentor Mentee", path: "/mentor-mentee" },
      { name: "Projects", path: "/projects" },
      { name: "SASEHacks", path: "/sasehacks" },
      { name: "Community Outreach", path: "/community-outreach" },
      { name: "SASE PCR", path: "/sase-pcr" },
    ],
  },
  {
    name: "Resources",
    path: "/resources",
  },
];

const Header: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, isLoading, logout } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  // Handle clicks outside of the menu/hamburger button
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const isMobile = useIsMobile(SCREEN_BREAKPOINT);

  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  return (
    <header
      className={cn(`sticky left-0 top-0 z-50 w-full font-redhat font-medium shadow-md`, {
        "bg-black text-white": isHomePage,
        "bg-background text-foreground": !isHomePage,
      })}
    >
      <nav className="relative flex h-16 w-full items-center justify-between px-4 py-3 md:px-8">
        {/* Logo */}
        <Logo />
        {isMobile ? (
          <>
            <div className="ml-auto flex items-center gap-2">
              <SearchBar />
              <button ref={hamburgerRef} className="focus:outline-none">
                <Hamburger toggled={menuOpen} toggle={setMenuOpen} color={isHomePage || darkMode ? "#fff" : "#000"} size={22} />
              </button>
            </div>
            <div ref={menuRef}>
              <MobileMenu
                navItems={navItems}
                isOpen={menuOpen}
                onClose={() => setMenuOpen(false)}
                isHomePage={isHomePage}
                isLoggedIn={isAuthenticated}
                onLogout={logout}
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
              />
            </div>
          </>
        ) : (
          <div className="flex w-full items-center justify-between">
            <div className="ml-auto flex items-center gap-2">
              <DesktopMenu darkMode={darkMode} navItems={navItems} isHomePage={isHomePage} />
              <SearchBar className="ml-4" />
              <DarkButton darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
              <div className="hidden md:block">
                {isLoading ? null : <ProfileHover isLoggedIn={isAuthenticated} onLogout={logout} isHomePage={isHomePage} />}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
