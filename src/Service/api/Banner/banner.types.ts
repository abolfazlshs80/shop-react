import type { PageParams } from "../types/paged-result";

export enum BannerType {
  Main = 0,
  TopBar = 1,
  Banner = 2,
}

export const BannerTypeOptions = [
  { value: BannerType.Main, label: "اصلی" },
  { value: BannerType.TopBar, label: "تاپ" },
  { value: BannerType.Banner, label: "اسلایدر" },
];

export const getBannerType = (type: BannerType) => {
  return BannerTypeOptions.find((item) => item.value === type)?.label ?? "-";
};
export interface BannerDto {
  id: number;
  title: string | null;
  description: string | null;
  imageUrl: string | null;
  url: string | null;
  order: number;
  startDate?: string | null;
  endDate?: string | null;
  type: BannerType;
  status: boolean;
}

export interface CreateBannerRequest {
  title: string | null;
  description: string | null;
  imageUrl: string | null;
  url: string | null;
  order: number;
  startDate?: string | null;
  endDate?: string | null;
  type: BannerType;
}

export interface UpdateBannerRequest extends CreateBannerRequest {
  id: number;
}

export type GetAllBannerRequest = PageParams & {
  [key: string]: string | number | boolean | undefined;
  Q?: string;
  Type?: BannerType;
};

export type GetSelectListBannerResponse = Pick<
  BannerDto,
  "id" | "title" | "imageUrl" | "type" | "status"
>;
