import { ApiClient } from "../api-client";

import type { ApiResponse } from "../types/api-response";
import type { PagedResult } from "../types/paged-result";

import type {
  CreateColorRequest,
  GetAllColorRequest,
  GetAllColorResponse,
  GetByIdColorResponse,
  GetSelectListColorResponse,
  UpdateColorRequest,
} from "./color.types";

export class ColorService {
  private readonly api: ApiClient;

  constructor() {
    this.api = new ApiClient();
  }

  getAll(
    query?: GetAllColorRequest
  ): Promise<ApiResponse<PagedResult<GetAllColorResponse>>> {
    return this.api.get<PagedResult<GetAllColorResponse>>(
      "/api/Color",
      query
    );
  }

  getById(
    id: number
  ): Promise<ApiResponse<GetByIdColorResponse>> {
    return this.api.get<GetByIdColorResponse>(
      `/api/Color/${id}`
    );
  }

  create(
    request: CreateColorRequest
  ): Promise<ApiResponse<GetAllColorResponse>> {
    return this.api.post<GetAllColorResponse, CreateColorRequest>(
      "/api/Color",
      request
    );
  }

  update(
    request: UpdateColorRequest
  ): Promise<ApiResponse<GetAllColorResponse>> {
    return this.api.put<GetAllColorResponse, UpdateColorRequest>(
      `/api/Color/${request.id}`,
      request
    );
  }

  delete(id: number): Promise<ApiResponse<void>> {
    return this.api.delete<void>(
      `/api/Color/${id}`
    );
  }

  toggle(id: number): Promise<ApiResponse<void>> {
    return this.api.put<void, Record<string, never>>(
      `/api/Color/${id}/Toggle`,
      {}
    );
  }

  getSelectList(
    query?: GetAllColorRequest
  ): Promise<ApiResponse<PagedResult<GetSelectListColorResponse>>> {
    return this.api.get<PagedResult<GetSelectListColorResponse>>(
      "/api/Color/SelectList",
      query
    );
  }
}