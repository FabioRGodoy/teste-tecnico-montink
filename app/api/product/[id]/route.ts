import { NextRequest, NextResponse } from "next/server";
import type { Product } from "@/types/product.types";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params;

  const fakeProduct: Product = {
    id,
    name: "Camiseta “Contrate o Fabio” – Montink Edition",
    description:
      "Camiseta 100% algodão, unissex, edição limitada com estampa “Contrate o Fabio” e logo Montink no peito. Perfeita para devs que sabem valorizar talento!",
    price: 49.9,
    originalPrice: 59.9,
    rating: 5.0,
    reviewCount: 1,
    images: [
      "/images/products/frente.png",
      "/images/products/costas.png",
      "/images/products/dobrada.png",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Preto", value: "black" },
      { name: "Azul", value: "blue" },
      { name: "Cinza Mescla", value: "gray" },
    ],
    metadata: [
      { label: "Material", value: "100% Algodão" },
      { label: "Gênero", value: "Unissex" },
      { label: "Estampa", value: "Montink Fábio Colab" },
      { label: "Código", value: "FABIO-TS-MONTINK" },
    ],
  };

  return NextResponse.json(fakeProduct);
}
