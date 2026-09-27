import { useEffect, useState } from "react";

import {
  useForm,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { UpdateProductFeatureSchema, type UpdateProductFeatureForm } from "../../../Service/api/ProductFeatures/productFeature.shcema";
import alertService from "../../../Hooks/alertService";
import { handleApiError } from "../../../Service/api/handleApiError";
import { ProductFeatureService } from "../../../Service/api/ProductFeatures/productFeature.service";


export default function EditProductFeaturePage() {

  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const service = new ProductFeatureService();

  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<UpdateProductFeatureForm>({
    resolver: zodResolver(
      UpdateProductFeatureSchema
    ),

    defaultValues: {
      id: 0,
      title: "",
    },
  });

  useEffect(() => {

    const loadData = async () => {

      if (!id) {
        alertService.error(
          "شناسه ویژگی معتبر نیست"
        );

        navigate("/admin/product-features");

        return;
      }

      try {

        const response =
          await service.getById(Number(id));

        if (response.data) {

          reset({
            id: response.data.id,
            title: response.data.title ?? "",
          });

        }

      } catch (error) {

        handleApiError(error);

      } finally {

        setLoading(false);

      }
    };

    void loadData();

  }, [id]);

  const onSubmit = async (
    data: UpdateProductFeatureForm
  ) => {

    try {

      const response =
        await service.update(data);

      if (
        response.statusCode >= 200 &&
        response.statusCode < 300
      ) {

        alertService.success(
          "ویژگی محصول با موفقیت ویرایش شد"
        );

        navigate("/admin/product-features");

      } else {

        alertService.error(
          response.message ??
            "ویرایش ویژگی ناموفق بود"
        );

      }

    } catch (error) {

      handleApiError(error);

    }

  };

  if (loading) {

    return (
      <div className="p-6 text-center text-slate-600">
        در حال دریافت اطلاعات ویژگی...
      </div>
    );

  }

  return (
    <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow-sm">

      <h1 className="mb-6 text-xl font-bold text-slate-800">
        ویرایش ویژگی محصول
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
              ? "در حال ذخیره..."
              : "ذخیره تغییرات"}
          </button>

        </div>

      </form>

    </div>
  );
}