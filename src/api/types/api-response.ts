// src/api/types/api-response.ts

export interface ApiResponse<TData = unknown> {
    message: string | null;
    errors: string[] | null;
    statusCode: number;
    data: TData | null;
}
