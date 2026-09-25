import { ApiClient } from "../api-client";
import type { ApiResponse } from "../types/api-response";
import type { PagedResult } from "../types/paged-result";
import type {
  CreateFileStoreRequest,
  CreateFileStoreResponse,
  GetAllFileStoreRequest,
  GetAllFileStoreResponse,
  GetByIdFileStoreResponse,
  UpdateFileStoreRequest,
  UpdateFileStoreResponse,
} from "./fileStore.types";

export class FileStoreService {
  private readonly api: ApiClient;

  constructor() {
    this.api = new ApiClient();
  }

  // 1. دریافت لیست فایل‌ها
  getAll(
    query?: GetAllFileStoreRequest,
  ): Promise<ApiResponse<PagedResult<GetAllFileStoreResponse>>> {
    return this.api.get<PagedResult<GetAllFileStoreResponse>>(
      "/api/FileStore",
      query as any,
    );
  }

  // 2. دریافت تک فایل با شناسه
  getById(id: number): Promise<ApiResponse<GetByIdFileStoreResponse>> {
    return this.api.get<GetByIdFileStoreResponse>(`/api/FileStore/${id}`);
  }

  // 3. ایجاد و آپلود فایل (multipart/form-data)
  create(
    request: CreateFileStoreRequest,
  ): Promise<ApiResponse<CreateFileStoreResponse>> {
    const formData = new FormData();
    if (request.file) {
      formData.append("file", request.file);
    }
    formData.append("category", request.category.toString());

    return this.api.post<CreateFileStoreResponse, FormData>(
      "/api/FileStore",
      formData,
    );
  }

  // 4. ویرایش فایل و اطلاعات (multipart/form-data)
  update(request: UpdateFileStoreRequest): Promise<ApiResponse<UpdateFileStoreResponse>> {
    const formData = new FormData();
    formData.append("id", request.id.toString());
    formData.append("category", request.category.toString());

    if (request.file) {
      formData.append("file", request.file);
    }

    return this.api.put<UpdateFileStoreResponse, FormData>(
      `/api/FileStore/${request.id}`,
      formData,
    );
  }

  // 5. حذف فایل
  delete(id: number): Promise<ApiResponse<void>> {
    return this.api.delete<void>(`/api/FileStore/${id}`);
  }
}
