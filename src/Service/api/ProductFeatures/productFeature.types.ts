import type { PageParams } from "../types/paged-result";

export interface ProductFeatureDto {
  id: number;
  title: string | null;
  status: boolean;
}

export interface GetAllProductFeatureResponse
  extends ProductFeatureDto {}

export interface GetByIdProductFeatureResponse
  extends ProductFeatureDto {}

export type GetSelectListProductFeatureResponse = Pick<
  ProductFeatureDto,
  "id" | "title" | "status"
>;

export interface CreateProductFeatureRequest {
  title: string;
}

export interface UpdateProductFeatureRequest
  extends CreateProductFeatureRequest {
  id: number;
}

export type GetAllProductFeatureRequest = PageParams & {
  [key: string]: string | number | boolean | undefined;
  Q?: string;
};