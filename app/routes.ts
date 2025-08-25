import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export const ROUTES = {
  DASHBOARD: "/",
  LOGIN: "/login",
  MOVIE_MANAGEMENT: "/movie-management",
  SUPPORT_MANAGEMENT: "/support-management",
  GENRE_MANAGEMENT: "/genre-management",
  PAYMENT_MANAGEMENT: "/payment-management",
  SERIES_MANAGEMENT: "/series-management",
  NOT_FOUND: "/not-found",
} as const;

export default [
  route(ROUTES.LOGIN, "routes/auth/login.tsx"),
  layout("layouts/dashboard-layout.tsx", [
    index("routes/index.tsx"),
    route(ROUTES.SUPPORT_MANAGEMENT, "routes/support-management.tsx"),
    route(ROUTES.MOVIE_MANAGEMENT, "routes/movie-management.tsx"),
    route(ROUTES.GENRE_MANAGEMENT, "routes/genre-management.tsx"),
    route(ROUTES.SERIES_MANAGEMENT, "routes/series-management.tsx"),
    route(ROUTES.PAYMENT_MANAGEMENT, "routes/payment-management.tsx"),
  ]),
] satisfies RouteConfig;
