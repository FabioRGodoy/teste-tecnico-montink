import { Product } from "@/types/product.types";
import { redirect } from "next/navigation";
import slugify from "slugify";

export const stringToSlug = (str: string) => {
  if (!str) return "";

  return slugify(str, {
    lower: true,
    trim: true,
    strict: true,
  });
};

export const ensuresTheCorrectSlug = ({
  product,
  slugPart,
}: {
  product: Product;
  slugPart: string;
}) => {
  const expectedSlug = stringToSlug(product.name);

  if (slugPart !== expectedSlug) {
    return redirect(`/product/${product.id}/${expectedSlug}`);
  }
};
