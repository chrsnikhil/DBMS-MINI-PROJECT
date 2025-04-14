import { prisma } from '@/lib/prisma'
import { DatabaseStats } from '@/components/DatabaseStats'

async function getDashboardStats() {
  const [totalProducts, totalCategories, lowStockProducts] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.product.findMany({
      where: {
        quantity: {
          lte: 10,
        },
      },
      include: {
        category: true,
      },
    }),
  ])

  return {
    totalProducts,
    totalCategories,
    lowStockProducts,
  }
}

export default async function Home() {
  const { totalProducts, totalCategories, lowStockProducts } = await getDashboardStats()

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Total Products
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {totalProducts}
            </dd>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Total Categories
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {totalCategories}
            </dd>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Low Stock Items
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {lowStockProducts.length}
            </dd>
          </div>
        </div>
      </div>

      {/* Database Statistics */}
      <DatabaseStats />

      {lowStockProducts.length > 0 && (
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">Low Stock Alerts</h3>
            <div className="mt-4">
              <div className="flow-root">
                <ul className="-my-5 divide-y divide-gray-200">
                  {lowStockProducts.map((product) => (
                    <li key={product.id} className="py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {product.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Category: {product.category.name}
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
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
