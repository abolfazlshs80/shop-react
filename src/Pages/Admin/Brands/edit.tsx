import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { BrandService } from "../../../Service/api/brands/brand.service";
import { handleApiError } from "../../../Service/api/handleApiError";
import alertService from "../../../Hooks/alertService";

import type { UpdateBrandRequest } from "../../../Service/api/brands/brand.types";

export default function EditBrandPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  console.log(id);
  const [form, setForm] = useState<UpdateBrandRequest>({
    parentId: null,
    title: null,
    image: null,
    urlName: null,
    icon: null,
    id:Number(id)
    
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

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

        setForm({
          parentId: brand?.parentId ?? null,
          title: brand?.title ?? "",
          image: brand?.image ?? null,
          urlName: brand?.urlName ?? null,
          icon: brand?.icon ?? null,
          id:Number(id)
        });
      } catch (err) {
        alertService.error(handleApiError(err));
      } finally {
        setLoading(false);
      }
    };

    loadBrand();
  }, [id, navigate]);

  const handleChange = (
    field: keyof UpdateBrandRequest,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) {
      return;
    }

    if (!form.title?.trim()) {
      alertService.error("نام برند را وارد کنید");
      return;
    }

    try {
      setSubmitting(true);

      const brandService = new BrandService();

      await brandService.update( {
        ...form,
        title: form.title?.trim(),
        
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
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* نام برند */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              نام برند
            </label>

            <input
              type="text"
              value={form.title ?? ""}
              onChange={(e) =>
                handleChange("title", e.target.value)
              }
              placeholder="مثلاً Samsung"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* URL */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              نام در URL
            </label>

            <input
              type="text"
              value={form.urlName ?? ""}
              onChange={(e) =>
                handleChange("urlName", e.target.value)
              }
              placeholder="samsung"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/admin/brands")}
              disabled={submitting}
              className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
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