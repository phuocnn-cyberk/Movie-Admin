import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CircleMinus, Copy, EllipsisVertical, RefreshCw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { fh } from "~/utils";
import RemoveAdminDialog from "./remove-admin.dialog";
import RevokeAdminDialog from "./revoke-admin.dialog";

const AdminTable = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mt-4 overflow-hidden rounded-lg border border-[#E9E9E9] bg-white">
      {children}
    </div>
  );
};

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  toast.success("Copied to clipboard");
};

interface TableProps {
  data: {
    id: number;
    name: string;
    wallet: string;
    type: string;
    hub: string;
    status: string;
  }[];
}

const DataTable: React.FC<TableProps> = ({ data }) => {
  const [openMenuFor, setOpenMenuFor] = useState<number | null>(null);

  const [removeDialogFor, setRemoveDialogFor] = useState<number | null>(null);
  const [revokeDialogFor, setRevokeDialogFor] = useState<number | null>(null);

  return (
    <div className="overflow-hidden rounded-lg bg-white">
      <Table className="border-collapse divide-y divide-[#E9E9E9] rounded-lg">
        <TableHeader>
          <TableRow className="text-left text-sm font-medium text-[#8A8A8A]">
            <TableHead className="px-4 py-3 first:rounded-tl-lg">
              Admin
            </TableHead>
            <TableHead className="px-4 py-3">Wallet</TableHead>
            <TableHead className="px-4 py-3">Type</TableHead>
            <TableHead className="px-4 py-3">Hub</TableHead>
            <TableHead className="px-4 py-3">Status</TableHead>
            <TableHead className="w-12 rounded-tr-lg px-4 py-3" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((user) => (
            <TableRow key={user.id} className="border-b last:border-b-0">
              <TableCell className="px-4 py-3 text-sm font-semibold">
                {user.name}
              </TableCell>
              <TableCell className="flex items-center gap-[8px] px-4 py-3 text-sm font-semibold">
                {fh.truncateAddress(user.wallet)}
                <Copy
                  size="20"
                  stroke="#193049"
                  onClick={() => copyToClipboard(user.wallet)}
                />
              </TableCell>
              <TableCell className="px-4 py-3 text-sm font-semibold">
                {user.type}
              </TableCell>
              <TableCell className="px-4 py-3 text-sm font-semibold">
                {user.hub}
              </TableCell>
              <TableCell className="px-4 py-3 text-sm font-semibold">
                {user.status === "active" ? (
                  <span className="flex items-center gap-2 text-[#36B17A]">
                    <span className="h-3 w-3 rounded-full bg-[#36B17A]" />
                    Active
                  </span>
                ) : (
                  <span className="flex items-center gap-2 text-[#8A8A8A]">
                    <span className="h-3 w-3 rounded-full bg-[#8A8A8A]" />
                    In-active
                  </span>
                )}
              </TableCell>

              <TableCell className="w-12 px-4 py-3 text-center">
                <DropdownMenu
                  open={openMenuFor === user.id}
                  onOpenChange={(isOpen) =>
                    setOpenMenuFor(isOpen ? user.id : null)
                  }
                >
                  <DropdownMenuTrigger asChild>
                    <button className="cursor-pointer">
                      <EllipsisVertical size={24} stroke="#28303F" />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" side="bottom" sideOffset={4}>
                    <DropdownMenuItem
                      onClick={() => {
                        setOpenMenuFor(null);
                        setRemoveDialogFor(user.id);
                      }}
                      className="flex cursor-pointer items-center gap-2 px-3 py-2 hover:bg-gray-50"
                    >
                      <CircleMinus size={18} stroke="#E2281E" />
                      <span className="text-sm text-[#E2281E]">Remove</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => {
                        setOpenMenuFor(null);
                        setRevokeDialogFor(user.id);
                      }}
                      className="flex cursor-pointer items-center gap-2 px-3 py-2 hover:bg-gray-50"
                    >
                      <RefreshCw size={18} stroke="#193049" />
                      <span className="text-sm text-[#193049]">Revoke</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Dialog
                  open={removeDialogFor === user.id}
                  onOpenChange={(open) =>
                    setRemoveDialogFor(open ? user.id : null)
                  }
                >
                  <RemoveAdminDialog
                    data={user}
                    close={() => setRemoveDialogFor(null)}
                  />
                </Dialog>

                <Dialog
                  open={revokeDialogFor === user.id}
                  onOpenChange={(open) =>
                    setRevokeDialogFor(open ? user.id : null)
                  }
                >
                  <RevokeAdminDialog
                    data={user}
                    close={() => setRevokeDialogFor(null)}
                  />
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

AdminTable.DataTable = DataTable;

export { AdminTable };
