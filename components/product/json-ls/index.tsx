import { Product } from "@/types/product.types";
import Script from "next/script";
import { JSX } from "react";

export const JsonLd = ({
  product,
}: {
  product: Product;
}): JSX.Element | null => {
  if (!product) return null;
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.images.map((img) =>
      img.startsWith("http") ? img : `${process.env.NEXT_PUBLIC_APP_URL!}${img}`
    ),
    description: product.description,
    sku: product.id,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "BRL",
    },
  };
  return (
    <Script id="ldjson" type="application/ld+json">
      {JSON.stringify(jsonLd)}
    </Script>
  );
};
