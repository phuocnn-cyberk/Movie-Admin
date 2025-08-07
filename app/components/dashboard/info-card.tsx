import { cn } from "~/lib/utils";

interface InfoCardProps {
  iconSrc: string;
  label: string;
  value: string;
  className?: string;
}

export const InfoCard = ({
  iconSrc,
  label,
  value,
  className,
}: InfoCardProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg py-2 sm:w-full lg:py-[19.5px]",
        className
      )}
    >
      <img src={iconSrc} alt="" className="h-6 w-6 lg:h-10 lg:w-10" />
      <div className="flex flex-col gap-[2px]">
        <span className="text-xs leading-[22px] text-white lg:text-base">
          {label}
        </span>
        <span className="text-base font-semibold leading-[33px] lg:text-2xl">
          {value}
        </span>
      </div>
    </div>
  );
};
