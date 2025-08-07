import { fh } from "~/utils/format";
import { CopyIcon } from "lucide-react";
import { toast } from "sonner";

export const Wallet = () => {
  const wallets = [
    {
      label: "First",
      address: "0xc01A8f2Ade995dc57D6A752Ffad7B82F39BFdd3b",
    },
    {
      label: "Second",
      address: "0xc01A8f2Ade995dc57D6A752Ffad7B82F39BFdd3b",
    },
    {
      label: "Thirst",
      address: "0xc01A8f2Ade995dc57D6A752Ffad7B82F39BFdd3b",
    },
  ];

  const handleCopy = (address: string) => {
    navigator.clipboard.writeText(address);
    toast.success("Address copied to clipboard");
  };

  return (
    <div className="col-span-1 rounded-3xl bg-[#E6F6F7] p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold leading-[22px]">
          Multi-signature Wallet
        </h3>
        <button type="button" className="text-xs font-semibold text-[#01A8AB]">
          Edit
        </button>
      </div>
      <p className="mt-4 text-sm leading-[19px] text-[#8A8A8A]">
        Approval from all 3 Safe wallets is required to process the transaction
      </p>
      <div className="mt-2 rounded-md border border-[#F1F1F1] bg-white py-3">
        {wallets.map(({ label, address }) => (
          <div
            key={label}
            className="border-b border-b-[#E6F6F7] p-3 first:pt-0 last:border-b-0 last:pb-0"
          >
            <p className="text-sm font-semibold leading-tight text-[#8A8A8A]">
              {label}
            </p>
            <div className="flex items-center justify-between space-x-2">
              <span className="text-xs font-semibold leading-tight text-[#193049]">
                {fh.truncateAddress(address)}
              </span>
              <CopyIcon
                className="h-4 w-4 shrink-0 cursor-pointer text-[#8A8A8A]"
                onClick={() => handleCopy(address)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
