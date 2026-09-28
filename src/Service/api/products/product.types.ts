import type { PageParams } from "../types/paged-result";

export interface ProductGalleryRequest {
  displayPriority: number;
  imageName: string | null;
}

export interface ProductFeatureRequest {
  productFeaturesCategoryId: number | null;
  productFeaturesId: number | null;
  featureValue: string | null;
}

export interface ProductDto {
  id: number;

  title: string | null;
  code: string | null;
  price: number;

  shortDescription: string | null;
  description: string | null;

  image: string | null;

  productGalleries: ProductGalleryRequest[] | null;

  productFeatures: ProductFeatureRequest[] | null;

  colorsIds: number[] | null;
  categoriesIds: number[] | null;
  brandsIds: number[] | null;

  status: boolean;
}

export interface CreateProductRequest {
  title: string;
  code: string | null;
  price: number;

  shortDescription: string | null;
  description: string | null;

  image: string | null;

  productGalleries: ProductGalleryRequest[] | null;

  productFeatures: ProductFeatureRequest[] | null;

  colorsIds: number[] | null;
  categoriesIds: number[] | null;
  brandsIds: number[] | null;
}

export interface UpdateProductRequest extends CreateProductRequest {
  id: number;
}

export type GetAllProductRequest = PageParams & {
  [key: string]: string | number | boolean | undefined;
  Q?: string;
};

export interface ProductSelectListDto {
  id: number;
  title: string | null;
}
