import { useEffect } from "react";
import { ApiClient } from "./api-client";
import { BrandService } from "./brands/brand.service";
import { handleApiError } from "./handleApiError";

export default function Brand() {
  useEffect(() => {
    async function loadBrands() {


      const brandService = new BrandService();

      try {
        const result = await brandService.getAll({
          Q: "",
          PageNumber: 1,
          PageSize: 10,
        });
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        console.log(baseUrl);
      } catch (err) {
        console.error(handleApiError(err));
      }
    }

    loadBrands();
  }, []);

  return <div>abolfazl</div>;
}
