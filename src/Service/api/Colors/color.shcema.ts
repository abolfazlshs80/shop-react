import { z } from "zod";

export const CreateColorSchema = z.object({
  colorName: z
    .string()
    .min(2, "نام رنگ الزامی است")
    .max(100, "نام رنگ نباید بیشتر از 100 کاراکتر باشد"),

  colorCode: z
    .string()
    .min(1, "کد رنگ الزامی است")
    .max(20, "کد رنگ نباید بیشتر از 20 کاراکتر باشد"),
});

export const UpdateColorSchema = z.object({
  id: z.number(),

  colorName: z
    .string()
    .min(2, "نام رنگ الزامی است")
    .max(100, "نام رنگ نباید بیشتر از 100 کاراکتر باشد"),

  colorCode: z
    .string()
    .min(1, "کد رنگ الزامی است")
    .max(20, "کد رنگ نباید بیشتر از 20 کاراکتر باشد"),
});

export type CreateColorForm =
  z.infer<typeof CreateColorSchema>;

export type UpdateColorForm =
  z.infer<typeof UpdateColorSchema>;