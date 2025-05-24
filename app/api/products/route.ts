import { NextResponse } from "next/server";
import type { Product } from "@/types/product.types";
import { promises as fs } from "fs";
import path from "path";

export async function GET(): Promise<NextResponse> {
  try {
    const jsonPath = path.join(process.cwd(), "mock", "products.json");
    const jsonData = await fs.readFile(jsonPath, "utf-8");
    const products: Product[] = JSON.parse(jsonData);

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
