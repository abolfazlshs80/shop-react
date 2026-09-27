import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { FeaturesCategoryService } from "../../../Service/api/features-category/features-category.service";
import { UpdateFeaturesCategorySchema, type UpdateFeaturesCategoryForm } from "../../../Service/api/features-category/features-category.shcema";
import { handleApiError } from "../../../Service/api/handleApiError";
import alertService from "../../../Hooks/alertService";



export default function EditFeaturesCategoryPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const service = new FeaturesCategoryService();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateFeaturesCategoryForm>({
    resolver: zodResolver(UpdateFeaturesCategorySchema),
    defaultValues: {
      id: 0,
      title: "",
    },
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!id || !Number.isInteger(Number(id)) || Number(id) <= 0) {
          throw new Error("شناسه دسته‌بندی معتبر نیست");
        }

        const response = await service.getById(Number(id));
        const item = response.data;

        if (!item) {
          throw new Error("دسته‌بندی ویژگی پیدا نشد");
        }

        reset({
          id: item.id,
          title: item.title ?? "",
        });
      } catch (error) {
        handleApiError(error);
      } finally {
        setLoading(false);
      }
    };

    void loadData();
  }, [id, reset]);

  const onSubmit = async (data: UpdateFeaturesCategoryForm) => {
    try {
      await service.update(data);

      alertService.success("دسته‌بندی ویژگی با موفقیت ویرایش شد");
      navigate("/admin/features-categories");
    } catch (error) {
      handleApiError(error);
    }
  };

  if (loading) {
    return <div className="p-6">در حال دریافت اطلاعات...</div>;
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-xl font-bold">
        ویرایش دسته‌بندی ویژگی
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 rounded-xl border border-slate-200 bg-white p-6"
      >
        <input type="hidden" {...register("id", { valueAsNumber: true })} />

        <div>
          <label className="mb-2 block text-sm font-medium">
            عنوان دسته‌بندی
          </label>

          <input
            {...register("title")}
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />

          {errors.title && (
            <p className="mt-1 text-sm text-red-500">
              {errors.title.message}
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "در حال ذخیره..." : "ذخیره تغییرات"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/features-categories")}
            className="rounded-lg border border-slate-300 px-5 py-2.5"
          >
            انصراف
          </button>
        </div>
      </form>
    </div>
  );
}