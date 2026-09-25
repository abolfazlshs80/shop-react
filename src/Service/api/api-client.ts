import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
} from "axios";

import type { ApiResponse } from "./types/api-response";

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly errors: string[];

  constructor(message: string, statusCode: number, errors: string[] = []) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export class ApiClient {
  private readonly client: AxiosInstance;

  constructor(getToken?: () => string | null) {
    const baseURL = import.meta.env.VITE_API_BASE_URL;

    if (!baseURL) {
      throw new Error("VITE_API_BASE_URL is not set");
    }

    this.client = axios.create({
      baseURL,
      headers: {
        Accept: "application/json",
      },
    });

    this.client.interceptors.request.use((config) => {
      const token = getToken?.() ?? localStorage.getItem("access_token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });

    this.client.interceptors.response.use(
      (response) => response,
      (error: unknown) => {
        if (axios.isAxiosError<ApiResponse<unknown>>(error)) {
          const data = error.response?.data;

          return Promise.reject(
            new ApiError(
              data?.message ?? error.message ?? "خطایی در ارتباط با سرور رخ داد.",
              data?.statusCode ?? error.response?.status ?? 0,
              data?.errors ?? []
            )
          );
        }

        return Promise.reject(error);
      }
    );
  }

  async get<TData>(
    path: string,
    query?: Record<string, string | number | boolean | undefined>
  ): Promise<ApiResponse<TData>> {
    const response = await this.client.get<ApiResponse<TData>>(path, {
      params: query,
    });

    return response.data;
  }

  async post<TData, TBody>(
    path: string,
    body: TBody
  ): Promise<ApiResponse<TData>> {
    const response = await this.client.post<ApiResponse<TData>>(path, body);
    return response.data;
  }

  async put<TData, TBody>(
    path: string,
    body: TBody
  ): Promise<ApiResponse<TData>> {
    const response = await this.client.put<ApiResponse<TData>>(path, body);
    return response.data;
  }

  async delete<TData = void>(
    path: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<TData>> {
    const response = await this.client.delete<ApiResponse<TData>>(path, config);
    return response.data;
  }
}
