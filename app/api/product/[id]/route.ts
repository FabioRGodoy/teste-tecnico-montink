import { NextRequest, NextResponse } from "next/server";
import type { Product } from "@/types/product.types";
import { readProducts } from "@/lib/api";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params;

    const products: Product[] = await readProducts();

    const product = products.find((p) => p.id === id);

    if (!product) {
      return NextResponse.json(
        { error: "Produto não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Erro ao ler o JSON:", error);
    return NextResponse.json(
      { error: "Erro interno ao processar a requisição" },
      { status: 500 }
    );
  }
}
