import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { BrandService } from "../../../Service/api/brands/brand.service";
import { handleApiError } from "../../../Service/api/handleApiError";
import type { Brand } from "../../../Service/api/brands/brand.types";
import alertService from "../../../Hooks/alertService";

export default function ListBrandPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
   const brandService = new BrandService();
  const loadBrands = async () => {
    try {
      setLoading(true);
      setError("");



      const result = await brandService.getAll({
        Q: "",
        PageNumber: 1,
        PageSize: 10,
      });

      setBrands(result.data?.list ?? []);
    } catch (err) {
      const message = handleApiError(err);

      setError(message);
      alertService.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBrands();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = await alertService.confirm(
      "این برند حذف خواهد شد. آیا مطمئن هستید؟"
    );

    if (!confirmed) {
      return;
    }

    try {
   

      await brandService.delete(id);

      alertService.success("برند با موفقیت حذف شد");

      await loadBrands();
    } catch (err) {
      alertService.error(handleApiError(err));
    }
  };

  return (
    <section dir="rtl" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            مدیریت برندها
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            فهرست برندهای ثبت‌شده در فروشگاه
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/admin/brands/create")}
          className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          افزودن برند
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
          در حال دریافت برندها...
        </div>
      ) : error ? (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {error}
        </div>
      ) : brands.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
          <p className="font-medium text-slate-700">
            هنوز برندی ثبت نشده است.
          </p>

          <p className="mt-1 text-sm text-slate-500">
            با انتخاب «افزودن برند» اولین برند را ثبت کنید.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-right">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold text-slate-600">
                    نام برند
                  </th>

                  <th className="px-6 py-3 text-xs font-semibold text-slate-600">
                    شناسه
                  </th>

                  <th className="px-6 py-3 text-xs font-semibold text-slate-600">
                    عملیات
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {brands.map((brand) => (
                  <tr
                    key={brand.id}
                    className="hover:bg-slate-50"
                  >
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900">
                      {brand.title}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                      {brand.id}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <div className="flex items-center gap-4">
                        {/* Edit */}
                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/admin/brands/edit/${brand.id}`
                            )
                          }
                          className="font-medium text-blue-600 hover:text-blue-800"
                        >
                          ویرایش
                        </button>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(brand.id)
                          }
                          className="font-medium text-red-600 hover:text-red-800"
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
        </div>
      )}
    </section>
  );
}