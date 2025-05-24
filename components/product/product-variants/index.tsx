"use client";

import { Check } from "lucide-react";
import type { ProductVariantsProps } from "./props";
import { Button } from "@/components/ui/button";

export default function ProductVariants({
  sizes,
  colors,
  selectedSize,
  selectedColor,
  setSelectedSize,
  setSelectedColor,
}: ProductVariantsProps) {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-900">Cor</h3>
          {selectedColor && (
            <span className="text-sm text-gray-500">
              {colors.find((c) => c.value === selectedColor)?.name}
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              key={color.value}
              className={`
                w-10 h-10 rounded-full flex items-center justify-center
                transition-all duration-200
                ${
                  selectedColor === color.value
                    ? "ring-2 ring-offset-2 ring-black"
                    : "ring-1 ring-gray-200 hover:ring-gray-300"
                }
              `}
              style={{
                backgroundColor: color.value,
                border:
                  color.value === "#ffffff" ? "1px solid #e5e7eb" : "none",
              }}
              onClick={() => setSelectedColor(color.value)}
              aria-label={`Cor ${color.name}`}
            >
              {selectedColor === color.value && (
                <Check
                  size={16}
                  className={
                    color.value === "#ffffff" ? "text-black" : "text-white"
                  }
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-900">Tamanho</h3>
          {selectedSize && (
            <span className="text-sm text-gray-500">{selectedSize}</span>
          )}
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {sizes.map((size) => (
            <Button
              key={size}
              variant={selectedSize === size ? "primary" : "outline"}
              className="py-3 text-sm"
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
