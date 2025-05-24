import { NextRequest, NextResponse } from "next/server";
import type { Product } from "@/types/product.types";
import { promises as fs } from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const { id } = await params;

    const jsonPath = path.join(process.cwd(), "mock", "products.json");
    const jsonData = await fs.readFile(jsonPath, "utf-8");
    const products: Product[] = JSON.parse(jsonData);

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
