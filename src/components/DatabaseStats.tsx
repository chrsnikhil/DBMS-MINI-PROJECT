'use client'

import { useState, useEffect } from 'react'
import { Button } from './Button'

interface Product {
  id: number
  name: string
  quantity: number
  category_name: string
}

interface InventoryProduct extends Product {
  total_value: number
}

interface CategoryStats {
  category_name: string
  total_products: number
  total_quantity: number
  total_value: number
  average_price: number
}

interface DatabaseStats {
  lowStockProducts: Product[]
  inventoryValue: InventoryProduct[]
  categoryStats: CategoryStats[]
}

export function DatabaseStats() {
  const [stats, setStats] = useState<DatabaseStats>({
    lowStockProducts: [],
    inventoryValue: [],
    categoryStats: []
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/db-utils')
      if (!response.ok) {
        throw new Error('Failed to fetch database statistics')
      }
      const data = await response.json()
      setStats({
        lowStockProducts: data.lowStockProducts || [],
        inventoryValue: data.inventoryValue || [],
        categoryStats: data.categoryStats || []
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
      setError('Failed to load database statistics')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-700">{error}</p>
        <Button
          onClick={fetchStats}
          className="mt-2"
        >
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Low Stock Products */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900">Low Stock Products</h3>
          <div className="mt-4">
            {stats.lowStockProducts.length === 0 ? (
              <p className="text-gray-500">No low stock products found</p>
            ) : (
              <div className="flow-root">
                <ul className="-my-5 divide-y divide-gray-200">
                  {stats.lowStockProducts.map((product) => (
                    <li key={product.id} className="py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {product.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Category: {product.category_name}
                          </p>
                        </div>
                        <div className="inline-flex items-center text-sm font-semibold text-red-600">
                          {product.quantity} in stock
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Inventory Value */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900">Inventory Value</h3>
          <div className="mt-4">
            {stats.inventoryValue.length === 0 ? (
              <p className="text-gray-500">No inventory data available</p>
            ) : (
              <div className="flow-root">
                <ul className="-my-5 divide-y divide-gray-200">
                  {stats.inventoryValue.map((product) => (
                    <li key={product.id} className="py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {product.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Category: {product.category_name}
                          </p>
                        </div>
                        <div className="inline-flex items-center text-sm font-semibold text-green-600">
                          ${Number(product.total_value).toFixed(2)}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Category Statistics */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900">Category Statistics</h3>
          <div className="mt-4">
            {stats.categoryStats.length === 0 ? (
              <p className="text-gray-500">No category statistics available</p>
            ) : (
              <div className="flow-root">
                <ul className="-my-5 divide-y divide-gray-200">
                  {stats.categoryStats.map((category) => (
                    <li key={category.category_name} className="py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {category.category_name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {category.total_products} products
                          </p>
                        </div>
                        <div className="text-sm text-gray-500">
                          <p>Total Quantity: {category.total_quantity}</p>
                          <p>Total Value: ${Number(category.total_value).toFixed(2)}</p>
                          <p>Average Price: ${Number(category.average_price).toFixed(2)}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 