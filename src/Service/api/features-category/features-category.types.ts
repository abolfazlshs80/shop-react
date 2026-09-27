import type { PageParams } from "../types/paged-result";

export interface FeaturesCategoryDto {
  id: number;
  title: string | null;
  status: boolean;
}

export interface GetAllFeaturesCategoryResponse
  extends FeaturesCategoryDto {}

export interface GetByIdFeaturesCategoryResponse
  extends FeaturesCategoryDto {}

export type GetSelectListFeaturesCategoryResponse = Pick<
  FeaturesCategoryDto,
  "id" | "title" | "status"
>;

export interface CreateFeaturesCategoryRequest {
  title: string;
}

export interface UpdateFeaturesCategoryRequest
  extends CreateFeaturesCategoryRequest {
  id: number;
}

export type GetAllFeaturesCategoryRequest = PageParams & {
  [key: string]: string | number | boolean | undefined;
  Q?: string;
};