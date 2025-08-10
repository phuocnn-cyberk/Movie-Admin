"use client";

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { ROUTES } from "~/routes";
import { useAuthStore } from "~/stores/auth.store";

export const SignInButton = ({ className }: { className?: string }) => {
  const navigate = useNavigate();
  const { isAuthenticated, actions } = useAuthStore();
  const handleSignIn = () => {
    navigate(ROUTES.LOGIN);
  };
  const handleSignOut = () => {
    navigate(ROUTES.LOGIN);
    actions.clearAuth();
  };

  return (
    <>
      {isAuthenticated ? (
        <Button
          className={`${className} flex cursor-pointer items-center gap-4 bg-[#E50000] px-4 py-2 shadow-none max-md:h-7 hover:bg-[#E50000]/80`}
          onClick={handleSignOut}
        >
          <span className="text-white">Sign Out</span>
        </Button>
      ) : (
        <Button
          className={`${className} cursor-pointer text-base font-semibold text-white`}
          onClick={handleSignIn}
        >
          Sign In
        </Button>
      )}
    </>
  );
};
