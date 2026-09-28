import { ApiClient } from "../api-client";
import type { ApiResponse } from "../types/api-response";
import type { PagedResult } from "../types/paged-result";

import type {
  CreateProductRequest,
  GetAllProductRequest,
  ProductDto,
  ProductSelectListDto,
  UpdateProductRequest,
} from "./product.types";

export class ProductService {
  private readonly api: ApiClient;

  constructor() {
    this.api = new ApiClient();
  }

  getAll(
    query?: GetAllProductRequest,
  ): Promise<ApiResponse<PagedResult<ProductDto>>> {
    return this.api.get<PagedResult<ProductDto>>("/api/Product", query);
  }

  getById(id: number): Promise<ApiResponse<ProductDto>> {
    return this.api.get<ProductDto>(`/api/Product/${id}`);
  }

  create(request: CreateProductRequest): Promise<ApiResponse<ProductDto>> {
    return this.api.post<ProductDto, CreateProductRequest>(
      "/api/Product",
      request,
    );
  }

  update(request: UpdateProductRequest): Promise<ApiResponse<ProductDto>> {
    return this.api.put<ProductDto, UpdateProductRequest>(
      `/api/Product/${request.id}`,
      request,
    );
  }

  delete(id: number): Promise<ApiResponse<void>> {
    return this.api.delete<void>(`/api/Product/${id}`);
  }

  toggle(id: number): Promise<ApiResponse<void>> {
    return this.api.put<void, Record<string, never>>(
      `/api/Product/${id}/Toggle`,
      {},
    );
  }

  getSelectList(
    query?: GetAllProductRequest,
  ): Promise<ApiResponse<PagedResult<ProductSelectListDto>>> {
    return this.api.get<PagedResult<ProductSelectListDto>>(
      "/api/Product/SelectList",
      query,
    );
  }
}
