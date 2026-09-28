import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { ProductService } from "../../../Service/api/products/product.service";
import {
  CreateProductSchema,
  type CreateProductForm,
} from "../../../Service/api/products/product.schema";
import alertService from "../../../Hooks/alertService";
import { handleApiError } from "../../../Service/api/handleApiError";
import { CategoryService } from "../../../Service/api/Categories/category.service";
import { useEffect, useState } from "react";
import type { GetAllCategoryResponse } from "../../../Service/api/Categories/category.types";
import CategorySelect from "../../../Components/CategorySelect";

export default function CreateProductPage() {
  const navigate = useNavigate();

  const service = new ProductService();
  const CateService = new CategoryService();

  const [cate, setCate] = useState<GetAllCategoryResponse[]>([]);
  useEffect(() => {
    async function loads() {
      var responseGetAllCate = await CateService.getAll();
      setCate(responseGetAllCate.data?.list ?? []);
    }
    loads();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateProductForm>({
    resolver: zodResolver(CreateProductSchema),

    defaultValues: {
      title: "",
      code: "",
      price: 0,

      shortDescription: "",
      description: "",

      image: "",

      productGalleries: [],
      productFeatures: [],

      colorsIds: [],
      categoriesIds: [],
      brandsIds: [],
    },
  });

  const onSubmit = async (data: CreateProductForm) => {
    try {
      await service.create(data);

      alertService.success("محصول با موفقیت ایجاد شد");

      navigate("/admin/products");
    } catch (error) {
      console.error(error);

      alertService.error(handleApiError(error));
    }
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-xl font-bold">ایجاد محصول</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Title */}

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

        {/* Code */}

        <div>
          <label className="mb-2 block">کد محصول</label>

          <input
            {...register("code")}
            className="w-full rounded-md border px-3 py-2"
          />

          {errors.code && (
            <p className="mt-1 text-sm text-red-500">{errors.code.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            دسته‌بندی اصلی
          </label>

          <CategorySelect
            selectedCategoryId={undefined}
            onChange={(value) => {
              setValue("categoriesIds", value ? [Number(value)] : [], {
                shouldValidate: true,
              });
            }}
          />

          {errors.categoriesIds && (
            <p className="mt-1 text-sm text-red-500">
              {errors.categoriesIds.message}
            </p>
          )}
        </div>

        {/* Price */}

        <div>
          <label className="mb-2 block">قیمت</label>

          <input
            type="number"
            {...register("price", {
              valueAsNumber: true,
            })}
            className="w-full rounded-md border px-3 py-2"
          />

          {errors.price && (
            <p className="mt-1 text-sm text-red-500">{errors.price.message}</p>
          )}
        </div>

        {/* Image */}

        <div>
          <label className="mb-2 block">تصویر اصلی</label>

          <input
            {...register("image")}
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        {/* Short Description */}

        <div>
          <label className="mb-2 block">توضیح کوتاه</label>

          <textarea
            {...register("shortDescription")}
            rows={3}
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        {/* Description */}

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
          {isSubmitting ? "در حال ثبت..." : "ثبت محصول"}
        </button>
      </form>
    </div>
  );
}
