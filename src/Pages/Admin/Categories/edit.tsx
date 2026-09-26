import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { handleApiError } from "../../../Service/api/handleApiError";
import alertService from "../../../Hooks/alertService";

import { CategoryService } from "../../../Service/api/Categories/category.service";

import { FileStoreService } from "../../../Service/api/FileStores/fileStore.service";
import { FileStoreCategory } from "../../../Service/api/FileStores/fileStore.types";

import CategorySelect from "../../../Components/CategorySelect";
import { UpdateCategorySchema, type UpdateCategoryForm } from "../../../Service/api/Categories/category.shcema";



export default function EditCategoryPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fileStoreService = new FileStoreService();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<UpdateCategoryForm>({
    resolver: zodResolver(UpdateCategorySchema),

    defaultValues: {
      id: Number(id),
      title: "",
      parentId: null,
      image: null,
      urlName: "",
      icon: null,
    },
  });

  // دریافت اطلاعات دسته بندی
  useEffect(() => {
    if (!id) {
      alertService.error("شناسه دسته بندی نامعتبر است");
      navigate("/admin/Category");
      return;
    }

    const loadCategory = async () => {
      try {
        setLoading(true);

        const service = new CategoryService();

        const result = await service.getById(Number(id));

        const category = result.data;

        reset({
          id: Number(id),
          parentId: category?.parentId ?? null,
          title: category?.title ?? "",
          image: category?.image ?? null,
          urlName: category?.urlName ?? "",
          icon: category?.icon ?? null,
        });

      } catch (err) {
        alertService.error(handleApiError(err));
      } finally {
        setLoading(false);
      }
    };

    loadCategory();
  }, [id, navigate, reset]);


  // Submit
  const onSubmit = async (data: UpdateCategoryForm) => {
    let fileId: number | undefined;

    try {
      setSubmitting(true);

      let updatedImagePath = data.image;

      // آپلود تصویر جدید
      if (selectedFile) {
        const resultFile = await fileStoreService.create({
          category: FileStoreCategory.Category,
          file: selectedFile,
        });

        fileId = resultFile?.data?.id;

        updatedImagePath =
          resultFile?.data?.path ?? null;

        data.image = updatedImagePath;
      }

      const service = new CategoryService();

      await service.update(data);

      alertService.success(
        "دسته بندی با موفقیت ویرایش شد"
      );

      navigate("/admin/Category");

    } catch (err) {

      // اگر فایل آپلود شده ولی Update شکست خورد
      if (selectedFile && fileId) {
        await fileStoreService.delete(fileId);
      }

      alertService.error(
        handleApiError(err)
      );

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

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          {/* Title */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              نام دسته بندی
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


          {/* Parent Category */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              دسته‌بندی اصلی
            </label>

            <CategorySelect
              selectedCategoryId={watch("parentId") ?? undefined}
              onChange={(value) => {

                setValue(
                  "parentId",
                  value ? Number(value) : null,
                  {
                    shouldValidate: true,
                  }
                );

              }}
            />

            {errors.parentId && (
              <p className="mt-1 text-sm text-red-500">
                {errors.parentId.message}
              </p>
            )}

          </div>


          {/* Image */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              تصویر
            </label>

            <input
              type="file"
              onChange={(e) => {
                const file =
                  e.target.files?.[0] ?? null;

                setSelectedFile(file);
              }}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />

          </div>


          {/* Buttons */}

          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={() =>
                navigate("/admin/Category")
              }
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