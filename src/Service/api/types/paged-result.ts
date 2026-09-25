export interface PagedResult<TItem> {
    list: TItem[];
    pageNumber: number;
    pageSize: number;
    totalCount: number;
}

export interface PageParams{
    pageSize?:number|null,
    pageNumber?:number|null,
}