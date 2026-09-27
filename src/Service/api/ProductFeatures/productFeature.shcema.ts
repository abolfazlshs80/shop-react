import { z } from "zod";

export const CreateProductFeatureSchema = z.object({
  title: z
    .string()
    .min(2, "عنوان باید حداقل ۲ کاراکتر باشد")
    .max(100, "عنوان نباید بیشتر از ۱۰۰ کاراکتر باشد"),
});

export const UpdateProductFeatureSchema = z.object({
  id: z.number(),

  title: z
    .string()
    .min(2, "عنوان باید حداقل ۲ کاراکتر باشد")
    .max(100, "عنوان نباید بیشتر از ۱۰۰ کاراکتر باشد"),
});

export type CreateProductFeatureForm = z.infer<
  typeof CreateProductFeatureSchema
>;

export type UpdateProductFeatureForm = z.infer<
  typeof UpdateProductFeatureSchema
>;