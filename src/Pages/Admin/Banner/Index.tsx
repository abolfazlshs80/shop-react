import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BannerService } from "../../../Service/api/Banner/banner.service";
import {
  BannerType,
  getBannerType,
  type BannerDto,
} from "../../../Service/api/Banner/banner.types";
import { getFileUrl } from "../../../Utils/getFileUrl";

export default function BannerIndexPage() {
  const [banners, setBanners] = useState<BannerDto[]>([]);
  const [loading, setLoading] = useState(true);

  const service = new BannerService();

  const loadBanners = async () => {
    try {
      setLoading(true);

      const response = await service.getAll();

      if (response?.data?.list) {
        setBanners(response.data.list);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBanners();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("آیا از حذف این بنر مطمئن هستید؟")) {
      return;
    }

    try {
      await service.delete(id);

      await loadBanners();
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggle = async (id: number) => {
    try {
      await service.toggle(id);

      await loadBanners();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div className="p-6">در حال دریافت اطلاعات...</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold">مدیریت بنرها</h1>

        <Link
          to="/admin/banners/create"
          className="rounded-md bg-blue-600 px-4 py-2 text-white"
        >
          ایجاد بنر
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-right">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-3">شناسه</th>
              <th className="p-3">تصویر</th>
              <th className="p-3">عنوان</th>
              <th className="p-3">نوع</th>
              <th className="p-3">ترتیب</th>
              <th className="p-3">وضعیت</th>
              <th className="p-3">عملیات</th>
            </tr>
          </thead>

          <tbody>
            {banners.map((banner) => (
              <tr key={banner.id} className="border-b">
                <td className="p-3">{banner.id}</td>

                <td className="p-3">
                  {banner.imageUrl ? (
                    <img
                      src={getFileUrl(banner.imageUrl)}
                      alt={banner.title ?? "Banner"}
                      className="h-16 w-28 rounded object-cover"
                    />
                  ) : (
                    <span>بدون تصویر</span>
                  )}
                </td>

                <td className="p-3">{banner.title ?? "-"}</td>

                <td className="p-3">{getBannerType(banner.type)}</td>

                <td className="p-3">{banner.order}</td>

                <td className="p-3">
                  {banner.status ? (
                    <span className="text-green-600">فعال</span>
                  ) : (
                    <span className="text-red-600">غیرفعال</span>
                  )}
                </td>

                <td className="p-3">
                  <div className="flex gap-2">
                    <Link
                      to={`/admin/banners/edit/${banner.id}`}
                      className="rounded bg-blue-500 px-3 py-1 text-white"
                    >
                      ویرایش
                    </Link>

                    <button
                      onClick={() => handleToggle(banner.id)}
                      className="rounded bg-yellow-500 px-3 py-1 text-white"
                    >
                      تغییر وضعیت
                    </button>

                    <button
                      onClick={() => handleDelete(banner.id)}
                      className="rounded bg-red-500 px-3 py-1 text-white"
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
  );
}
