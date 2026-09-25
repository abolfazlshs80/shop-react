import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { handleApiError } from "../../../Service/api/handleApiError";
import alertService from "../../../Hooks/alertService";
import {
  type CreateCategoryRequest,
  type GetSelectListCategoryResponse,
} from "../../../Service/api/Categories/category.types";
import { CategoryService } from "../../../Service/api/Categories/category.service";
import CategorySelect from "../../../Components/CategorySelect";

export default function CreateCategoryPage() {
  const navigate = useNavigate();
  const service = new CategoryService();
  const [form, setForm] = useState<CreateCategoryRequest>({
    parentId: null,
    title: "",
    image: null,
    urlName: null,
    icon: null,
  });

  const [categories, setCategories] = useState<GetSelectListCategoryResponse[]>(
    [],
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const loadCategories = async () => {
    try {
      setError("");

      var result = await service.getSelectList();
      setCategories(result.data?.list ?? []);
    } catch (err) {
      const message = handleApiError(err);

      setError(message);
      alertService.error(message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadCategories();
  }, []);

  // پیشنهاد می‌شود از این نوع استفاده کنید
  const handleChange = (
    field: keyof CreateCategoryRequest,
    value: string | number | null | boolean,
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title?.trim()) {
      alertService.error("نام دسته بندی را وارد کنید");
      return;
    }

    console.log(form);
    try {
      setLoading(true);

      await service.create(form);

      alertService.success("دسته بندی با موفقیت ثبت شد");

      navigate("/admin/Category");
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
        <h1 className="text-2xl font-bold text-slate-900">افزودن دسته بندی</h1>

        <p className="mt-1 text-sm text-slate-500">
          اطلاعات دسته بندی جدید را وارد کنید
        </p>
      </div>

      {/* Form */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* نام دسته بندی */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              نام دسته بندی
            </label>

            <input
              type="text"
              value={form.title ?? ""}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="مثلاً Samsung"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              دسته‌بندی اصلی
            </label>

            <CategorySelect
              selectedCategoryId={form.parentId ?? undefined}
              onChange={(value) => {
                // اگر خالی انتخاب شد null بفرستد، در غیر این صورت مقدار عددی یا رشته‌ای
                handleChange("parentId", value ? Number(value) : null);
              }}
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
              onChange={(e) => handleChange("urlName", e.target.value)}
              placeholder="samsung"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/admin/Category")}
              className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              انصراف
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "در حال ثبت..." : "ثبت دسته بندی"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
