import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { GetAllFeaturesCategoryResponse } from "../../../Service/api/features-category/features-category.types";
import { FeaturesCategoryService } from "../../../Service/api/features-category/features-category.service";
import { handleApiError } from "../../../Service/api/handleApiError";
import alertService from "../../../Hooks/alertService";


export default function ListFeaturesCategoriesPage() {
  const navigate = useNavigate();

  const [items, setItems] = useState<GetAllFeaturesCategoryResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const service = new FeaturesCategoryService();

  const loadItems = useCallback(async () => {
    try {
      setLoading(true);

      const response = await service.getAll();
      setItems(response.data?.list ?? []);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadItems();
  }, [loadItems]);

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "آیا از حذف این دسته‌بندی ویژگی مطمئن هستید؟"
    );

    if (!confirmed) return;

    try {
      await service.delete(id);
      alertService.success("دسته‌بندی ویژگی حذف شد");
      await loadItems();
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleToggle = async (id: number) => {
    try {
      await service.toggle(id);
      alertService.success("وضعیت دسته‌بندی تغییر کرد");
      await loadItems();
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold">
          دسته‌بندی ویژگی‌های محصول
        </h1>

        <button
          onClick={() => navigate("/admin/features-categories/create")}
          className="rounded-lg bg-blue-600 px-4 py-2.5 text-white hover:bg-blue-700"
        >
          ایجاد دسته‌بندی
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-right">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3">شناسه</th>
              <th className="px-4 py-3">عنوان</th>
              <th className="px-4 py-3">وضعیت</th>
              <th className="px-4 py-3">عملیات</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="p-6 text-center">
                  در حال دریافت اطلاعات...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-6 text-center text-slate-500">
                  دسته‌بندی‌ای یافت نشد
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="border-t border-slate-100">
                  <td className="px-4 py-3">{item.id}</td>

                  <td className="px-4 py-3">
                    {item.title ?? "-"}
                  </td>

                  <td className="px-4 py-3">
                    <button
                      onClick={() => void handleToggle(item.id)}
                      className={`rounded-full px-3 py-1 text-sm ${
                        item.status
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {item.status ? "فعال" : "غیرفعال"}
                    </button>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          navigate(
                            `/admin/features-categories/edit/${item.id}`
                          )
                        }
                        className="rounded-md bg-amber-100 px-3 py-1.5 text-amber-700"
                      >
                        ویرایش
                      </button>

                      <button
                        onClick={() => void handleDelete(item.id)}
                        className="rounded-md bg-red-100 px-3 py-1.5 text-red-700"
                      >
                        حذف
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}