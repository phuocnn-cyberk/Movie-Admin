import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import { UserSubmissionTable } from "./support-table";

export const SupportManagement = () => {
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
      <div className="mt-6">
        <UserSubmissionTable>
          <div className="rounded-[8px] border border-[#E9E9E9]">
            <UserSubmissionTable.DataTable
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
        </UserSubmissionTable>
      </div>
    </div>
  );
};
