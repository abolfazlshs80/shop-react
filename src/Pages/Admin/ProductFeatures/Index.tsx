import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ProductFeatureService } from "../../../Service/api/ProductFeatures/productFeature.service";
import type { GetAllProductFeatureResponse } from "../../../Service/api/ProductFeatures/productFeature.types";
import { handleApiError } from "../../../Service/api/handleApiError";
import alertService from "../../../Hooks/alertService";



export default function ListProductFeaturesPage() {

  const navigate = useNavigate();

  const service = new ProductFeatureService();

  const [items, setItems] =
    useState<GetAllProductFeatureResponse[]>([]);

  const [loading, setLoading] =
    useState(true);

  const loadItems = async () => {

    try {

      setLoading(true);

      const response =
        await service.getAll();

        console.log(response)

      const result = response.data;

      if (Array.isArray(result?.list)) {

        setItems(result.list);

      } else {

        setItems(
          (
            result as unknown as {
              items?: GetAllProductFeatureResponse[];
            }
          )?.items ?? []
        );

      }

    } catch (error) {

      handleApiError(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    void loadItems();

  }, []);

  const handleDelete = async (
    id: number
  ) => {

    const confirmed =
      window.confirm(
        "آیا از حذف این ویژگی محصول مطمئن هستید؟"
      );

    if (!confirmed) return;

    try {

      await service.delete(id);

      alertService.success(
        "ویژگی محصول حذف شد"
      );

      await loadItems();

    } catch (error) {

      handleApiError(error);

    }

  };

  const handleToggle = async (
    id: number
  ) => {

    try {

      await service.toggle(id);

      alertService.success(
        "وضعیت ویژگی تغییر کرد"
      );

      await loadItems();

    } catch (error) {

      handleApiError(error);

    }

  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">

        <h1 className="text-xl font-bold text-slate-800">
          ویژگی‌های محصول
        </h1>

        <button
          onClick={() =>
            navigate(
              "/admin/product-features/create"
            )
          }
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700"
        >
          ایجاد ویژگی
        </button>

      </div>

      {loading ? (

        <div className="py-10 text-center text-slate-500">
          در حال دریافت اطلاعات...
        </div>

      ) : items.length === 0 ? (

        <div className="py-10 text-center text-slate-500">
          ویژگی‌ای ثبت نشده است.
        </div>

      ) : (

        <div className="overflow-x-auto">

          <table className="w-full border-collapse text-right">

            <thead>

              <tr className="border-b bg-slate-50 text-sm text-slate-600">

                <th className="p-4">
                  شناسه
                </th>

                <th className="p-4">
                  عنوان ویژگی
                </th>

                <th className="p-4">
                  وضعیت
                </th>

                <th className="p-4">
                  عملیات
                </th>

              </tr>

            </thead>

            <tbody>

              {items.map((item) => (

                <tr
                  key={item.id}
                  className="border-b last:border-0 hover:bg-slate-50"
                >

                  <td className="p-4">
                    {item.id}
                  </td>

                  <td className="p-4 font-medium text-slate-800">
                    {item.title ?? "—"}
                  </td>

                  <td className="p-4">

                    <span
                      className={`rounded-full px-3 py-1 text-xs ${
                        item.status
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status
                        ? "فعال"
                        : "غیرفعال"}
                    </span>

                  </td>

                  <td className="p-4">

                    <div className="flex flex-wrap gap-2">

                      <button
                        onClick={() =>
                          navigate(
                            `/admin/product-features/edit/${item.id}`
                          )
                        }
                        className="rounded-md bg-blue-50 px-3 py-1.5 text-sm text-blue-700 hover:bg-blue-100"
                      >
                        ویرایش
                      </button>

                      <button
                        onClick={() =>
                          void handleToggle(item.id)
                        }
                        className="rounded-md bg-amber-50 px-3 py-1.5 text-sm text-amber-700 hover:bg-amber-100"
                      >
                        تغییر وضعیت
                      </button>

                      <button
                        onClick={() =>
                          void handleDelete(item.id)
                        }
                        className="rounded-md bg-red-50 px-3 py-1.5 text-sm text-red-700 hover:bg-red-100"
                      >
                        حذف
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}