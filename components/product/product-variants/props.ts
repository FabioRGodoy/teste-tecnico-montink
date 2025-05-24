import { Color } from "@/types/product.types"

export interface ProductVariantsProps {
  sizes: string[]
  colors: Color[]
  selectedSize: string
  selectedColor: string
  setSelectedSize: (size: string) => void
  setSelectedColor: (color: string) => void
}
