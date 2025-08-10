import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export const ROUTES = {
  DASHBOARD: "/",
  LOGIN: "/login",
  MOVIE_MANAGEMENT: "/movie-management",
  SUPPORT_MANAGEMENT: "/support-management",
  NOT_FOUND: "/not-found",
} as const;

export default [
  route(ROUTES.LOGIN, "routes/auth/login.tsx"),
  layout("layouts/dashboard-layout.tsx", [
    index("routes/index.tsx"),
    route(ROUTES.SUPPORT_MANAGEMENT, "routes/support-management.tsx"),
    route(ROUTES.MOVIE_MANAGEMENT, "routes/movie-management.tsx"),
  ]),
] satisfies RouteConfig;
