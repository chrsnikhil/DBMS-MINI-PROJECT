import { prisma } from '@/lib/prisma'
import { CategoryList } from './CategoryList'

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    include: {
      products: true,
    },
  })

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
        <div className="mt-4 sm:mt-0">
          <a
            href="/categories/new"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Category
          </a>
        </div>
      </div>

      <CategoryList initialCategories={categories} />
    </div>
  )
} 