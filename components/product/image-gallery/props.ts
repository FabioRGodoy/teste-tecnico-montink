export interface ImageGalleryProps {
  images: string[]
  selectedImage: number
  setSelectedImage: (index: number) => void
}