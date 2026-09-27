import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { BannerService } from "../../../Service/api/Banner/banner.service";
import {
  UpdateBannerSchema,
  type UpdateBannerForm,
} from "../../../Service/api/Banner/banner.shcema";
import { BannerType } from "../../../Service/api/Banner/banner.types";

export default function EditBannerPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const service = new BannerService();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateBannerForm>({
    resolver: zodResolver(UpdateBannerSchema),
  });

  useEffect(() => {
    const loadBanner = async () => {
      if (!id) return;

      try {
        const response = await service.getById(Number(id));

        if (response) {
          reset({
            id: response.data?.id ?? 0,
            title: response.data?.title ?? "",
            description: response.data?.description ?? "",
            imageUrl: response.data?.imageUrl ?? "",
            url: response.data?.url ?? "",
            order: response.data?.order ?? 0,
            startDate: response.data?.startDate,
            endDate: response.data?.endDate,
            type: response.data?.type,
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadBanner();
  }, [id]);

  const onSubmit = async (data: UpdateBannerForm) => {
    try {
      await service.update(data);

      // alertService.success("بنر با موفقیت ویرایش شد");

      navigate("/admin/banners");
    } catch (error) {
      console.error(error);

      // handleApiError(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-xl font-bold">ویرایش بنر</h1>

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
        </div>

        <div>
          <label className="mb-2 block">آدرس تصویر</label>

          <input
            {...register("imageUrl")}
            className="w-full rounded-md border px-3 py-2"
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
            <option value={BannerType.Main}>اصلی</option>

            <option value={BannerType.TopBar}>فرعی</option>

            <option value={BannerType.Banner}>اسلایدر</option>
          </select>
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
