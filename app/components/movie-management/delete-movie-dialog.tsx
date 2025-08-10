import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import * as React from "react";

interface DeleteMovieDialogContextType {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteMovieDialogContext =
  React.createContext<DeleteMovieDialogContextType | null>(null);

const useDeleteMovieDialog = () => {
  const context = React.useContext(DeleteMovieDialogContext);
  if (!context) {
    throw new Error(
      "useDeleteMovieDialog must be used within DeleteMovieDialog.Root"
    );
  }
  return context;
};

interface RootProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const Root: React.FC<RootProps> = ({ children, isOpen, onClose, onDelete }) => {
  return (
    <DeleteMovieDialogContext.Provider value={{ isOpen, onClose, onDelete }}>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          className="max-h-[600px] w-[480px] gap-0 overflow-y-auto rounded-[24px] bg-white p-0"
          showCloseButton={false}
        >
          {children}
        </DialogContent>
      </Dialog>
    </DeleteMovieDialogContext.Provider>
  );
};

const Header: React.FC = () => {
  return (
    <DialogHeader className="px-6 pt-6">
      <DialogTitle className="text-helix-black text-left text-base font-semibold leading-tight">
        Delete this movie?
      </DialogTitle>
    </DialogHeader>
  );
};

const Description: React.FC = () => {
  return (
    <div className="px-6 pt-4">
      <p className="text-sm font-normal leading-6 text-[#8A8A8A]">
        This will permanently delete the movie. It'll be removed from the list
        and no longer available to users.
        <br />
        This action cannot be undone.
      </p>
    </div>
  );
};

const MoviePreview: React.FC<{ image: string; title: string }> = ({
  image,
  title,
}) => {
  return (
    <div className="px-6 pt-4">
      <div className="rounded-lg border border-[#E9E9E9] p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#CEEEEE] bg-[#648DB9]">
            <img src={image} alt={title} className="h-10 w-10 rounded-lg" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-base font-semibold text-[#193049]">
              {title}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Actions: React.FC = () => {
  const { onClose, onDelete } = useDeleteMovieDialog();

  return (
    <div className="flex items-center justify-end gap-5 p-6">
      <button
        onClick={onClose}
        className="rounded-lg bg-[#E6E6E6] px-4 py-2 text-sm font-semibold text-[#193049] hover:bg-gray-200"
      >
        Cancel
      </button>
      <button
        onClick={onDelete}
        className="w-[100px] rounded-lg bg-[#E2281E] px-4 py-2 text-sm font-semibold text-white hover:bg-[#C41E1E]"
      >
        Delete
      </button>
    </div>
  );
};

export const DeleteMovieDialog = {
  Root,
  Header,
  Description,
  MoviePreview,
  Actions,
};
