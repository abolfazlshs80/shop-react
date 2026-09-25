import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { handleApiError } from "../../../Service/api/handleApiError";
import alertService from "../../../Hooks/alertService";

import { CategoryService } from "../../../Service/api/Categories/category.service";
import type { UpdateCategoryRequest } from "../../../Service/api/Categories/category.types";
import CategorySelect from "../../../Components/CategorySelect";
import { FileStoreService } from "../../../Service/api/FileStores/fileStore.service";
import { FileStoreCategory } from "../../../Service/api/FileStores/fileStore.types";

export default function EditCategoryPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<UpdateCategoryRequest>({
    parentId: null,
    title: "",
    image: null,
    urlName: null,
    icon: null,
    id:Number(id)
    
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileStoreService = new FileStoreService();


  useEffect(() => {
    if (!id) {
      alertService.error("شناسه دسته بندی نامعتبر است");
      navigate("/admin/Categories");
      return;
    }

    const loadCategory = async () => {
      try {
        setLoading(true);

        const service = new CategoryService();

        const result = await service.getById(Number(id));

        const Category = result.data;

        setForm({
          parentId: Category?.parentId ?? null,
          title: Category?.title ?? "",
          image: Category?.image ?? null,
          urlName: Category?.urlName ?? null,
          icon: Category?.icon ?? null,
          id:Number(id)
        });
      } catch (err) {
        alertService.error(handleApiError(err));
      } finally {
        setLoading(false);
      }
    };

    loadCategory();
  }, [id, navigate]);

  const handleChange = (
    field: keyof UpdateCategoryRequest,
    value: string | number | null | boolean,
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
      alertService.error("نام دسته بندی را وارد کنید");
      return;
    }

        let fileId:number|undefined;
    try {
      setSubmitting(true);
      let updatedImagePath = form.image;
      if (selectedFile) {
        const resultFile = await fileStoreService.create({
          category: FileStoreCategory.Category,
          file: selectedFile,
        });
        fileId=resultFile?.data?.id;
  

        updatedImagePath=resultFile?.data?.path;
        setForm((prev) => ({
          ...prev,
          image: updatedImagePath,
        }));
      }

      const service = new CategoryService();



    await service.update(form);

      alertService.success("دسته بندی با موفقیت ویرایش شد");

      navigate("/admin/Category");
    } catch (err) {

      if(selectedFile &&fileId){
        await fileStoreService.delete(fileId);
      }
      alertService.error(handleApiError(err));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <section dir="rtl">
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
          در حال دریافت اطلاعات دسته بندی...
        </div>
      </section>
    );
  }

  return (
    <section dir="rtl" className="space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          ویرایش دسته بندی
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          اطلاعات دسته بندی را ویرایش کنید
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

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              دسته‌بندی اصلی
            </label>

            <CategorySelect
              selectedCategoryId={form.parentId ?? undefined}
              onChange={(value) => {
                handleChange("parentId", value ? Number(value) : null);
              }}
            />
          </div>


          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              تصویر
            </label>

            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                setSelectedFile(file);
              }}
              placeholder="samsung"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Buttons */}

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/admin/Category")}
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