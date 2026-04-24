import { cn } from "@/shared/utils";
import { Button } from "@components/ui/button";
import { useAuth } from "@hooks/AuthContext";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "@tanstack/react-router";

const NAV_ITEMS = [
  { to: "/profile", text: "Dashboard", icon: "mdi:view-dashboard-outline", color: "text-saseBlue", border: "bg-saseBlue" },
  { to: "/profile/info", text: "Profile", icon: "mdi:account-outline", color: "text-saseGreen", border: "bg-saseGreen" },
  { to: "/profile/alumni-bank", text: "Alumni Bank", icon: "mdi:school-outline", color: "text-saseBlue", border: "bg-saseBlue" },
  { to: "/profile/security", text: "Security", icon: "mdi:lock-outline", color: "text-saseBlue", border: "bg-saseBlue" },
  { to: "/profile/settings", text: "Settings", icon: "mdi:cog-outline", color: "text-saseGreen", border: "bg-saseGreen" },
];

const ADMIN_NAV_ITEMS = [{ to: "/profile/admin", text: "Admin", icon: "mdi:crown-outline", color: "text-saseBlue", border: "bg-saseBlue" }];

const ProfileNav: React.FC<{ profileName?: string }> = ({ profileName = "User" }) => {
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    logout();
    navigate({ to: "/" });
  };

  return (
    <div className="mt-8 flex w-full flex-col border border-white bg-white font-redhat md:w-60 md:rounded-3xl md:p-6 md:shadow-xl">
      {/* Profile Info - Hidden on Mobile Top Nav to save space */}
      <div className="mb-6 hidden flex-col items-center text-center md:flex">
        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-saseBlueLight text-white shadow-inner">
          <span className="text-4xl font-bold">{profileName.charAt(0).toUpperCase()}</span>
        </div>
        <h2 className="mt-3 text-xl font-semibold">{profileName}</h2>
        <p className="text-sm italic text-gray-400">SASE Member</p>
      </div>

      {/* Navigation Links: Horizontal scroll on mobile, Vertical list on desktop */}
      <nav className="no-scrollbar flex flex-row overflow-x-auto border-b bg-transparent md:flex-col md:space-y-2 md:border-none">
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}
        {isAdmin && ADMIN_NAV_ITEMS.map((item) => <NavItem key={item.to} {...item} />)}

        {/* Mobile Logout Button (Visible only in the scroll row) */}
        <button onClick={handleLogout} className="flex items-center space-x-2 px-6 py-4 text-red-500 md:hidden">
          <Icon icon="mdi:logout" className="text-2xl" />
          <span className="font-medium">Exit</span>
        </button>
      </nav>

      {/* Desktop Logout Button */}
      <div className="hidden bg-white md:mt-10 md:flex md:justify-center">
        <Button variant="destructive" size="sm" onClick={handleLogout} className="w-full">
          Log Out
        </Button>
      </div>
    </div>
  );
};

const NavItem: React.FC<{ to: string; icon: string; text: string; color: string; border: string }> = ({ color, icon, text, to }) => {
  return (
    <Link
      to={to}
      activeOptions={{ exact: to === "/profile" }} // Ensures Dashboard isn't always active
      className="group relative flex items-center space-x-2 px-6 py-4 transition-all md:rounded-xl md:px-4 md:py-3"
      activeProps={{
        className: cn("border", "border-white", color, "font-bold"),
      }}
    >
      {({ isActive }) => (
        <>
          <Icon icon={icon} className={cn("text-2xl transition-colors", isActive ? "text-black" : "group-hover: text-gray-400")} />
          <span
            className={cn(
              "whitespace-nowrap text-sm font-medium transition-colors",
              isActive ? `font-bold text-black` : "text-black group-hover:text-gray-900 dark:group-hover:text-white",
            )}
          >
            {text}
          </span>
        </>
      )}
    </Link>
  );
};

export default ProfileNav;
