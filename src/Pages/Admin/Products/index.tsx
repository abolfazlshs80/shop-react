import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { ProductService } from "../../../Service/api/products/product.service";
import type { ProductDto } from "../../../Service/api/products/product.types";

export default function ProductIndexPage() {
  const [products, setProducts] = useState<ProductDto[]>([]);

  const [loading, setLoading] = useState(true);

  const service = new ProductService();

  const loadProducts = async () => {
    try {
      setLoading(true);

      const response = await service.getAll();

      if (response?.data?.list) {
        setProducts(response.data.list);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("آیا از حذف این محصول مطمئن هستید؟")) {
      return;
    }

    try {
      await service.delete(id);

      await loadProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggle = async (id: number) => {
    try {
      await service.toggle(id);

      await loadProducts();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div className="p-6">در حال دریافت محصولات...</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold">مدیریت محصولات</h1>

        <Link
          to="/admin/products/create"
          className="rounded-md bg-blue-600 px-4 py-2 text-white"
        >
          ایجاد محصول
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-right">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-3">شناسه</th>

              <th className="p-3">تصویر</th>

              <th className="p-3">عنوان</th>

              <th className="p-3">کد</th>

              <th className="p-3">قیمت</th>

              <th className="p-3">وضعیت</th>

              <th className="p-3">عملیات</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="p-3">{product.id}</td>

                <td className="p-3">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.title ?? "Product"}
                      className="h-16 w-16 rounded object-cover"
                    />
                  ) : (
                    <span>بدون تصویر</span>
                  )}
                </td>

                <td className="p-3">{product.title ?? "-"}</td>

                <td className="p-3">{product.code ?? "-"}</td>

                <td className="p-3">{product.price.toLocaleString()}</td>

                <td className="p-3">
                  {product.status ? (
                    <span className="text-green-600">فعال</span>
                  ) : (
                    <span className="text-red-600">غیرفعال</span>
                  )}
                </td>

                <td className="p-3">
                  <div className="flex gap-2">
                    <Link
                      to={`/admin/products/edit/${product.id}`}
                      className="rounded bg-blue-500 px-3 py-1 text-white"
                    >
                      ویرایش
                    </Link>

                    <button
                      onClick={() => handleToggle(product.id)}
                      className="rounded bg-yellow-500 px-3 py-1 text-white"
                    >
                      تغییر وضعیت
                    </button>

                    <button
                      onClick={() => handleDelete(product.id)}
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
