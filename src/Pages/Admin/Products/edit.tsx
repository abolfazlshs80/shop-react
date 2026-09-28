import { useEffect } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { useNavigate, useParams } from "react-router-dom";

import { ProductService } from "../../../Service/api/products/product.service";

import {
  UpdateProductSchema,
  type UpdateProductForm,
} from "../../../Service/api/products/product.schema";

export default function EditProductPage() {
  const navigate = useNavigate();

  const { id } = useParams();

  const service = new ProductService();

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors, isSubmitting },
  } = useForm<UpdateProductForm>({
    resolver: zodResolver(UpdateProductSchema),
  });

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;

      try {
        const response = await service.getById(Number(id));

        if (response?.data) {
          reset({
            id: response.data.id,

            title: response?.data?.title ?? "",

            code: response.data.code,

            price: response.data.price,

            shortDescription: response.data.shortDescription,

            description: response.data.description,

            image: response.data.image,

            productGalleries: response.data.productGalleries,

            productFeatures: response.data.productFeatures,

            colorsIds: response.data.colorsIds,

            categoriesIds: response.data.categoriesIds,

            brandsIds: response.data.brandsIds,
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadProduct();
  }, [id]);

  const onSubmit = async (data: UpdateProductForm) => {
    try {
      await service.update(data);

      // alertService.success(
      //   "محصول با موفقیت ویرایش شد"
      // );

      navigate("/admin/products");
    } catch (error) {
      console.error(error);

      // handleApiError(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-xl font-bold">ویرایش محصول</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="mb-2 block">عنوان محصول</label>

          <input
            {...register("title")}
            className="w-full rounded-md border px-3 py-2"
          />

          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block">کد محصول</label>

          <input
            {...register("code")}
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-2 block">قیمت</label>

          <input
            type="number"
            {...register("price", {
              valueAsNumber: true,
            })}
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-2 block">تصویر اصلی</label>

          <input
            {...register("image")}
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-2 block">توضیح کوتاه</label>

          <textarea
            {...register("shortDescription")}
            rows={3}
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-2 block">توضیحات</label>

          <textarea
            {...register("description")}
            rows={6}
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-blue-600 px-5 py-2 text-white disabled:opacity-50"
        >
          {isSubmitting ? "در حال ذخیره..." : "ذخیره تغییرات"}
        </button>
      </form>
    </div>
  );
}
