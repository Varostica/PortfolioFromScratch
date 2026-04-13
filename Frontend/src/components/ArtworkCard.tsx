import type { Artwork } from '../types/strapi'
import { toAbsoluteMediaUrl } from '../services'

interface ArtworkCardProps {
  artwork: Artwork
}

const ASPECT: Record<string, string> = {
  horizontal: 'aspect-video',       // 16:9
  vertical: 'aspect-[4/5]',         // 4:5
  square: 'aspect-square',          // 1:1
}

export default function ArtworkCard({ artwork }: ArtworkCardProps) {
  const imgUrl = artwork.image ? toAbsoluteMediaUrl(artwork.image.url) : ''
  const aspect = ASPECT[artwork.format ?? 'vertical'] ?? ASPECT.vertical

  return (
    <article className="group overflow-hidden rounded-none">
      <div
        className={`relative w-full overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.18)] ${aspect}`}
      >
        {imgUrl && (
          <img
            src={imgUrl}
            alt={artwork.title || 'Artwork'}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300
              group-hover:scale-[1.03]"
          />
        )}

        {(artwork.title || artwork.subtitle) && (
          <div
            className="absolute inset-x-0 bottom-0 px-3.5 pb-3 pt-10
              bg-gradient-to-t from-black/60 via-black/20 to-transparent
              text-white"
          >
            {artwork.title && (
              <div className="font-bold leading-tight">{artwork.title}</div>
            )}
            {artwork.subtitle && (
              <div className="mt-1 text-[0.92rem] opacity-90">{artwork.subtitle}</div>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
