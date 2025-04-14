import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Simple test query
    const products = await prisma.product.findMany()
    console.log('Found products:', products)

    return NextResponse.json({
      success: true,
      products: products || [],
      message: `Found ${products?.length || 0} products`
    })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { productId, quantityChange } = await request.json()

    // Use stored procedure to update product quantity
    await prisma.$queryRaw`
      CALL UpdateProductQuantity(${productId}, ${quantityChange})
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating product quantity:', error)
    return NextResponse.json(
      { error: 'Error updating product quantity' },
      { status: 500 }
    )
  }
} 