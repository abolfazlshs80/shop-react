import { ApiClient } from "../api-client";
import type { ApiResponse } from "../types/api-response";
import type { PagedResult } from "../types/paged-result";
import type { CreateCategoryRequest, GetAllCategoryRequest, GetAllCategoryResponse, GetByIdCategoryResponse, GetSelectListCategoryResponse, UpdateCategoryRequest } from "./category.types";

export class CategoryService {
    private readonly api: ApiClient;

    constructor() {
      const ـapi = new ApiClient();
        this.api = ـapi;
    }

    getAll(query?: GetAllCategoryRequest): Promise<ApiResponse<PagedResult<GetAllCategoryResponse>>> {
        return this.api.get<PagedResult<GetAllCategoryResponse>>("/api/Category", query);
    }


    getById(id: number): Promise<ApiResponse<GetByIdCategoryResponse>> {
        return this.api.get<GetByIdCategoryResponse>(`/api/Category/${id}`);
    }

    create(request: CreateCategoryRequest): Promise<ApiResponse<GetAllCategoryRequest>> {
        return this.api.post<GetAllCategoryRequest, CreateCategoryRequest>(
            "/api/Category",
            request
        );
    }

    update(request: UpdateCategoryRequest): Promise<ApiResponse<GetAllCategoryRequest>> {
        return this.api.put<GetAllCategoryRequest, UpdateCategoryRequest>(
            `/api/Category/${request.id}`,
            request
        );
    }

    delete(id: number): Promise<ApiResponse<void>> {
        return this.api.delete<void>(`/api/Category/${id}`);
    }

    toggle(id: number): Promise<ApiResponse<void>> {
        return this.api.put<void, Record<string, never>>(
            `/api/Category/${id}/Toggle`,
            {}
        );
    }

    getSelectList(
        query?: GetAllCategoryRequest
    ): Promise<ApiResponse<PagedResult<GetSelectListCategoryResponse>>> {
        return this.api.get<PagedResult<GetSelectListCategoryResponse>>(
            "/api/Category/SelectList",
            query
        );
    }
}
