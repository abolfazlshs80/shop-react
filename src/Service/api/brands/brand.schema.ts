import { z } from "zod";

export const CreateBrandSchema = z.object({
  title: z
    .string()
    .min(3, "نام برند باید حداقل 3 کاراکتر باشد")
    .max(100, "نام برند نباید بیشتر از 100 کاراکتر باشد"),

  urlName: z
    .string()
    .min(1, "نام URL الزامی است")
    .max(100, "نام URL نباید بیشتر از 100 کاراکتر باشد"),

  parentId: z.number().nullable(),

  image: z.string().nullable(),

  icon: z.string().nullable(),
});

export type CreateBrandForm = z.infer<typeof CreateBrandSchema>;


export const UpdateBrandSchema = CreateBrandSchema.extend({
  id: z.number().min(1,"ارسال شناسه الزامی است"),
});

export type UpdateBrandForm = z.infer<typeof UpdateBrandSchema>;