import { Product } from "@/types/product.types";
import { redirect } from "next/navigation";
import slugify from "slugify";

export const ensuresTheCorrectSlug = ({
  product,
  slugPart,
}: {
  product: Product;
  slugPart: string;
}) => {
  const expectedSlug = slugify(product.name, {
    lower: true,
    trim: true,
    strict: true,
  });

  if (slugPart !== expectedSlug) {
    return redirect(`/product/${product.id}/${expectedSlug}`);
  }
};
