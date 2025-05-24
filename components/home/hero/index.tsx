import { Button } from "@/components/ui/button";
import Link from "next/link";

export const HomeHero = () => {
  return (
    <section className="flex flex-col items-center gap-4 py-12">
      <h1 className="text-4xl font-bold">Olá, eu sou Fabio</h1>
      <p className="text-lg text-gray-700">
        Desenvolvedor Full Stack | NextJS | Typescript
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href="/product/1">
          <Button
            className="py-3 px-6 bg-black text-white rounded-xl hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed max-h-13 cursor-pointer"
            variant="primary"
          >
            Camiseta
          </Button>
        </Link>
        <Link href="/product/2">
          <Button
            className="py-3 px-6 bg-black text-white rounded-xl hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed max-h-13 cursor-pointer"
            variant="primary"
          >
            Caneca
          </Button>
        </Link>
        <Link href="/product/3">
          <Button
            className="py-3 px-6 bg-black text-white rounded-xl hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed max-h-13 cursor-pointer"
            variant="primary"
          >
            Boné
          </Button>
        </Link>
      </div>
    </section>
  );
};
