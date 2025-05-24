"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import ImageGallery from "../image-gallery";
import ProductVariants from "../product-variants";
import DeliveryCheck from "../delivery-check";
import type { ProductDetailsProps } from "./props";
import type { Address } from "@/types/address.types";
import { Heart, ShoppingBag } from "lucide-react";
import { RatingStars } from "@/components/ui/rating-stars";
import { Button } from "@/components/ui/button";
import { InfoGrid } from "@/components/ui/info-grid";
import { BackLink } from "@/components/ui/back-link";

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useLocalStorage<number>(
    "selectedImage",
    0,
    15
  );
  const [selectedSize, setSelectedSize] = useLocalStorage<string>(
    "selectedSize",
    "",
    15
  );
  const [selectedColor, setSelectedColor] = useLocalStorage<string>(
    "selectedColor",
    "",
    15
  );

  const [cep, setCep] = useLocalStorage<string>("cep", "", 15);
  const [addressRaw, setAddressRaw] = useLocalStorage<Address | null>(
    "address",
    null,
    15
  );
  const setAddress = (a: Address | null) => setAddressRaw(a);

  const discountPercentage = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <BackLink href="/" />
      </div>
      <div className="flex flex-col md:flex-row gap-12">
        <div className="md:w-1/2">
          <ImageGallery
            images={product.images}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
        </div>

        <div className="md:w-1/2 space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <RatingStars rating={product.rating} />
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviewCount} avaliações)
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <div className="mt-4 flex items-center gap-3">
              <span className="text-2xl font-bold">
                R$ {product.price.toFixed(2).replace(".", ",")}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-lg text-gray-500 line-through">
                    R$ {product.originalPrice.toFixed(2).replace(".", ",")}
                  </span>
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-md">
                    -{discountPercentage}%
                  </span>
                </>
              )}
            </div>

            <p className="mt-4 text-gray-600">{product.description}</p>
          </div>

          <ProductVariants
            sizes={product.sizes}
            colors={product.colors}
            selectedSize={selectedSize}
            selectedColor={selectedColor}
            setSelectedSize={setSelectedSize}
            setSelectedColor={setSelectedColor}
          />

          <DeliveryCheck
            cep={cep}
            setCep={setCep}
            address={addressRaw}
            setAddress={setAddress}
          />

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="primary"
              className="py-3 px-6 bg-black text-white rounded-xl hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <ShoppingBag size={20} />
              <span>Adicionar ao carrinho</span>
            </Button>
            <Button variant="icon">
              <Heart size={20} className="text-gray-600" />
            </Button>
          </div>

          <InfoGrid items={product.metadata} />
        </div>
      </div>
    </div>
  );
}
