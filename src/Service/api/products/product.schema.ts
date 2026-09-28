import { z } from "zod";

const ProductGallerySchema = z.object({
  displayPriority: z.number().int(),
  imageName: z.string().nullable(),
});

const ProductFeatureSchema = z.object({
  productFeaturesCategoryId: z.number().nullable(),
  productFeaturesId: z.number().nullable(),
  featureValue: z.string().nullable(),
});

export const CreateProductSchema = z.object({
  title: z
    .string()
    .min(2, "عنوان محصول حداقل باید ۲ کاراکتر باشد")
    .max(200, "عنوان محصول نباید بیشتر از ۲۰۰ کاراکتر باشد"),

  code: z
    .string()
    .max(100, "کد محصول نباید بیشتر از ۱۰۰ کاراکتر باشد")
    .nullable(),

  price: z.number().min(0, "قیمت نمی‌تواند منفی باشد"),

  shortDescription: z.string().nullable(),

  description: z.string().nullable(),

  image: z.string().nullable(),

  productGalleries: z.array(ProductGallerySchema).nullable(),

  productFeatures: z.array(ProductFeatureSchema).nullable(),

  colorsIds: z.array(z.number()).nullable(),

  categoriesIds: z.array(z.number()).nullable(),

  brandsIds: z.array(z.number()).nullable(),
});

export const UpdateProductSchema = CreateProductSchema.extend({
  id: z.number(),
});

export type CreateProductForm = z.infer<typeof CreateProductSchema>;

export type UpdateProductForm = z.infer<typeof UpdateProductSchema>;
