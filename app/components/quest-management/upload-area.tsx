import * as React from "react";
import folderUpload from "~/assets/folder-upload.svg";

interface UploadAreaProps {
  isDragOver: boolean;
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onClick: () => void;
}

export const UploadArea: React.FC<UploadAreaProps> = ({ isDragOver, onDrop, onDragOver, onDragLeave, onClick }) => {
  return (
    <div className="px-6 py-4">
      <div
        className={`flex items-center gap-3 rounded-md border border-[#E7E7E7] bg-white p-3 transition-colors ${
          isDragOver ? "border-[#01A8AB] bg-[#F0FDFD]" : ""
        }`}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={onClick}
      >
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded border-2 border-dashed border-[#E7E7E7]">
          <img src={folderUpload} alt="Folder Upload" className="h-10 w-10" />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <span className="text-sm font-semibold text-[#193049]">Quest Image Upload</span>
          <span className="text-sm font-normal text-[#8A8A8A]">
            Click to upload or drag and drop file here. File Supported .jpg, .png, up to 10Mb
          </span>
        </div>
      </div>
    </div>
  );
};
