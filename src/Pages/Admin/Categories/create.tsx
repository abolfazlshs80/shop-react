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

import { FileStoreService } from "../../../Service/api/FileStores/fileStore.service";
import { FileStoreCategory } from "../../../Service/api/FileStores/fileStore.types";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { CreateCategorySchema } from "../../../Service/api/Categories/category.shcema";

export default function CreateCategoryPage() {

  const navigate = useNavigate();

  const service = new CategoryService();
  const fileStoreService = new FileStoreService();

  const [categories, setCategories] = useState<
    GetSelectListCategoryResponse[]
  >([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateCategoryRequest>({
    resolver: zodResolver(CreateCategorySchema),

    defaultValues: {
      title: "",
      parentId: null,
      image: null,
      urlName: "",
      icon: null,
    },
  });


  const onSubmit = async (data: CreateCategoryRequest) => {

    console.log(data)
    let fileId: number | undefined;

    try {

      setLoading(true);

      // آپلود فایل
      if (selectedFile) {

        const resultFile = await fileStoreService.create({
          category: FileStoreCategory.Category,
          file: selectedFile,
        });

        fileId = resultFile?.data?.id;

        data.image = resultFile?.data?.path ?? null;
      }

      // ارسال دسته بندی
      await service.create(data);

      alertService.success(
        "دسته بندی با موفقیت ثبت شد"
      );

      navigate("/admin/Category");

    } catch (err) {

      // اگر آپلود فایل موفق شد ولی ساخت Category شکست خورد
      if (selectedFile && fileId) {
        await fileStoreService.delete(fileId);
      }

      alertService.error(
        handleApiError(err)
      );

    } finally {

      setLoading(false);

    }
  };


  const loadCategories = async () => {

    try {

      setError("");

      const result = await service.getSelectList();

      setCategories(result.data?.list ?? []);

    } catch (err) {

      const message = handleApiError(err);

      setError(message);

      alertService.error(message);

    }
  };


  useEffect(() => {
    loadCategories();
  }, []);


  return (

    <section dir="rtl" className="space-y-6">

      {/* Header */}

      <div>

        <h1 className="text-2xl font-bold text-slate-900">
          افزودن دسته بندی
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          اطلاعات دسته بندی جدید را وارد کنید
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


          {/* Parent Category */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              دسته‌بندی اصلی
            </label>

            <CategorySelect
              selectedCategoryId={undefined}
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


          {/* URL Name */}

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
              className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              انصراف
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "در حال ثبت..."
                : "ثبت دسته بندی"}
            </button>

          </div>

        </form>

      </div>

    </section>
  );
}