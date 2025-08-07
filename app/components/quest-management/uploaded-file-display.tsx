import { Trash } from "lucide-react";
import * as React from "react";

interface UploadedFileDisplayProps {
  file: File;
  onRemove: () => void;
  formatFileSize: (bytes: number) => string;
}

export const UploadedFileDisplay: React.FC<UploadedFileDisplayProps> = ({ file, onRemove, formatFileSize }) => {
  return (
    <div className="px-6 py-4">
      <div className="flex items-center gap-4 rounded-lg border border-[#F1F1F1] bg-white p-4">
        <div className="flex shrink-0 items-center justify-center">
          <img src={URL.createObjectURL(file)} alt="Uploaded Image" className="h-9 w-9 rounded-lg object-cover" />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <span className="text-sm font-semibold text-[#193049]">{file.name}</span>
          <span className="text-xs font-normal text-[#8A8A8A]">{formatFileSize(file.size)}</span>
        </div>
        <button
          onClick={onRemove}
          className="flex h-6 w-6 shrink-0 items-center justify-center text-[#8A8A8A] hover:text-[#193049]"
        >
          <Trash className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};
