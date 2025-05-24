import type { Product } from "@/types/product.types";
import { promises as fs } from "fs";
import path from "path";
export async function readProducts(): Promise<Product[]> {
  const filePath = path.join(process.cwd(), "mock", "products.json");
  const content = await fs.readFile(filePath, "utf-8");
  return JSON.parse(content);
}

export const fetchProduct = async (id: string): Promise<Product> => {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    }/api/product/${id}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch product ${id} (${res.status})`);
  }

  return res.json();
};

export async function fetchAllProducts(): Promise<Product[]> {
  const products = await readProducts();
  return products;
}
