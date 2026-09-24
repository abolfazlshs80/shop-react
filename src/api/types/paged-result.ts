export interface PagedResult<TItem> {
    items: TItem[];
    pageNumber: number;
    pageSize: number;
    totalCount: number;
}