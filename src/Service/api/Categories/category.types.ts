import type { PageParams } from "../types/paged-result";

export interface CategoryDto{
        id: number,
        title: string,
        parentId: number| null,
        image: string| null,
        urlName: string| null,
        icon: string| null,
        status: true
}
// export type GetSelectListCategoryResponse =
//   Omit<GetAllCategoryResponse, "icon"|"urlName"|"image"|"parentId">;

export interface GetAllCategoryResponse extends CategoryDto {}

export interface GetByIdCategoryResponse extends CategoryDto {}

export type GetSelectListCategoryResponse = Pick<CategoryDto, "id" | "title" | "status">;

export interface CreateCategoryRequest{
        title: string,
        parentId: number| null,
        image: string| null,
        // imageInput?: File|null,
        urlName: string,
        icon: string| null,
}

export interface UpdateCategoryRequest extends CreateCategoryRequest{
        id: number,
}

export type GetAllCategoryRequest = PageParams & {
      [key: string]: string | number | boolean | undefined;

    Q?: string;
 
};

