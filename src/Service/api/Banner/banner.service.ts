import { ApiClient } from "../api-client";
import type { ApiResponse } from "../types/api-response";
import type { PagedResult } from "../types/paged-result";

import type {
  BannerDto,
  CreateBannerRequest,
  GetAllBannerRequest,
  GetSelectListBannerResponse,
  UpdateBannerRequest,
} from "./banner.types";

export class BannerService {
  private readonly api: ApiClient;

  constructor() {
    this.api = new ApiClient();
  }

  getAll(
    query?: GetAllBannerRequest
  ): Promise<ApiResponse<PagedResult<BannerDto>>> {
    return this.api.get<PagedResult<BannerDto>>(
      "/api/Banner",
      query
    );
  }

  getById(
    id: number
  ): Promise<ApiResponse<BannerDto>> {
    return this.api.get<BannerDto>(
      `/api/Banner/${id}`
    );
  }

  create(
    request: CreateBannerRequest
  ): Promise<ApiResponse<BannerDto>> {
    return this.api.post<BannerDto, CreateBannerRequest>(
      "/api/Banner",
      request
    );
  }

  update(
    request: UpdateBannerRequest
  ): Promise<ApiResponse<BannerDto>> {
    return this.api.put<BannerDto, UpdateBannerRequest>(
      `/api/Banner/${request.id}`,
      request
    );
  }

  delete(
    id: number
  ): Promise<ApiResponse<void>> {
    return this.api.delete<void>(
      `/api/Banner/${id}`
    );
  }

  toggle(
    id: number
  ): Promise<ApiResponse<void>> {
    return this.api.put<void, Record<string, never>>(
      `/api/Banner/${id}/Toggle`,
      {}
    );
  }

  getSelectList(
    query?: GetAllBannerRequest
  ): Promise<
    ApiResponse<PagedResult<GetSelectListBannerResponse>>
  > {
    return this.api.get<
      PagedResult<GetSelectListBannerResponse>
    >(
      "/api/Banner/SelectList",
      query
    );
  }

  getTypes(): Promise<ApiResponse<unknown>> {
    return this.api.get<unknown>(
      "/api/Banner/SelectList/Type"
    );
  }
}