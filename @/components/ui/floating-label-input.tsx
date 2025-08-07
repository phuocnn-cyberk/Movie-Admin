import * as React from "react";
import { cn } from "~/lib/utils";
import { Input } from "./input";

export interface FloatingLabelInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  inputClassName?: string;
}

export const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  id,
  label,
  className = "",
  type = "text",
  inputClassName,
  ...props
}) => {
  return (
    <div className={`relative ${className}`}>
      <Input
        id={id}
        type={type}
        placeholder=" "
        className={cn(
          "peer h-full w-full bg-transparent px-4 pb-2 pt-6 placeholder-transparent focus:ring-0",
          inputClassName
        )}
        {...props}
      />
      <label
        htmlFor={id}
        className={`absolute left-4 top-2 z-10 text-sm text-[#8A8A8A] transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-4 peer-focus:-translate-y-0 peer-focus:text-[12px]`}
      >
        {label}
      </label>
    </div>
  );
};
