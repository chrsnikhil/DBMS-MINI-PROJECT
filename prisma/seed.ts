import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create categories
  const electronics = await prisma.category.create({
    data: {
      name: 'Electronics',
    },
  })

  const clothing = await prisma.category.create({
    data: {
      name: 'Clothing',
    },
  })

  const books = await prisma.category.create({
    data: {
      name: 'Books',
    },
  })

  // Create products
  await prisma.product.createMany({
    data: [
      {
        name: 'Laptop',
        sku: 'TECH-001',
        price: 999.99,
        quantity: 15,
        categoryId: electronics.id,
        description: 'High-performance laptop with latest specifications',
      },
      {
        name: 'Smartphone',
        sku: 'TECH-002',
        price: 699.99,
        quantity: 8,
        categoryId: electronics.id,
        description: 'Latest smartphone with advanced camera features',
      },
      {
        name: 'T-Shirt',
        sku: 'CLT-001',
        price: 19.99,
        quantity: 100,
        categoryId: clothing.id,
        description: 'Cotton t-shirt available in multiple colors',
      },
      {
        name: 'Jeans',
        sku: 'CLT-002',
        price: 49.99,
        quantity: 50,
        categoryId: clothing.id,
        description: 'Classic fit denim jeans',
      },
      {
        name: 'Programming Guide',
        sku: 'BK-001',
        price: 29.99,
        quantity: 5,
        categoryId: books.id,
        description: 'Comprehensive programming guide for beginners',
      },
    ],
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 