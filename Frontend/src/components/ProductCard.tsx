import type { Product } from '../types/product'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  // Using a square aspect ratio so it mimics ArtworkCard style
  return (
    <article className="group overflow-hidden rounded-none bg-white">
      <div
        className="relative w-full overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.18)] aspect-[4/5] sm:aspect-square flex items-center justify-center p-4 bg-white"
      >
        {product.image && (
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="h-[80%] w-[80%] object-contain transition-transform duration-300 group-hover:scale-[1.03]"
          />
        )}

        <div
          className="absolute inset-x-0 bottom-0 px-3.5 pb-3 pt-12
            bg-gradient-to-t from-black/80 via-black/40 to-transparent
            text-white"
        >
          <div className="font-bold leading-tight line-clamp-1">{product.title}</div>
          <div className="mt-1 text-[0.92rem] opacity-90 font-medium">
            ${product.price.toFixed(2)}
          </div>
        </div>
      </div>
    </article>
  )
}
