import { useEffect, useState } from "react";

import {
  useNavigate,
} from "react-router-dom";

import type {
  GetAllColorResponse,
} from "../../../Service/api/Colors/color.types";

import {
  ColorService,
} from "../../../Service/api/Colors/color.service";

import alertService from "../../../Hooks/alertService";

import {
  handleApiError,
} from "../../../Service/api/handleApiError";


export default function ListColorsPage() {

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [colors, setColors] =
    useState<GetAllColorResponse[]>(
      []
    );

  const navigate =
    useNavigate();

  const service =
    new ColorService();


  const loadColors =
    async () => {

      try {

        setError("");

        const result =
          await service.getAll();

        setColors(
          result.data?.list ?? []
        );

      }
      catch (err) {

        const message =
          handleApiError(err);

        setError(message);

        alertService.error(
          message
        );

      }
      finally {

        setLoading(false);

      }

    };


  const handleDelete =
    async (id: number) => {

      const confirmed =
        await alertService.confirm(
          "این رنگ حذف خواهد شد. آیا مطمئن هستید؟"
        );

      if (!confirmed) {
        return;
      }


      try {

        await service.delete(id);

        alertService.success(
          "رنگ با موفقیت حذف شد"
        );

        await loadColors();

      }
      catch (err) {

        alertService.error(
          handleApiError(err)
        );

      }

    };


  const handleToggle =
    async (id: number) => {

      try {

        await service.toggle(id);

        alertService.success(
          "وضعیت رنگ با موفقیت تغییر کرد"
        );

        await loadColors();

      }
      catch (err) {

        alertService.error(
          handleApiError(err)
        );

      }

    };


  useEffect(() => {

    loadColors();

  }, []);


  return (

    <section
      dir="rtl"
      className="space-y-6"
    >

      {/* Header */}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <h1 className="text-2xl font-bold text-slate-900">
            مدیریت رنگ‌ها
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            فهرست رنگ‌های ثبت‌شده در فروشگاه
          </p>

        </div>


        <button
          type="button"
          onClick={() =>
            navigate(
              "/admin/color/create"
            )
          }
          className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          افزودن رنگ
        </button>

      </div>


      {/* Content */}

      {loading ? (

        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">

          در حال دریافت رنگ‌ها...

        </div>

      ) : error ? (

        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {error}
        </div>

      ) : colors.length === 0 ? (

        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">

          <p className="font-medium text-slate-700">
            هنوز رنگی ثبت نشده است.
          </p>

          <p className="mt-1 text-sm text-slate-500">
            با انتخاب «افزودن رنگ» اولین رنگ را ثبت کنید.
          </p>

        </div>

      ) : (

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

          <div className="overflow-x-auto">

            <table className="min-w-full divide-y divide-slate-200 text-right">

              <thead className="bg-slate-50">

                <tr>

                  <th className="px-6 py-3 text-xs font-semibold text-slate-600">
                    شناسه
                  </th>

                  <th className="px-6 py-3 text-xs font-semibold text-slate-600">
                    نام رنگ
                  </th>

                  <th className="px-6 py-3 text-xs font-semibold text-slate-600">
                    رنگ
                  </th>

                  <th className="px-6 py-3 text-xs font-semibold text-slate-600">
                    کد رنگ
                  </th>

                  <th className="px-6 py-3 text-xs font-semibold text-slate-600">
                    وضعیت
                  </th>

                  <th className="px-6 py-3 text-xs font-semibold text-slate-600">
                    عملیات
                  </th>

                </tr>

              </thead>


              <tbody className="divide-y divide-slate-100">

                {colors.map((color) => (

                  <tr
                    key={color.id}
                    className="hover:bg-slate-50"
                  >

                    {/* Id */}

                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                      {color.id}
                    </td>


                    {/* Name */}

                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900">
                      {color.colorName}
                    </td>


                    {/* Color */}

                    <td className="px-6 py-4">

                      <div
                        className="h-9 w-9 rounded-full border border-slate-300 shadow-sm"
                        style={{
                          backgroundColor:
                            color.colorCode ??
                            "#000000",
                        }}
                        title={
                          color.colorCode ??
                          ""
                        }
                      />

                    </td>


                    {/* Code */}

                    <td className="whitespace-nowrap px-6 py-4 text-sm font-mono text-slate-600">

                      {color.colorCode}

                    </td>


                    {/* Status */}

                    <td className="whitespace-nowrap px-6 py-4">

                      <button
                        type="button"
                        onClick={() =>
                          handleToggle(
                            color.id
                          )
                        }
                        className={
                          color.status
                            ? "rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700"
                            : "rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700"
                        }
                      >
                        {color.status
                          ? "فعال"
                          : "غیرفعال"}
                      </button>

                    </td>


                    {/* Actions */}

                    <td className="whitespace-nowrap px-6 py-4 text-sm">

                      <div className="flex items-center gap-4">

                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/admin/color/edit/${color.id}`
                            )
                          }
                          className="font-medium text-blue-600 hover:text-blue-800"
                        >
                          ویرایش
                        </button>


                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              color.id
                            )
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