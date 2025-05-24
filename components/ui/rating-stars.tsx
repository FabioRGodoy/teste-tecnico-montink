import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  count?: number;
}

export function RatingStars({ rating, count = 5 }: RatingStarsProps) {
  const fullStars = Math.round(rating);
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < fullStars ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}
