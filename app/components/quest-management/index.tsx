import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import { QuestManagementStatsSection } from "./quest-management-statistic";
import { QuestsManagementTable } from "./quests-management-table";

export const QuestManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleTotalPagesChange = (pages: number) => {
    setTotalPages(pages);
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => handlePageChange(i)}
            className={
              currentPage === i
                ? "border-highlight text-helix-black cursor-pointer border bg-white font-semibold"
                : "text-helix-black cursor-pointer font-normal hover:bg-gray-50"
            }
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div>
      <QuestManagementStatsSection />
      <div className="mt-6">
        <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
          <h2 className="text-base font-semibold md:text-lg">
            Created Quest List
          </h2>
        </div>
        <QuestsManagementTable>
          <div className="overflow-x-auto rounded-[8px] border border-[#E9E9E9]">
            <QuestsManagementTable.DataTable
              currentPage={currentPage}
              onTotalPagesChange={handleTotalPagesChange}
            />
          </div>
          <div className="mt-4 py-4">
            {totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        currentPage > 1 && handlePageChange(currentPage - 1)
                      }
                      className={
                        currentPage > 1
                          ? "cursor-pointer font-normal text-[#193049] hover:bg-gray-50"
                          : "cursor-not-allowed text-[#8A8A8A]"
                      }
                    />
                  </PaginationItem>

                  {renderPaginationItems()}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        currentPage < totalPages &&
                        handlePageChange(currentPage + 1)
                      }
                      className={
                        currentPage < totalPages
                          ? "cursor-pointer font-normal text-[#193049] hover:bg-gray-50"
                          : "cursor-not-allowed text-[#8A8A8A]"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </QuestsManagementTable>
      </div>
    </div>
  );
};
