import { useEffect, useState } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useForm,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import alertService from "../../../Hooks/alertService";

import {
  handleApiError,
} from "../../../Service/api/handleApiError";

import {
  ColorService,
} from "../../../Service/api/Colors/color.service";
import { UpdateColorSchema, type UpdateColorForm } from "../../../Service/api/Colors/color.shcema";



export default function EditColorPage() {

  const { id } =
    useParams<{ id: string }>();

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const service =
    new ColorService();


  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<UpdateColorForm>({
    resolver: zodResolver(
      UpdateColorSchema
    ),

    defaultValues: {
      id: Number(id),
      colorName: "",
      colorCode: "#000000",
    },
  });


  const colorCode =
    watch("colorCode");


  // دریافت اطلاعات رنگ

  useEffect(() => {

    if (!id) {

      alertService.error(
        "شناسه رنگ نامعتبر است"
      );

      navigate("/admin/Color");

      return;
    }


    const loadColor =
      async () => {

        try {

          setLoading(true);

          const result =
            await service.getById(
              Number(id)
            );

          const color =
            result.data;


          reset({
            id: Number(id),

            colorName:
              color?.colorName ?? "",

            colorCode:
              color?.colorCode ??
              "#000000",
          });

        }
        catch (err) {

          alertService.error(
            handleApiError(err)
          );

        }
        finally {

          setLoading(false);

        }

      };


    loadColor();

  }, [
    id,
    navigate,
  ]);


  // Submit

  const onSubmit =
    async (
      data: UpdateColorForm
    ) => {

      try {

        setSubmitting(true);

        await service.update(
          data
        );

        alertService.success(
          "رنگ با موفقیت ویرایش شد"
        );

        navigate("/admin/Color");

      }
      catch (err) {

        alertService.error(
          handleApiError(err)
        );

      }
      finally {

        setSubmitting(false);

      }

    };


  if (loading) {

    return (

      <section dir="rtl">

        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">

          در حال دریافت اطلاعات رنگ...

        </div>

      </section>

    );

  }


  return (

    <section
      dir="rtl"
      className="space-y-6"
    >

      {/* Header */}

      <div>

        <h1 className="text-2xl font-bold text-slate-900">
          ویرایش رنگ
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          اطلاعات رنگ را ویرایش کنید
        </p>

      </div>


      {/* Form */}

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="space-y-5"
        >

          {/* Color Name */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              نام رنگ
            </label>

            <input
              type="text"
              {...register("colorName")}
              placeholder="مثلاً قرمز"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />

            {errors.colorName && (

              <p className="mt-1 text-sm text-red-500">

                {
                  errors.colorName.message
                }

              </p>

            )}

          </div>


          {/* Color Code */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              کد رنگ
            </label>

            <div className="flex items-center gap-3">

              <input
                type="color"
                value={
                  /^#[0-9A-Fa-f]{6}$/.test(
                    colorCode
                  )
                    ? colorCode
                    : "#000000"
                }
                onChange={(e) =>
                  setValue(
                    "colorCode",
                    e.target.value,
                    {
                      shouldValidate: true,
                      shouldDirty: true,
                    }
                  )
                }
                className="h-11 w-16 cursor-pointer rounded-lg border border-slate-300 p-1"
              />

              <input
                type="text"
                {...register("colorCode")}
                placeholder="#FF0000"
                className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 font-mono uppercase outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />

            </div>

            {errors.colorCode && (

              <p className="mt-1 text-sm text-red-500">

                {
                  errors.colorCode.message
                }

              </p>

            )}

          </div>


          {/* Buttons */}

          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              disabled={submitting}
              onClick={() =>
                navigate("/admin/Color")
              }
              className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              انصراف
            </button>


            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >

              {
                submitting
                  ? "در حال ذخیره..."
                  : "ذخیره تغییرات"
              }

            </button>

          </div>

        </form>

      </div>

    </section>

  );
}