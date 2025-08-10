import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";

interface ReplyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (responseText: string) => void;
  isReplying: boolean;
  supportId: number | null;
}

export const ReplyDialog: React.FC<ReplyDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
  isReplying,
  supportId,
}) => {
  const [responseText, setResponseText] = useState("");

  useEffect(() => {
    if (open) {
      setResponseText("");
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(responseText);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Reply to request #{supportId}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              id="response"
              placeholder="Enter your response here..."
              rows={6}
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
              disabled={isReplying}
            />
          </div>
          <DialogFooter>
            {/* DialogClose sẽ tự động xử lý việc đóng Dialog */}
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isReplying}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-[#E50000] text-white hover:opacity-80"
              disabled={isReplying || !responseText.trim()}
            >
              {isReplying ? "Sending..." : "Send response"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
