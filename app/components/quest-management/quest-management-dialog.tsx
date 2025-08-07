import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@workspace/ui/components/dialog";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { RadioGroup, RadioGroupItem } from "@workspace/ui/components/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { XIcon } from "lucide-react";
import * as React from "react";
import { useImageUpload } from "~/hooks/quest-management/useImageUpload";
import { UploadArea } from "./upload-area";
import { UploadedFileDisplay } from "./uploaded-file-display";

interface CreateQuestDialogContextType {
  isOpen: boolean;
  onClose: () => void;
  mode?: "create" | "edit";
}

const CreateQuestDialogContext = React.createContext<CreateQuestDialogContextType | null>(null);

const useCreateQuestDialog = () => {
  const context = React.useContext(CreateQuestDialogContext);
  if (!context) {
    throw new Error("useCreateQuestDialog must be used within CreateQuestDialog.Root");
  }
  return context;
};

interface RootProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  mode?: "create" | "edit";
}

const Root: React.FC<RootProps> = ({ children, isOpen, onClose, mode = "create" }) => {
  return (
    <CreateQuestDialogContext.Provider value={{ isOpen, onClose, mode }}>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          className="max-h-[750px] w-[480px] gap-0 overflow-y-auto rounded-[24px] bg-white p-0"
          hideCloseButton
        >
          {children}
        </DialogContent>
      </Dialog>
    </CreateQuestDialogContext.Provider>
  );
};

const Header: React.FC = () => {
  const { mode } = useCreateQuestDialog();
  const title = mode === "edit" ? "Edit Quest" : "Create New Quest";

  return (
    <DialogHeader className="px-6 pt-6">
      <DialogTitle className="text-helix-black text-left text-base font-semibold leading-tight">
        {title}
        <DialogClose asChild className="absolute right-6 top-6">
          <XIcon className="text-helix-black size-6 cursor-pointer" />
        </DialogClose>
      </DialogTitle>
    </DialogHeader>
  );
};

const Description: React.FC = () => {
  const { mode } = useCreateQuestDialog();
  const description =
    mode === "edit" ? "Edit the quest details below." : "Fill in the information below to complete the quest creation.";

  return (
    <div className="px-6 py-4">
      <p className="text-sm font-normal text-[#8A8A8A]">{description}</p>
    </div>
  );
};

const ImageUpload: React.FC = () => {
  const { mode } = useCreateQuestDialog();
  const {
    uploadedFile,
    isDragOver,
    fileInputRef,
    handleFileInputChange,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleUploadClick,
    handleRemoveFile,
    formatFileSize,
  } = useImageUpload();

  console.log(uploadedFile);

  const mockFile = new File([""], "quest_image.png", { type: "image/png" });
  Object.defineProperty(mockFile, "size", { value: 10.6 * 1024 * 1024 });

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".jpg,.jpeg,.png"
        onChange={handleFileInputChange}
        className="hidden"
      />
      {mode === "edit" ? (
        <UploadedFileDisplay file={mockFile} onRemove={handleRemoveFile} formatFileSize={formatFileSize} />
      ) : uploadedFile ? (
        <UploadedFileDisplay file={uploadedFile} onRemove={handleRemoveFile} formatFileSize={formatFileSize} />
      ) : (
        <UploadArea
          isDragOver={isDragOver}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleUploadClick}
        />
      )}
    </>
  );
};

const CampaignSelect: React.FC = () => {
  return (
    <div className="px-6 py-4">
      <div className="space-y-1.5">
        <Label htmlFor="campaign" className="text-sm font-semibold text-[#193049]">
          Campaign
        </Label>
        <Select>
          <SelectTrigger className="border-input w-full border text-sm font-normal">
            <SelectValue placeholder="HELIX Testnet: Ignition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="helix-testnet-ignition" className="text-sm font-normal">
              HELIX Testnet: Ignition
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

const ActionType: React.FC = () => {
  const [actionType, setActionType] = React.useState("base");

  return (
    <div className="px-6 py-4">
      <div className="space-y-1.5">
        <Label className="text-helix-black text-sm font-semibold">Action Type</Label>
        <RadioGroup value={actionType} onValueChange={setActionType} className="flex gap-6">
          <div className="flex items-center gap-1">
            <RadioGroupItem
              value="base"
              id="base"
              className="data-[state=checked]:border-highlight border-blue-dark size-5 border-2"
            />
            <Label htmlFor="base" className="text-blue-dark cursor-pointer text-sm font-normal">
              Base Action
            </Label>
          </div>
          <div className="flex items-center gap-1">
            <RadioGroupItem
              value="seasonal"
              id="seasonal"
              className="data-[state=checked]:border-highlight border-blue-dark size-5 border-2"
            />
            <Label htmlFor="seasonal" className="text-blue-dark cursor-pointer text-sm font-normal">
              Seasonal Action
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

const QuestTitle: React.FC = () => {
  const [titleLength, setTitleLength] = React.useState(0);
  const [title, setTitle] = React.useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 120) {
      setTitle(value);
      setTitleLength(value.length);
    }
  };

  const handleTitleBlur = () => {
    const trimmedTitle = title.replace(/\s+/g, " ").trim();
    setTitle(trimmedTitle);
    setTitleLength(trimmedTitle.length);
  };

  return (
    <div className="px-6 py-4">
      <div className="space-y-1.5">
        <Label htmlFor="quest-title" className="text-sm font-semibold text-[#193049]">
          Action Title
        </Label>
        <div className="relative">
          <textarea
            id="quest-title"
            placeholder="Ex: Stake USHD"
            className="border-input flex min-h-[60px] w-full rounded-md border bg-white px-3 py-2 text-sm"
            rows={3}
            maxLength={120}
            value={title}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
          />
          <div className="absolute bottom-3 right-3 text-sm font-normal text-[#8A8A8A]">{titleLength}/120</div>
        </div>
      </div>
    </div>
  );
};

const QuestLink: React.FC = () => {
  const [link, setLink] = React.useState("");
  const [error, setError] = React.useState("");

  const validateLink = (value: string) => {
    if (!value.trim()) {
      setError("Quest Link is required");
      return false;
    }

    try {
      new URL(value);
      setError("");
      return true;
    } catch {
      setError("Please enter a valid URL");
      return false;
    }
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLink(value);
    if (value.trim()) {
      validateLink(value);
    } else {
      setError("");
    }
  };

  const handleLinkBlur = () => {
    validateLink(link);
  };

  return (
    <div className="px-6">
      <div className="space-y-1.5">
        <Label htmlFor="quest-link" className="text-sm font-semibold text-[#193049]">
          Quest Link
        </Label>
        <Input
          id="quest-link"
          placeholder="Enter the Google Form"
          className="text-sm font-normal"
          value={link}
          onChange={handleLinkChange}
          onBlur={handleLinkBlur}
        />
        {error && <p className="text-sm font-normal text-red-500">{error}</p>}
      </div>
    </div>
  );
};

const Actions: React.FC = () => {
  const { onClose, mode } = useCreateQuestDialog();
  const buttonText = mode === "edit" ? "Update Quest" : "Save";

  return (
    <div className="flex items-center justify-end gap-5 p-6">
      <button
        onClick={onClose}
        className="rounded-lg bg-[#E6E6E6] px-4 py-2 text-sm font-semibold text-[#193049] hover:bg-gray-200"
      >
        Cancel
      </button>
      <button
        disabled={mode === "create"}
        className="rounded-lg bg-[#01A8AB] px-4 py-2 text-sm font-semibold text-white opacity-30 hover:bg-[#019A9D] disabled:cursor-not-allowed"
      >
        {buttonText}
      </button>
    </div>
  );
};

export const CreateQuestDialog = {
  Root,
  Header,
  Description,
  ImageUpload,
  CampaignSelect,
  ActionType,
  QuestTitle,
  QuestLink,
  Actions,
};
