// components/DeleteButton.tsx
import React, { useState } from "react";
import alertService from "../Service/alertService";
import { handleApiError } from "../Service/api/handleApiError";


interface DeleteButtonProps {
  id: number;
  deleteAction: (id: number) => Promise<any>; // متد ارسالی سرویس
  onSuccess?: () => void | Promise<void>;    // متد لود مجدد جدول
  confirmMessage?: string;
  successMessage?: string;
  className?: string;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({
  id,
  deleteAction,
  onSuccess,
  confirmMessage = "آیا از حذف این مورد اطمینان دارید؟",
  successMessage = "عملیات حذف با موفقیت انجام شد",
  className,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = async () => {
    const confirmed = await alertService.confirm(confirmMessage);
    if (!confirmed) return;

    try {
      setLoading(true);
      await deleteAction(id);
      alertService.success(successMessage);

      if (onSuccess) {
        await onSuccess();
      }
    } catch (err) {
      alertService.error(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={
        className ||
        "px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-md text-xs font-medium transition-colors disabled:opacity-50"
      }
    >
      {loading ? "در حال حذف..." : "حذف"}
    </button>
  );
};
