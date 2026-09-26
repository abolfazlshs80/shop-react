import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { BrandService } from "../../../Service/api/brands/brand.service";
import { handleApiError } from "../../../Service/api/handleApiError";
import alertService from "../../../Hooks/alertService";

import {
  UpdateBrandSchema,
  type UpdateBrandForm,
} from "../../../Service/api/brands/brand.schema";

export default function EditBrandPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateBrandForm>({
    resolver: zodResolver(UpdateBrandSchema),

    defaultValues: {
      id: Number(id),
      parentId: null,
      title: "",
      image: null,
      urlName: "",
      icon: null,
    },
  });

  useEffect(() => {
    if (!id) {
      alertService.error("شناسه برند نامعتبر است");
      navigate("/admin/brands");
      return;
    }

    const loadBrand = async () => {
      try {
        setLoading(true);

        const brandService = new BrandService();

        const result = await brandService.getById(Number(id));

        const brand = result.data;

        reset({
          id: Number(id),
          parentId: brand?.parentId ?? null,
          title: brand?.title ?? "",
          image: brand?.image ?? null,
          urlName: brand?.urlName ?? "",
          icon: brand?.icon ?? null,
        });
      } catch (err) {
        alertService.error(handleApiError(err));
      } finally {
        setLoading(false);
      }
    };

    loadBrand();
  }, [id, navigate, reset]);

  const onSubmit = async (data: UpdateBrandForm) => {
    try {
      setSubmitting(true);

      const brandService = new BrandService();

      await brandService.update({
        ...data,
        title: data.title.trim(),
        urlName: data.urlName.trim(),
      });

      alertService.success("برند با موفقیت ویرایش شد");

      navigate("/admin/brands");
    } catch (err) {
      alertService.error(handleApiError(err));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <section dir="rtl">
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
          در حال دریافت اطلاعات برند...
        </div>
      </section>
    );
  }

  return (
    <section dir="rtl" className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          ویرایش برند
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          اطلاعات برند را ویرایش کنید
        </p>
      </div>

      {/* Form */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          {/* نام برند */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              نام برند
            </label>

            <input
              type="text"
              {...register("title")}
              placeholder="مثلاً Samsung"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />

            {errors.title && (
              <p className="mt-1 text-sm text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* URL */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              نام در URL
            </label>

            <input
              type="text"
              {...register("urlName")}
              placeholder="samsung"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />

            {errors.urlName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.urlName.message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={() => navigate("/admin/brands")}
              disabled={submitting}
              className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              انصراف
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting
                ? "در حال ذخیره..."
                : "ذخیره تغییرات"}
            </button>

          </div>
        </form>
      </div>
    </section>
  );
}