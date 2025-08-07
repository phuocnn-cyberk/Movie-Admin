// Tạo một file mới, ví dụ: ~/hooks/support-management/useReplySupport.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { replySupport } from "~/services/api";
import { toast } from "sonner"
import type { SupportReplyPayload } from "~/types";

export const useReplySupport = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError } = useMutation({
    // 1. mutationFn: Hàm sẽ được thực thi khi gọi mutate.
    // Nó sẽ tự động nhận các biến được truyền vào `mutate`.
    mutationFn: (payload: SupportReplyPayload) => replySupport(payload),

    // 2. onSuccess: Callback được gọi khi mutation thành công.
    onSuccess: () => {
      toast.success("Phản hồi đã được gửi thành công!");

      // Vô hiệu hóa và làm mới lại query "support-list".
      // Điều này sẽ tự động cập nhật lại bảng dữ liệu của bạn.
      queryClient.invalidateQueries({ queryKey: ["support-list"] });
    },

    // 3. onError: Callback được gọi khi có lỗi xảy ra.
    onError: (error) => {
      // Bạn có thể xử lý lỗi chi tiết hơn ở đây
      toast.error(`Gửi phản hồi thất bại: ${error.message}`);
    },
  });

  return {
    // Đổi tên `mutate` thành `sendReply` để dễ hiểu hơn trong component
    sendReply: mutate,
    // isPending là trạng thái loading (thay cho isLoading ở v4)
    isReplying: isPending,
    isSuccess,
    isError,
  };
};