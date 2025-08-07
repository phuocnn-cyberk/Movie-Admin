import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Copy } from "lucide-react";
import React, { useState } from "react";
import { useSupportList } from "~/hooks/support-management/useSupportList";
import { useReplySupport } from "~/hooks/support-management/useReplySupport";
import type { SupportSubmission } from "~/types";
import { toast } from "sonner";
import { ReplyDialog } from "./reply-dialog";

interface UserSubmissionTableProps {
  children: React.ReactNode;
}

const UserSubmissionTable = ({ children }: UserSubmissionTableProps) => {
  return <div className="mt-3 rounded-md bg-white md:mt-6">{children}</div>;
};

interface DataTableProps {
  currentPage: number;
  onTotalPagesChange: (totalPages: number) => void;
}

const DataTable: React.FC<DataTableProps> = ({ onTotalPagesChange }) => {
  const { supportListData } = useSupportList();
  const { sendReply, isReplying } = useReplySupport();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSupport, setSelectedSupport] =
    useState<SupportSubmission | null>(null);

  React.useEffect(() => {
    if (supportListData) {
      const itemsPerPage = 5;
      const totalPages = Math.ceil(10 / itemsPerPage);
      onTotalPagesChange(totalPages);
    }
  }, [supportListData, onTotalPagesChange]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Email copied to clipboard");
  };

  const handleReplyClick = (submission: SupportSubmission) => {
    setSelectedSupport(submission);
    setIsDialogOpen(true);
  };

  const handleSendReply = (responseText: string) => {
    if (!selectedSupport) return;

    const currentStaffId = 1;

    sendReply(
      {
        supportID: selectedSupport.supportID,
        response: responseText,
        respondedBy: currentStaffId,
      },
      {
        onSuccess: () => {
          setIsDialogOpen(false);
          setSelectedSupport(null);
        },
      }
    );
  };

  return (
    <>
      <Table className="w-full rounded-lg">
        <TableHeader>
          <TableRow>
            <TableHead className="whitespace-nowrap px-4 py-3 text-xs font-semibold text-[#8A8A8A] md:text-sm">
              Support ID
            </TableHead>
            <TableHead className="whitespace-nowrap px-4 py-3 text-xs font-semibold text-[#8A8A8A] md:text-sm">
              Email
            </TableHead>
            <TableHead className="whitespace-nowrap px-4 py-3 text-xs font-semibold text-[#8A8A8A] md:text-sm">
              Phone Number
            </TableHead>
            <TableHead className="whitespace-normal px-4 py-3 text-xs font-semibold text-[#8A8A8A] md:text-sm">
              Message
            </TableHead>
            <TableHead className="whitespace-normal px-4 py-3 text-xs font-semibold text-[#8A8A8A] md:text-sm">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {supportListData?.map((submission) => (
            <TableRow key={submission.supportID} className="bg-white">
              <TableCell className=" px-4 py-5">
                <span className="text-xs font-semibold md:text-sm text-[#193049]">
                  {submission.supportID}
                </span>
              </TableCell>
              <TableCell className=" px-4 py-5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#193049] md:text-sm">
                    {submission.email}
                  </span>
                  {submission.email && (
                    <button
                      onClick={() => handleCopy(submission.email ?? "")}
                      className="flex h-5 w-5 cursor-pointer items-center justify-center text-[#193049] transition-colors hover:text-[#01A8AB]"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </TableCell>
              <TableCell className="px-4 py-5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#193049] md:text-sm">
                    {submission.phoneNumber}
                  </span>
                </div>
              </TableCell>
              <TableCell className="px-4 py-5">
                <span className="text-xs font-semibold md:text-sm text-[#193049]">
                  {submission.message}
                </span>
              </TableCell>
              <TableCell className="px-4 py-5">
                {submission.response ? (
                  <Button variant="outline" disabled>
                    Replied
                  </Button>
                ) : (
                  <Button
                    className="cursor-pointer bg-[#E50000] hover:opacity-80"
                    onClick={() => handleReplyClick(submission)}
                  >
                    Reply
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ReplyDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleSendReply}
        isReplying={isReplying}
        supportId={selectedSupport?.supportID ?? null}
      />
    </>
  );
};

UserSubmissionTable.DataTable = DataTable;

export { UserSubmissionTable };
