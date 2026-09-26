import { z } from "zod";

export const CreateCategorySchema = z.object({
  title: z
    .string()
    .min(3, "عنوان دسته بندی الزامی است")
    .max(100, "عنوان دسته بندی نباید بیشتر از 100 کاراکتر باشد"),

  urlName: z
    .string()
    .min(1, "نام URL الزامی است")
    .max(100, "نام URL نباید بیشتر از 100 کاراکتر باشد"),

  parentId: z.number().nullable(),

  image: z.string().nullable(),

  icon: z.string().nullable(),

});



export const UpdateCategorySchema = z.object({
  title: z
    .string()
    .min(3, "عنوان دسته بندی باید حداقل 3 کاراکتر باشد")
    .max(100, "عنوان دسته بندی نباید بیشتر از 100 کاراکتر باشد"),

  urlName: z
    .string()
    .min(1, "نام URL الزامی است")
    .max(100, "نام URL نباید بیشتر از 100 کاراکتر باشد"),

  parentId: z.number().nullable(),

  image: z.string().nullable(),

  icon: z.string().nullable(),

  id: z.number(),
});

export type UpdateCategoryForm =
  z.infer<typeof UpdateCategorySchema>;