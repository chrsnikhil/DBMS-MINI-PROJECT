import { Product, Category } from '@prisma/client'

export type ProductWithCategory = Product & {
  category: Category
}

export type CategoryWithProducts = Category & {
  products: Product[]
}

export type ProductFormData = {
  name: string
  sku: string
  price: number
  quantity: number
  categoryId: number
  description?: string
  supplier?: string
  location?: string
}

export type CategoryFormData = {
  name: string
} 