import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { CreateFeaturesCategorySchema, type CreateFeaturesCategoryForm } from "../../../Service/api/features-category/features-category.shcema";
import { FeaturesCategoryService } from "../../../Service/api/features-category/features-category.service";
import alertService from "../../../Hooks/alertService";
import { handleApiError } from "../../../Service/api/handleApiError";




export default function CreateFeaturesCategoryPage() {
  const navigate = useNavigate();
  const service = new FeaturesCategoryService();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateFeaturesCategoryForm>({
    resolver: zodResolver(CreateFeaturesCategorySchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (data: CreateFeaturesCategoryForm) => {
    try {
      await service.create(data);

      alertService.success("دسته‌بندی ویژگی با موفقیت ایجاد شد");
      navigate("/admin/features-categories");
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-xl font-bold">
        ایجاد دسته‌بندی ویژگی
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 rounded-xl border border-slate-200 bg-white p-6"
      >
        <div>
          <label className="mb-2 block text-sm font-medium">
            عنوان دسته‌بندی
          </label>

          <input
            {...register("title")}
            placeholder="مثلاً مشخصات ظاهری"
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
            {isSubmitting ? "در حال ثبت..." : "ثبت"}
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