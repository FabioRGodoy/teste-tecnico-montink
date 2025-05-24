"use client";

import { useState } from "react";
import type React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ImageGalleryProps } from "./props";
import { Button } from "@/components/ui/button";

export default function ImageGallery({
  images,
  selectedImage,
  setSelectedImage,
}: ImageGalleryProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleSelectImage = (index: number) => {
    setSelectedImage(index);
  };

  const goToPrevious = () => {
    setSelectedImage((selectedImage - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setSelectedImage((selectedImage + 1) % images.length);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  return (
    <>
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-100">
        <div
          className={`w-full h-full transition-transform duration-200 ${
            isZoomed ? "scale-150" : "scale-100"
          }`}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={
            isZoomed
              ? { transformOrigin: `${mousePosition.x}% ${mousePosition.y}%` }
              : {}
          }
        >
          <Image
            src={images[selectedImage] || "/placeholder.svg"}
            alt="Imagem do produto"
            fill
            className="object-cover cursor-zoom-in"
            priority
          />
        </div>

        <Button
          variant="icon"
          onClick={goToPrevious}
          aria-label="Imagem anterior"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm"
        >
          <ChevronLeft size={20} />
        </Button>
        <Button
          variant="icon"
          onClick={goToNext}
          aria-label="Próxima imagem"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm"
        >
          <ChevronRight size={20} />
        </Button>
      </div>

      <div className="flex space-x-3 overflow-x-auto py-2 px-1">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative h-20 w-20 flex-shrink-0 cursor-pointer rounded-xl overflow-hidden transition-all duration-200 ${
              selectedImage === index
                ? "ring-2 ring-black ring-offset-2"
                : "ring-1 ring-gray-200 hover:ring-gray-300"
            }`}
            onClick={() => handleSelectImage(index)}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`Miniatura ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </>
  );
}
