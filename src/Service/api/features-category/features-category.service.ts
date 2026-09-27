import { ApiClient } from "../api-client";
import type { ApiResponse } from "../types/api-response";
import type { PagedResult } from "../types/paged-result";

import type {
  CreateFeaturesCategoryRequest,
  GetAllFeaturesCategoryRequest,
  GetAllFeaturesCategoryResponse,
  GetByIdFeaturesCategoryResponse,
  GetSelectListFeaturesCategoryResponse,
  UpdateFeaturesCategoryRequest,
} from "./features-category.types";

export class FeaturesCategoryService {
  private readonly api: ApiClient;

  constructor() {
    this.api = new ApiClient();
  }

  getAll(
    query?: GetAllFeaturesCategoryRequest
  ): Promise<ApiResponse<PagedResult<GetAllFeaturesCategoryResponse>>> {
    return this.api.get<PagedResult<GetAllFeaturesCategoryResponse>>(
      "/api/FeaturesCategory",
      query
    );
  }

  getById(
    id: number
  ): Promise<ApiResponse<GetByIdFeaturesCategoryResponse>> {
    return this.api.get<GetByIdFeaturesCategoryResponse>(
      `/api/FeaturesCategory/${id}`
    );
  }

  create(
    request: CreateFeaturesCategoryRequest
  ): Promise<ApiResponse<GetAllFeaturesCategoryResponse>> {
    return this.api.post<
      GetAllFeaturesCategoryResponse,
      CreateFeaturesCategoryRequest
    >("/api/FeaturesCategory", request);
  }

  update(
    request: UpdateFeaturesCategoryRequest
  ): Promise<ApiResponse<GetAllFeaturesCategoryResponse>> {
    return this.api.put<
      GetAllFeaturesCategoryResponse,
      UpdateFeaturesCategoryRequest
    >(`/api/FeaturesCategory/${request.id}`, request);
  }

  delete(id: number): Promise<ApiResponse<void>> {
    return this.api.delete<void>(`/api/FeaturesCategory/${id}`);
  }

  toggle(id: number): Promise<ApiResponse<void>> {
    return this.api.put<void, Record<string, never>>(
      `/api/FeaturesCategory/${id}/Toggle`,
      {}
    );
  }

  getSelectList(
    query?: GetAllFeaturesCategoryRequest
  ): Promise<ApiResponse<PagedResult<GetSelectListFeaturesCategoryResponse>>> {
    return this.api.get<
      PagedResult<GetSelectListFeaturesCategoryResponse>
    >("/api/FeaturesCategory/SelectList", query);
  }
}