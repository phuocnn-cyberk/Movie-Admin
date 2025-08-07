import { redirect } from "react-router";
import { ROUTES } from "~/routes";
import { useAuthStore } from "~/stores/auth.store";

export const requiredAuth = () => {
  const { isAuthenticated, user } = useAuthStore.getState();
  if (!isAuthenticated) {
    throw redirect(ROUTES.LOGIN);
  }

  if (!user?.role || user.role === "USER") {
    localStorage.setItem("auth_error", "Access denied. Admin role required.");
    useAuthStore.getState().actions.clearAuth();
    throw redirect(ROUTES.NOT_FOUND);
  }
};

export const notRequiredAuth = () => {
  const { isAuthenticated } = useAuthStore.getState();
  if (isAuthenticated) {
    throw redirect(ROUTES.DASHBOARD);
  }
};
