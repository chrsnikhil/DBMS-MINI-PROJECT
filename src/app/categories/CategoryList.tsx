'use client'

import { useState } from 'react'
import { CategoryWithProducts } from '@/types'
import { Button } from '@/components/Button'

interface CategoryListProps {
  initialCategories: CategoryWithProducts[]
}

export function CategoryList({ initialCategories }: CategoryListProps) {
  const [categories, setCategories] = useState(initialCategories)

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this category? This will also delete all products in this category.')) return

    const response = await fetch(`/api/categories/${id}`, {
      method: 'DELETE',
    })

    if (response.ok) {
      setCategories(categories.filter((c) => c.id !== id))
    }
  }

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {categories.map((category) => (
          <li key={category.id}>
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {category.name}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {category.products.length} products
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <a
                    href={`/categories/${category.id}/edit`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Edit
                  </a>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(category.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
} 