import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { BannerService } from "../../../Service/api/Banner/banner.service";
import {
  CreateBannerSchema,
  type CreateBannerForm,
} from "../../../Service/api/Banner/banner.shcema";
import {
  BannerType,
  BannerTypeOptions,
} from "../../../Service/api/Banner/banner.types";
import { useState } from "react";
import { FileStoreService } from "../../../Service/api/FileStores/fileStore.service";
import { FileStoreCategory } from "../../../Service/api/FileStores/fileStore.types";
import { handleApiError } from "../../../Service/api/handleApiError";
import alertService from "../../../Hooks/alertService";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";


export default function CreateBannerPage() {
  const navigate = useNavigate();
  const service = new BannerService();
  const fileStoreService = new FileStoreService();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateBannerForm>({
    resolver: zodResolver(CreateBannerSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: null,
      url: "",
      order: 0,
      startDate: null,
      endDate: null,
      type: BannerType.Main,
    },
  });

  const onSubmit = async (data: CreateBannerForm) => {
    console.log("res");
    let fileId: number | undefined;
    try {
      if (selectedFile) {
        const resultFile = await fileStoreService.create({
          category: FileStoreCategory.Category,
          file: selectedFile,
        });

        fileId = resultFile?.data?.id;

        data.imageUrl = resultFile?.data?.path ?? null;
      }
      const response = await service.create(data);

      if (response) {
        alertService.success("بنر با موفقیت ایجاد شد");

        navigate("/admin/banners");
      }
    } catch (error) {
      console.error(error);
      if (selectedFile && fileId) {
        await fileStoreService.delete(fileId);
      }
      alertService.error(handleApiError(error));
    }
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-xl font-bold">ایجاد بنر</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="mb-2 block">عنوان</label>

          <input
            {...register("title")}
            className="w-full rounded-md border px-3 py-2"
          />

          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block">توضیحات</label>

          <textarea
            {...register("description")}
            rows={4}
            className="w-full rounded-md border px-3 py-2"
          />

          {errors.description && (
            <p className="mt-1 text-sm text-red-500">
              {errors.description.message}
            </p>
          )}
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
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block">لینک</label>

          <input
            {...register("url")}
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-2 block">ترتیب نمایش</label>

          <input
            type="number"
            {...register("order", {
              valueAsNumber: true,
            })}
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-2 block">تاریخ شروع</label>

          <input
            type="datetime-local"
            {...register("startDate")}
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-2 block">تاریخ پایان</label>

          <input
            type="datetime-local"
            {...register("endDate")}
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-2 block">نوع بنر</label>

          <select
            {...register("type", {
              valueAsNumber: true,
            })}
            className="w-full rounded-md border px-3 py-2"
          >
            {BannerTypeOptions.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-blue-600 px-5 py-2 text-white disabled:opacity-50"
        >
          {isSubmitting ? "در حال ثبت..." : "ثبت بنر"}
        </button>
      </form>
    </div>
  );
}
