import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "~/services/api";

export const useGetDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
  });
};