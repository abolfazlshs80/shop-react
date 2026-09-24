export interface CreateBrandRequest {
    parentId: number | null;
    title: string | null;
    image: string | null;
    urlName: string | null;
    icon: string | null;
}

export interface UpdateBrandRequest extends CreateBrandRequest {
    id: number;
}

// مدل پاسخ نمونه است؛ فیلدها را با پاسخ واقعی API هماهنگ کن.
export interface Brand {
    id: number;
    parentId: number | null;
    title: string | null;
    image: string | null;
    urlName: string | null;
    icon: string | null;
    isActive?: boolean;
}

export interface BrandQuery {
    [key: string]: string | number | boolean | undefined;

    Q?: string;
    PageNumber?: number;
    PageSize?: number;
}


// شکل پاسخ صفحه‌بندی در OpenAPI مشخص نشده است.
// اگر API مستقیماً آرایه برمی‌گرداند، نتیجه را Brand[] تعریف کن.
export interface PagedResult<TItem> {
    items: TItem[];
    pageNumber: number;
    pageSize: number;
    totalCount: number;
}
