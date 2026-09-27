import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { ProductFeatureService } from "../../../Service/api/ProductFeatures/productFeature.service";
import { CreateProductFeatureSchema, type CreateProductFeatureForm } from "../../../Service/api/ProductFeatures/productFeature.shcema";
import alertService from "../../../Hooks/alertService";
import { handleApiError } from "../../../Service/api/handleApiError";



export default function CreateProductFeaturePage() {
  const navigate = useNavigate();

  const service = new ProductFeatureService();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateProductFeatureForm>({
    resolver: zodResolver(CreateProductFeatureSchema),

    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (
    data: CreateProductFeatureForm
  ) => {
    try {
      const response = await service.create(data);

      if (
        response.statusCode >= 200 &&
        response.statusCode < 300
      ) {
        alertService.success(
          "ویژگی محصول با موفقیت ایجاد شد"
        );

        navigate("/admin/product-features");
      } else {
        alertService.error(
          response.message ?? "ایجاد ویژگی ناموفق بود"
        );
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow-sm">

      <h1 className="mb-6 text-xl font-bold text-slate-800">
        ایجاد ویژگی محصول
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            عنوان ویژگی
          </label>

          <input
            {...register("title")}
            type="text"
            placeholder="مثلاً رنگ"
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />

          {errors.title && (
            <p className="mt-1 text-sm text-red-500">
              {errors.title.message}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-3">

          <button
            type="button"
            onClick={() =>
              navigate("/admin/product-features")
            }
            className="rounded-lg border border-slate-300 px-5 py-2.5 text-slate-700"
          >
            انصراف
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-white disabled:opacity-50"
          >
            {isSubmitting
              ? "در حال ثبت..."
              : "ثبت ویژگی"}
          </button>

        </div>

      </form>
    </div>
  );
}