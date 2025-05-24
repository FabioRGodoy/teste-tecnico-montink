import { Product } from "@/types/product.types";

interface InfoGridProps {
  items: Pick<Product, "metadata">["metadata"];
}

export function InfoGrid({ items }: InfoGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
      {items.map((item) => (
        <div key={item.label} className="flex flex-col">
          <span className="text-sm text-gray-500">{item.label}</span>
          <span className="text-sm font-medium">{item.value}</span>
        </div>
      ))}
    </div>
  );
}
