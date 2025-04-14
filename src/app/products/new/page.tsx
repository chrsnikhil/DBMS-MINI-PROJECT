import { prisma } from '@/lib/prisma'
import { ProductForm } from '@/components/ProductForm'

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      <ProductForm categories={categories} />
    </div>
  )
} 