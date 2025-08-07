import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
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

const RevokeAdminDialog: React.FC<Props> = ({ data, close }) => {
  const [role, setRole] = useState<string | undefined>(undefined);
  const [hub, setHub] = useState<string | undefined>(undefined);

  return (
    <DialogContent className="rounded-xl bg-white [&>button]:hidden">
      <DialogHeader>
        <DialogTitle className="text-base font-semibold">
          Revoke Role
        </DialogTitle>
        <DialogDescription className="font-base text-sm">
          You are about to revoke the role of admin. This action will remove
          their current access level.
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

      <div className="mt-1 grid grid-cols-2 gap-1 md:mt-0">
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger className="!h-auto w-full p-4 [&_.select-badge]:hidden">
            <SelectValue placeholder="Role" className="text-sm" />
          </SelectTrigger>

          <SelectContent className="[&_[data-radix-select-item-indicator]]:hidden [&_[data-state=checked]]:bg-transparent [&_[data-state=checked]_svg]:hidden">
            <SelectGroup>
              {[
                { label: "Admin", value: "admin" },
                { label: "Main-Admin", value: "main-admin" },
              ].map((item) => (
                <SelectItem
                  key={item.value}
                  value={item.value}
                  className="flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-50"
                >
                  <span>{item.label}</span>
                  {(role
                    ? role?.toLowerCase() === item.value
                    : data.type.toLowerCase() === item.value) && (
                    <span className="select-badge ml-auto inline-block rounded bg-[#CEEEEE] px-1 text-[10px] font-normal text-[#01A8AB]">
                      Current
                    </span>
                  )}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select value={hub} onValueChange={setHub}>
          <SelectTrigger className="!h-auto w-full p-4 [&_.select-badge]:hidden">
            <SelectValue placeholder="Hub" className="text-sm" />
          </SelectTrigger>

          <SelectContent className="[&_[data-radix-select-item-indicator]]:hidden [&_[data-state=checked]]:bg-transparent [&_[data-state=checked]_svg]:hidden">
            <SelectGroup>
              {[
                { label: "Helix-Prime", value: "helix-prime" },
                { label: "Helix-Hub", value: "helix-hub" },
              ].map((item) => (
                <SelectItem
                  key={item.value}
                  value={item.value}
                  className="flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-50"
                >
                  <span>{item.label}</span>
                  {(hub
                    ? hub === item.value
                    : data.hub.toLowerCase() === item.value) && (
                    <span className="select-badge ml-auto inline-block rounded bg-[#CEEEEE] px-1 text-[10px] font-normal text-[#01A8AB]">
                      Current
                    </span>
                  )}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <DialogFooter className="mt-4 grid grid-cols-2 md:flex">
        <Button
          className="bg-[#E6E6E6] text-[#193049] hover:bg-[#d9d9d9]"
          onClick={() => close?.()}
        >
          Cancel
        </Button>
        <Button className="bg-highlight text-white md:w-[100px]">Revoke</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default RevokeAdminDialog;
