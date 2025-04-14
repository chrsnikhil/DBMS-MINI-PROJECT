import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Product } from "@prisma/client";

interface ProductPriceQuantity {
  price: number;
  quantity: number;
}

export async function GET() {
  try {
    const [
      totalProducts,
      totalCategories,
      totalSuppliers,
      totalLocations,
      lowStockProducts,
      recentTransactions,
      products,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.supplier.count(),
      prisma.location.count(),
      prisma.product.findMany({
        where: {
          quantity: {
            lte: 10, // Products with quantity less than or equal to 10
          },
        },
        take: 5,
        orderBy: {
          quantity: "asc",
        },
      }),
      prisma.transaction.findMany({
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.product.findMany({
        select: {
          price: true,
          quantity: true,
        },
      }),
    ]);

    // Calculate total inventory value
    const inventoryValue = products.reduce(
      (total: number, product: ProductPriceQuantity) => total + product.price * product.quantity,
      0
    );

    return NextResponse.json({
      totalProducts,
      totalCategories,
      totalSuppliers,
      totalLocations,
      lowStockProducts,
      recentTransactions,
      inventoryValue,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard stats" },
      { status: 500 }
    );
  }
} 