import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { fh } from "~/utils";

interface Props {
  data: {
    id: number;
    name: string;
    wallet: string;
    type: string;
    hub: string;
    status: string;
  };
  close?: () => void;
}

const RemoveAdminDialog: React.FC<Props> = ({ data, close }) => {
  return (
    <DialogContent className="rounded-xl bg-white [&>button]:hidden">
      <DialogHeader>
        <DialogTitle className="text-base font-semibold">
          Remove Admin
        </DialogTitle>
        <DialogDescription className="font-base text-sm">
          Are you sure you want to remove admin? This action cannot be undone.
        </DialogDescription>
      </DialogHeader>

      <div className="flex items-center gap-2 rounded-[8px] border border-[#E9E9E9] p-4">
        <img
          src="https://images.pexels.com/photos/4121821/pexels-photo-4121821.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="admin"
          className="!h-[38px] !w-[38px] rounded-full"
        />
        <div className="flex min-w-0 flex-col gap-y-1">
          <div className="flex items-center gap-[6px]">
            <h3 className="text-base font-semibold text-[#193049]">
              {data.name}
            </h3>
            <div className="h-[14px] w-[2px] shrink-0 bg-[#8A8A8A]" />
            <h3 className="text-highlight text-base font-semibold">
              {data.hub}
            </h3>
          </div>
          <p className="truncate text-sm font-normal text-[#8A8A8A]">
            {fh.truncateAddress(data.wallet)}
          </p>
        </div>
      </div>

      <DialogFooter className="mt-4 grid grid-cols-2 gap-2 md:flex">
        <Button
          className="bg-[#E6E6E6] text-[#193049] hover:bg-[#d9d9d9]"
          onClick={close}
        >
          Cancel
        </Button>
        <Button className="bg-[#E2281E] text-white hover:bg-[#c71f18] md:w-[100px]">
          Remove
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default RemoveAdminDialog;
