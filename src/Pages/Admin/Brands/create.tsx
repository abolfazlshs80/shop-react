import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { BrandService } from "../../../Service/api/brands/brand.service";
import { handleApiError } from "../../../Service/api/handleApiError";
import alertService from "../../../Hooks/alertService";

import type { CreateBrandRequest } from "../../../Service/api/brands/brand.types";

export default function CreateBrandPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState<CreateBrandRequest>({
    parentId: null,
    title: "",
    image: null,
    urlName: null,
    icon: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    field: keyof CreateBrandRequest,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title?.trim()) {
      alertService.error("نام برند را وارد کنید");
      return;
    }

    try {
      setLoading(true);

      const brandService = new BrandService();

      await brandService.create(form);

      alertService.success("برند با موفقیت ثبت شد");

      navigate("/admin/brands");
    } catch (err) {
      alertService.error(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section dir="rtl" className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          افزودن برند
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          اطلاعات برند جدید را وارد کنید
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
              value={form.title??""}
              onChange={(e) =>
                handleChange("title", e.target.value)
              }
              placeholder="مثلاً Samsung"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* URL Name */}
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
              className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              انصراف
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "در حال ثبت..." : "ثبت برند"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}