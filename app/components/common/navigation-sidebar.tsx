import { cn } from "~/lib/utils";
import { NavLink } from "react-router";
import { ROUTES } from "~/routes";
import StreamVibeLogo from "~/assets/logos/stream-vibe-logo.svg";

export const PriceArea = () => {
  return (
    <div className="flex justify-between rounded-full bg-white/20 px-4 py-2 text-sm">
      <span className="text-regular text-white">Price:</span>
      <span>$100</span>
    </div>
  );
};

interface NavigationItemType {
  name: string;
  path: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

const navigationItems: NavigationItemType[] = [
  { name: "Dashboard", path: ROUTES.DASHBOARD },
  { name: "Support Management", path: ROUTES.SUPPORT_MANAGEMENT },
  { name: "Admin Management", path: ROUTES.ADMIN_MANAGEMENT },
];

interface NavigationItemProps {
  name: string;
  path: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export const NavigationItem = ({
  name,
  path,
  icon,
  disabled,
}: NavigationItemProps) => {
  if (disabled) {
    return (
      <div className="flex w-full cursor-not-allowed items-center rounded-md px-4 py-3 text-sm font-medium text-[#8A8A8A]">
        {icon}
        <div className="flex w-full items-center justify-between gap-2 whitespace-nowrap text-base font-normal">
          {name}
        </div>
      </div>
    );
  }

  return (
    <NavLink
      key={name}
      to={path}
      className={({ isActive }) =>
        cn(
          "flex w-full items-center rounded-md px-4 py-3 text-sm font-medium transition-colors hover:bg-white/10",
          isActive
            ? "bg-[#E50000] text-white hover:bg-[#E50000]"
            : "text-gray-300"
        )
      }
    >
      {({ isActive }) => (
        <>
          {icon}
          <div className="flex w-full items-center justify-between gap-2 whitespace-nowrap text-base font-normal">
            {name}
            {isActive && <div className="h-3 w-3 rounded-full bg-white" />}
          </div>
        </>
      )}
    </NavLink>
  );
};

export const NavigationSidebar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <nav
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-full w-[248px] flex-col justify-between bg-[#111111] px-6 pb-10 text-white transition-transform duration-300",
          "md:relative md:translate-x-0", // Always show on desktop
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0" // Only hide on mobile when closed
        )}
      >
        <div>
          <div className="mb-4 mt-4 flex items-center px-2">
            <img
              src={StreamVibeLogo}
              alt="StreamVibe Logo"
              className="h-[60px]"
            />
          </div>
          <div className="mt-10 flex-1 space-y-1">
            {navigationItems.map((item) => (
              <NavigationItem
                key={item.name}
                name={item.name}
                path={item.path}
                disabled={item.disabled}
              />
            ))}
          </div>
        </div>
        <PriceArea />
      </nav>
    </>
  );
};
