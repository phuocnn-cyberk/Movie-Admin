import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const ReleasedHistory = () => {
  return (
    <div className="col-span-1 rounded-lg border bg-[#01A8AB0D]">
      <div className="flex justify-between p-4 lg:p-6">
        <h3 className="text-base font-semibold leading-none tracking-tight">
          Released History
        </h3>
        <button type="button" className="text-xs font-semibold text-[#01A8AB]">
          View more
        </button>
      </div>
      <div className="overflow-x-auto px-4 pb-4 lg:px-6 lg:pb-6">
        <div className="min-w-max">
          <Table>
            <TableHeader>
              <TableRow className="!border-b-0">
                <TableHead className="grid grid-cols-3">
                  <div className="pl-4 text-xs font-semibold text-gray-500">
                    Time requested
                  </div>
                  <div className="text-xs font-semibold text-gray-500">
                    Amount
                  </div>
                  <div className="w-full pr-4 text-end text-xs font-semibold text-gray-500">
                    Request in queue
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-sm font-semibold leading-none">
              <TableRow className="!border-b-0 mb-2">
                <TableCell colSpan={3} className="p-0">
                  <div className="grid grid-cols-3 rounded-2xl border border-[#E9E9E9] bg-white px-4 py-3">
                    <div className="text-sm text-gray-500">123</div>

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>123 USDC</span>
                      <div className="h-3 w-3 rounded-full bg-[#8A8A8A]" />
                    </div>

                    <div className="w-full gap-2 text-end text-sm text-[#36424E]">
                      123 requests
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
