import { Button } from "@/components/ui/button";
import { fetchAllProducts } from "@/lib/api";
import { Product } from "@/types/product.types";
import Link from "next/link";

export const HomeHero = async () => {
  const products: Product[] = await fetchAllProducts();

  return (
    <section className="flex flex-col items-center gap-4 py-12">
      <h1 className="text-center text-4xl font-bold">Olá, eu sou Fabio</h1>
      <p className="text-lg text-center text-gray-700">
        Desenvolvedor Full Stack | NextJS | Typescript
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center flex-wrap gap-3">
        {products.map((product, index) => (
          <Link href="/product/1" key={product.name + "-" + index}>
            <Button
              className="py-3 px-6 bg-black text-white rounded-xl hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed min-h-20 cursor-pointer"
              variant="primary"
            >
              {product.name}
            </Button>
          </Link>
        ))}
      </div>
    </section>
  );
};
