// src/components/profile/ProfileNav.tsx
import { cn } from "@/shared/utils";
import { Button } from "@components/ui/button";
import { useAuth } from "@hooks/AuthContext";
import { Icon } from "@iconify/react";
import { Link, useMatchRoute, useNavigate } from "@tanstack/react-router";

const SASE_COLORS = ["saseBlue", "saseGreen"];

interface ProfileNavProps {
  profileName?: string;
  activeSection: string;
  update: (section: string) => void;
}

const NAV_ITEMS = [
  { to: "/profile/", text: "Dashboard", icon: "mdi:view-dashboard-outline" },
  { to: "/profile/info", text: "Profile", icon: "mdi:account-outline" },
  { to: "/profile/security", text: "Security", icon: "mdi:lock-outline" },
  { to: "/profile/settings", text: "Settings", icon: "mdi:cog-outline" },
];

const ADMIN_NAV_ITEMS = [{ to: "/profile/admin", text: "Admin Dashboard", icon: "mdi:crown-outline" }];

const ProfileNav: React.FC<ProfileNavProps> = ({ profileName = "User" }) => {
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      logout();
      navigate({ to: "/" });
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div className={cn("flex w-60 flex-col rounded-3xl bg-background p-6 font-redhat shadow-xl")}>
      {/* Profile Info */}
      <div className="mb-6 flex flex-col items-center text-center">
        <div className={cn("flex h-36 w-36 items-center justify-center rounded-full bg-saseBlueLight text-white")}>
          <span className="text-4xl font-bold">{profileName.charAt(0).toUpperCase()}</span>
        </div>
        <h2 className="mt-3 text-2xl font-semibold">{profileName}</h2>
        <p className="text-med italic text-gray-500">ex: SASE President</p>
        <p className="text-med italic text-gray-500">Bio: [Short sentence]</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-2">
        {NAV_ITEMS.map((item, idx) => (
          <NavItem key={item.to} to={item.to} icon={item.icon} text={item.text} color={SASE_COLORS[idx % 2]} />
        ))}
        {isAdmin &&
          ADMIN_NAV_ITEMS.map((item, idx) => <NavItem key={item.to} to={item.to} icon={item.icon} text={item.text} color={SASE_COLORS[idx % 2]} />)}
      </nav>
      <div className="mt-10 flex justify-center">
        <Button variant="destructive" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </div>
  );
};

interface NavItemProps {
  to: string;
  icon: string;
  text: string;
  color: string;
}

const NavItem: React.FC<NavItemProps> = ({ color, icon, text, to }) => {
  // Correct usage: call hook with no args, then invoke with { to }
  const matchRoute = useMatchRoute();
  const match = matchRoute({ to });
  const isActive = Boolean(match);

  return (
    <Link
      to={to}
      className={cn(
        "group relative flex items-center space-x-3 rounded-md p-3 text-left font-redhat transition-transform duration-300",
        isActive ? "scale-105" : "hover:scale-105",
      )}
    >
      <Icon
        icon={icon}
        className={cn(
          "text-3xl transition-colors duration-300",
          isActive
            ? color === "saseBlue"
              ? "text-saseBlue"
              : "text-saseGreen"
            : color === "saseBlue"
              ? "group-hover:text-saseBlue"
              : "group-hover:text-saseGreen",
        )}
      />
      <div className="relative">
        <span
          className={cn(
            "font-medium transition-all duration-300",
            isActive
              ? color === "saseBlue"
                ? "font-bold text-saseBlue"
                : "font-bold text-saseGreen"
              : color === "saseBlue"
                ? "group-hover:text-saseBlue"
                : "group-hover:text-saseGreen",
          )}
        >
          {text}
        </span>
        <span
          className={cn(
            "absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-300",
            isActive
              ? color === "saseBlue"
                ? "w-full bg-saseBlue"
                : "w-full bg-saseGreen"
              : color === "saseBlue"
                ? "group-hover:w-full group-hover:bg-saseBlue"
                : "group-hover:w-full group-hover:bg-saseGreen",
          )}
        />
      </div>
    </Link>
  );
};

export default ProfileNav;
