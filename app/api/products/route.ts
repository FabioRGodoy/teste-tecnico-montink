import { NextResponse } from "next/server";
import type { Product } from "@/types/product.types";
import { readProducts } from "@/lib/api";

export async function GET(): Promise<NextResponse> {
  try {
    const products: Product[] = await readProducts();

    if (!products) {
      return NextResponse.json(
        { error: "Produtos não encontrados" },
        { status: 404 }
      );
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error("Erro ao ler o JSON:", error);
    return NextResponse.json(
      { error: "Erro interno ao processar a requisição" },
      { status: 500 }
    );
  }
}
