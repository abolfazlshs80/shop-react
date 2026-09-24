// src/api/account/account.types.ts

export interface LoginRequest {
    userName: string | null;
    password: string | null;
}

export interface RegisterRequest {
    firstName: string | null;
    lastName: string | null;
    mobile: string | null;
    password: string | null;
}

// در OpenAPI نوع data این endpoint مشخص نشده است.
// این مدل را پس از دیدن پاسخ واقعی Login کامل کن.
export interface LoginData {
    token?: string;
    [key: string]: unknown;
}
