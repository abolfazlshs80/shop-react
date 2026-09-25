export interface PagedResult<TItem> {
    list: TItem[];
    pageNumber: number;
    pageSize: number;
    totalCount: number;
}