import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export const ROUTES = {
  DASHBOARD: "/",
  LOGIN: "/login",
  ADMIN_MANAGEMENT: "/admin-management",
  SUPPORT_MANAGEMENT: "/support-management",
  QUEST_MANAGEMENT: "/quest-management",
  NOT_FOUND: "/not-found",
} as const;

export default [
  route(ROUTES.LOGIN, "routes/auth/login.tsx"),
  layout("layouts/dashboard-layout.tsx", [
    index("routes/index.tsx"),
    route(ROUTES.SUPPORT_MANAGEMENT, "routes/support-management.tsx"),
    route(ROUTES.QUEST_MANAGEMENT, "routes/quest-management.tsx"),
    route(ROUTES.ADMIN_MANAGEMENT, "routes/admin-management.tsx"),
  ]),
] satisfies RouteConfig;
