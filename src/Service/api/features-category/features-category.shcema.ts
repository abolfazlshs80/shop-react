import { z } from "zod";

export const CreateFeaturesCategorySchema = z.object({
  title: z
    .string()
    .min(2, "عنوان دسته‌بندی ویژگی حداقل باید ۲ کاراکتر باشد")
    .max(100, "عنوان دسته‌بندی ویژگی نباید بیشتر از ۱۰۰ کاراکتر باشد"),
});

export const UpdateFeaturesCategorySchema = z.object({
  id: z.number(),

  title: z
    .string()
    .min(2, "عنوان دسته‌بندی ویژگی حداقل باید ۲ کاراکتر باشد")
    .max(100, "عنوان دسته‌بندی ویژگی نباید بیشتر از ۱۰۰ کاراکتر باشد"),
});

export type CreateFeaturesCategoryForm = z.infer<
  typeof CreateFeaturesCategorySchema
>;

export type UpdateFeaturesCategoryForm = z.infer<
  typeof UpdateFeaturesCategorySchema
>;