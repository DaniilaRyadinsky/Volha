import { z } from 'zod'

export const ProductSchema = z.object({
  title: z.string().min(1, "Введите название"),
  article: z.string().min(1, "Введите артикул"),
  price: z.number().positive("Введите цену больше 0"),
  brand: z.string().min(1, "Выберите бренд"),
  category: z.string().min(1, "Выберите категорию"),
  country: z.string().min(1, "Выберите страну"),
  width: z.number().min(1),
  height: z.number().min(1),
  depth: z.number().min(1),
  description: z.string().optional(),
  materials: z.array(z.string()),
  colors: z.array(z.string()),
  photos: z.array(z.string()),
  seems: z.array(z.any()),
  id: z.string().optional()
});

export type ProductFormData = z.infer<typeof ProductSchema>;