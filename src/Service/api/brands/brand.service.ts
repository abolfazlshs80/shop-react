import type { ApiResponse } from "../types/api-response";
import type { PagedResult } from "../types/paged-result";
import type {
    Brand,
    BrandQuery,
    CreateBrandRequest,
    UpdateBrandRequest,
} from "./brand.types";
import { ApiClient } from "../api-client";

export class BrandService {
    private readonly api: ApiClient;

    constructor() {
      const ـapi = new ApiClient();
        this.api = ـapi;
    }

    getAll(query?: BrandQuery): Promise<ApiResponse<PagedResult<Brand>>> {
        return this.api.get<PagedResult<Brand>>("/api/Brand", query);
    }

    getById(id: number): Promise<ApiResponse<Brand>> {
        return this.api.get<Brand>(`/api/Brand/${id}`);
    }

    create(request: CreateBrandRequest): Promise<ApiResponse<Brand>> {
        return this.api.post<Brand, CreateBrandRequest>(
            "/api/Brand",
            request
        );
    }

    update(request: UpdateBrandRequest): Promise<ApiResponse<Brand>> {
        return this.api.put<Brand, UpdateBrandRequest>(
            `/api/Brand/${request.id}`,
            request
        );
    }

    delete(id: number): Promise<ApiResponse<void>> {
        return this.api.delete<void>(`/api/Brand/${id}`);
    }

    toggle(id: number): Promise<ApiResponse<void>> {
        return this.api.put<void, Record<string, never>>(
            `/api/Brand/${id}/Toggle`,
            {}
        );
    }

    getSelectList(
        query?: BrandQuery
    ): Promise<ApiResponse<PagedResult<Brand>>> {
        return this.api.get<PagedResult<Brand>>(
            "/api/Brand/SelectList",
            query
        );
    }
}
