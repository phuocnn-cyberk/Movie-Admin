import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const AddMovieDialog: React.FC<{ close?: () => void }> = ({ close }) => {
  const [role, setRole] = useState<string | undefined>(undefined);
  const [hub, setHub] = useState<string | undefined>(undefined);
  const [wallet, setWallet] = useState<string | undefined>(undefined);

  return (
    <DialogContent className="rounded-xl bg-white [&>button]:hidden">
      <DialogHeader>
        <DialogTitle className="text-base font-semibold">Add Admin</DialogTitle>
        <DialogDescription className="font-base text-sm">
          Only verified wallet addresses can sign in to the system. Please
          double-check the information before adding a new admin.
        </DialogDescription>
      </DialogHeader>

      <div className="grid grid-cols-2 gap-1">
        <FloatingLabelInput
          id="wallet"
          label="Wallet Address"
          className="col-span-2 !h-[72px] w-full"
          inputClassName="text-sm text-[#193049] font-semibold"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
        />
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger className="!h-auto w-full p-4 text-sm [&_.select-badge]:hidden">
            <SelectValue placeholder="Role" className="!text-sm" />
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
                  className="flex items-center justify-between px-4 py-2 hover:bg-gray-50"
                >
                  <span>{item.label}</span>
                  {role === item.value && (
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
          <SelectTrigger className="!h-auto w-full p-4 text-sm [&_.select-badge]:hidden">
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
                  className="flex items-center justify-between px-4 py-2 hover:bg-gray-50"
                >
                  <span>{item.label}</span>
                  {hub === item.value && (
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

      <DialogFooter className="mt-4 grid grid-cols-2 gap-2 md:flex">
        <Button
          className="bg-[#E6E6E6] text-[#193049] hover:bg-[#d9d9d9]"
          onClick={() => close?.()}
        >
          Cancel
        </Button>
        <Button className="bg-highlight text-white md:w-[100px]">
          Add Movie
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default AddMovieDialog;
