import { useState } from "react";
import { Outlet, useLocation } from "react-router";
import { MobileHeader } from "~/components/common/mobile-header";
import { NavigationSidebar } from "~/components/common/navigation-sidebar";
import { SignInButton } from "~/components/sign-in-button";
import { requiredAuth } from "~/middlewares/authentication";
import { ROUTES } from "~/routes";

export const Header = () => {
  const location = useLocation();
  const getTitle = () => {
    switch (location.pathname) {
      case ROUTES.DASHBOARD:
        return "Dashboard";
      case ROUTES.SUPPORT_MANAGEMENT:
        return "Support Management";
      case ROUTES.MOVIE_MANAGEMENT:
        return "Movie Management";
      case ROUTES.GENRE_MANAGEMENT:
        return "Genre Management";
      case ROUTES.PAYMENT_MANAGEMENT:
        return "Payment Management";
      default:
        return "";
    }
  };
  return (
    <div className="mb-3 flex items-center justify-between md:mb-6">
      <h1 className="text-base font-semibold text-[#193049] md:text-lg">
        {getTitle()}
      </h1>
      <div className="hidden items-center gap-2 md:flex">
        <SignInButton />
      </div>
    </div>
  );
};

export async function clientLoader() {
  requiredAuth();
}

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen w-full overflow-hidden bg-black">
      <NavigationSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="flex w-full min-w-0 justify-center pt-16 md:pr-4 md:pt-0">
        <div className="md:rounded-4xl flex-1 overflow-auto bg-white md:my-4">
          <div className="mx-auto w-full">
            <MobileHeader onMenuClick={() => setIsSidebarOpen(true)} />
            <div className="px-4 pt-8 md:px-8">
              <Header />

              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
