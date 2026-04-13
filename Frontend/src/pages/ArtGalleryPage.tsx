import { useEffect, useState } from 'react'
import type { Artwork } from '../types/strapi'
import { getArtworks } from '../services'
import ArtworkCard from '../components/ArtworkCard'
import Spinner from '../components/Spinner'

export default function ArtGalleryPage() {
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getArtworks()
      .then(setArtworks)
      .catch(() => setArtworks([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="lg" label="Cargando…" />
      </div>
    )
  }

  return (
    <section className="min-h-screen pt-36 pb-12">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="mb-2 text-center text-3xl font-bold">
          Mi Galería de <span className="text-brand-500">Arte</span>
        </h1>
        <p className="mb-10 text-center text-text-muted">
          Aquí pueden ver algunas de las pinturas en acrílico que he hecho en mi tiempo libre.
        </p>

        {artworks.length === 0 ? (
          <p className="text-center text-text-muted">No hay obras aún.</p>
        ) : (
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {artworks.map((a) => (
              <div key={a.id} className="mb-4 break-inside-avoid">
                <ArtworkCard artwork={a} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
