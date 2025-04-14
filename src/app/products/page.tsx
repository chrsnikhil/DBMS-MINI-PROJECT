import { prisma } from '@/lib/prisma'
import { ProductList } from './ProductList'

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.category.findMany({
      include: {
        products: true,
      },
    }),
  ])

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Products</h2>
        <div className="mt-4 sm:mt-0">
          <a
            href="/products/new"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Product
          </a>
        </div>
      </div>

      <ProductList initialProducts={products} categories={categories} />
    </div>
  )
} 