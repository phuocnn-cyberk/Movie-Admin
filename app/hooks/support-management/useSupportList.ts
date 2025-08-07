import { useQuery } from "@tanstack/react-query";
import { getAllSupport } from "~/services/api";
import type { SupportSubmission } from "~/types";

export const useSupportList = () => {

  const { data: supportListData } = useQuery<SupportSubmission[]>({
    queryKey: ["support-list"],
    queryFn: () => getAllSupport(),
    staleTime: 5 * 60 * 1000,
  });

  return {
    supportListData,
  };
};
