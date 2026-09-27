import type { PageParams } from "../types/paged-result";

export interface ColorDto {
  id: number;
  colorName: string | null;
  colorCode: string | null;
  status: boolean;
}

export interface GetAllColorResponse extends ColorDto {}

export interface GetByIdColorResponse extends ColorDto {}

export type GetSelectListColorResponse = Pick<
  ColorDto,
  "id" | "colorName" | "colorCode" | "status"
>;

export interface CreateColorRequest {
  colorName: string;
  colorCode: string;
}

export interface UpdateColorRequest extends CreateColorRequest {
  id: number;
}

export type GetAllColorRequest = PageParams & {
  [key: string]: string | number | boolean | undefined;

  Q?: string;
};