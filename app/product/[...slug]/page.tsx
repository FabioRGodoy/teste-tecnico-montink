import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchAllProducts, fetchProduct } from "@/lib/api";
import { ProductDetails } from "@/components/product";
import { JsonLd } from "@/components/product/json-ls";
import { ensuresTheCorrectSlug } from "@/utils/common";
import type { Product } from "@/types/product.types";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  const products: Product[] = await fetchAllProducts();

  return products.map((product) => ({
    slug: [product.id],
  }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [id] = slug;
  const product: Product = await fetchProduct(id).catch(() => notFound());

  const metadataBase = new URL(process.env.NEXT_PUBLIC_APP_URL!);
  const canonical = `${metadataBase.origin}/product/${slug.join("/")}`;

  return {
    metadataBase,
    title: product.name,
    description: product.description.slice(0, 160),
    alternates: { canonical },
    openGraph: {
      title: product.name,
      description: product.description.slice(0, 160),
      url: canonical,
      images: product.images.map((img) =>
        img.startsWith("http") ? img : `${metadataBase.origin}${img}`
      ),
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const [id, slugPart] = slug;
  const product: Product = await fetchProduct(id).catch(() => notFound());

  ensuresTheCorrectSlug({ product, slugPart });

  return (
    <>
      <JsonLd product={product} />
      <ProductDetails product={product} />
    </>
  );
}
