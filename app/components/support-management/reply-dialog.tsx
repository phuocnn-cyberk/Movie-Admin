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
            <DialogTitle>Phản hồi cho yêu cầu #{supportId}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              id="response"
              placeholder="Nhập nội dung phản hồi của bạn tại đây..."
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
                Hủy
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-[#E50000] hover:opacity-80"
              disabled={isReplying || !responseText.trim()}
            >
              {isReplying ? "Đang gửi..." : "Gửi phản hồi"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
