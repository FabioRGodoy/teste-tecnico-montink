import type { Product } from "@/types/product.types";

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

export const fetchAllProducts = async (): Promise<Product[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/product`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch products (${res.status})`);
  }

  return res.json();
};
