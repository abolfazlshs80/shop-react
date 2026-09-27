import { ApiClient } from "../api-client";
import type { ApiResponse } from "../types/api-response";
import type { PagedResult } from "../types/paged-result";

import type {
  CreateProductFeatureRequest,
  GetAllProductFeatureRequest,
  GetAllProductFeatureResponse,
  GetByIdProductFeatureResponse,
  GetSelectListProductFeatureResponse,
  UpdateProductFeatureRequest,
} from "./productFeature.types";

export class ProductFeatureService {
  private readonly api: ApiClient;

  constructor() {
    this.api = new ApiClient();
  }

  getAll(
    query?: GetAllProductFeatureRequest
  ): Promise<ApiResponse<PagedResult<GetAllProductFeatureResponse>>> {
    return this.api.get<PagedResult<GetAllProductFeatureResponse>>(
      "/api/ProductFeatures",
      query
    );
  }

  getById(
    id: number
  ): Promise<ApiResponse<GetByIdProductFeatureResponse>> {
    return this.api.get<GetByIdProductFeatureResponse>(
      `/api/ProductFeatures/${id}`
    );
  }

  create(
    request: CreateProductFeatureRequest
  ): Promise<ApiResponse<GetAllProductFeatureResponse>> {
    return this.api.post<
      GetAllProductFeatureResponse,
      CreateProductFeatureRequest
    >("/api/ProductFeatures", request);
  }

  update(
    request: UpdateProductFeatureRequest
  ): Promise<ApiResponse<GetAllProductFeatureResponse>> {
    return this.api.put<
      GetAllProductFeatureResponse,
      UpdateProductFeatureRequest
    >(`/api/ProductFeatures/${request.id}`, request);
  }

  delete(id: number): Promise<ApiResponse<void>> {
    return this.api.delete<void>(
      `/api/ProductFeatures/${id}`
    );
  }

  toggle(id: number): Promise<ApiResponse<void>> {
    return this.api.put<void, Record<string, never>>(
      `/api/ProductFeatures/${id}/Toggle`,
      {}
    );
  }

  getSelectList(
    query?: GetAllProductFeatureRequest
  ): Promise<
    ApiResponse<PagedResult<GetSelectListProductFeatureResponse>>
  > {
    return this.api.get<
      PagedResult<GetSelectListProductFeatureResponse>
    >("/api/ProductFeatures/SelectList", query);
  }
}