import { z } from "zod";
import { BannerType } from "./banner.types";

export const CreateBannerSchema = z.object({
  title: z.string().max(200, "عنوان نباید بیشتر از ۲۰۰ کاراکتر باشد"),

  description: z.string().max(1000, "توضیحات نباید بیشتر از ۱۰۰۰ کاراکتر باشد"),

  imageUrl: z.string().nullable(),

  url: z.string(),

  order: z.number().int("ترتیب باید عدد صحیح باشد"),

  startDate: z.string().nullable(),

  endDate: z.string().nullable(),

  type: z.nativeEnum(BannerType),
});

export const UpdateBannerSchema = CreateBannerSchema.extend({
  id: z.number(),
});

export type CreateBannerForm = z.infer<typeof CreateBannerSchema>;
export type UpdateBannerForm = z.infer<typeof UpdateBannerSchema>;
