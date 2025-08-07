import { fh } from "~/utils/format";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "~/lib/utils";
import { Copy } from "lucide-react";
import { toast } from "sonner";

interface SwapHistoryItem {
  timeRequested: string;
  userWallet: string;
  amount: string;
  balance: string;
  txHash: string;
}

const mockData: SwapHistoryItem[] = [
  {
    timeRequested: "Apr 16, 10:35",
    userWallet: "0x3e586F7D6ae43fE7BA968a...26bE",
    amount: "500 USDC",
    balance: "500 USHD",
    txHash: "0xc01A8...dd3b",
  },
  {
    timeRequested: "Apr 16, 10:35",
    userWallet: "0x3e586F7D6ae43fE7BA968a...26bE",
    amount: "500 USDC",
    balance: "500 USHD",
    txHash: "0xc01A8...dd3b",
  },
  {
    timeRequested: "Apr 16, 10:35",
    userWallet: "0x3e586F7D6ae43fE7BA968a...26bE",
    amount: "500 USDC",
    balance: "500 USHD",
    txHash: "0xc01A8...dd3b",
  },
  {
    timeRequested: "Apr 16, 10:35",
    userWallet: "0x3e586F7D6ae43fE7BA968a...26bE",
    amount: "500 USDC",
    balance: "500 USHD",
    txHash: "0xc01A8...dd3b",
  },
  {
    timeRequested: "Apr 16, 10:35",
    userWallet: "0x3e586F7D6ae43fE7BA968a...26bE",
    amount: "500 USDC",
    balance: "500 USHD",
    txHash: "0xc01A8...dd3b",
  },
];

export const SwapHistory = () => {
  const handleCopy = (address: string) => {
    navigator.clipboard.writeText(address);
    toast.success("Address copied to clipboard");
  };

  return (
    <div className="flex flex-col rounded-3xl border border-[#E9E9E9] bg-[#01A8AB0D] p-6">
      <h3 className="text-base font-semibold text-[#193049]">
        USHD swap history
      </h3>
      <div className="overflow-x-auto">
        <div className="min-w-max">
          <Table>
            <TableHeader>
              <TableRow className="!border-b-0">
                <TableHead className="grid grid-cols-6">
                  <div className="flex items-center pl-4 text-xs font-semibold text-gray-500">
                    Time requested
                  </div>
                  <div className="col-span-2 flex items-center text-xs font-semibold text-gray-500">
                    User Wallet
                  </div>
                  <div className="flex items-center text-xs font-semibold text-gray-500">
                    Amount
                  </div>
                  <div className="flex items-center text-xs font-semibold text-gray-500">
                    Balance
                  </div>
                  <div className="flex w-full items-center pr-4 text-end text-xs font-semibold text-gray-500">
                    TxHash
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-sm font-semibold leading-none">
              {mockData.map((item, index) => (
                <TableRow key={index} className="!border-b-0 mb-2">
                  <TableCell colSpan={6} className="p-0">
                    <div className="grid grid-cols-6 rounded-2xl border border-[#E9E9E9] bg-white px-4 py-3">
                      <div className="text-sm font-semibold text-gray-500">
                        {item.timeRequested}
                      </div>
                      <div className="col-span-2 flex items-center gap-2 text-sm text-gray-500">
                        <span className="text-sm font-semibold text-[#193049]">
                          {fh.truncateAddress(item.userWallet)}
                        </span>
                        <Copy
                          className="h-5 w-5 cursor-pointer text-[#8A8A8A]"
                          onClick={() => handleCopy(item.userWallet)}
                        />
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-500">
                        <span>{item.amount}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-500">
                        <span>{item.balance}</span>
                      </div>
                      <div className="text-highlight w-full pr-4 text-end text-sm font-semibold">
                        {item.txHash}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="mt-2">
        <PaginationTable
          currentPage={1}
          onPageChange={(page) => console.log("Page changed to:", page)}
          onNextPage={() => console.log("Next page")}
          onPreviousPage={() => console.log("Previous page")}
          totalPages={5}
        />
      </div>
    </div>
  );
};

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  onNextPage: () => void;
  onPreviousPage: () => void;
  totalPages: number;
}

const PaginationTable = ({
  currentPage,
  onPageChange,
  onNextPage,
  onPreviousPage,
  totalPages,
}: PaginationProps) => {
  return (
    <Pagination>
      <PaginationContent className="gap-6">
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPreviousPage()}
            className={cn(
              "cursor-pointer border-0 text-xs font-medium text-gray-500 hover:text-gray-700",
              "flex flex-row items-center gap-2",
              currentPage === 1 && "pointer-events-none opacity-50"
            )}
          />
        </PaginationItem>

        <div className="flex items-center space-x-1">
          <PaginationItem>
            <PaginationLink
              onClick={() => onPageChange(1)}
              className={cn(
                "cursor-pointer rounded-md px-3 py-1 text-sm font-medium",
                currentPage === 1
                  ? "border-highlight border text-[#193049] hover:bg-[#05AAAD]"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              1
            </PaginationLink>
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => currentPage + i - 1)
            .filter((page) => page > 1 && page < totalPages)
            .map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => onPageChange(page)}
                  className={cn(
                    "cursor-pointer rounded-md px-3 py-1 text-sm font-medium",
                    currentPage === page
                      ? "!border-highlight border text-[#193049] hover:bg-[#05AAAD]"
                      : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

          {totalPages > 1 && (
            <PaginationItem>
              <PaginationLink
                onClick={() => onPageChange(totalPages)}
                className={cn(
                  "cursor-pointer rounded-md px-3 py-1 text-sm font-medium",
                  currentPage === totalPages
                    ? "bg-[#05AAAD] text-white hover:bg-[#05AAAD]"
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          )}
        </div>
        <PaginationItem>
          <PaginationNext
            onClick={() => onNextPage()}
            className={cn(
              "cursor-pointer border-0 text-xs font-medium text-gray-500 hover:text-gray-700",
              "flex flex-row items-center gap-2",
              (currentPage === totalPages || !totalPages) &&
                "pointer-events-none opacity-50"
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
