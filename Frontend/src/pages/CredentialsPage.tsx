import { useEffect, useState } from 'react'
import type { Credential } from '../types/strapi'
import { getCredentials, toAbsoluteMediaUrl } from '../services'
import CredentialCard from '../components/CredentialCard'
import Spinner from '../components/Spinner'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

export default function CredentialsPage() {
  const [credentials, setCredentials] = useState<Credential[]>([])
  const [loading, setLoading] = useState(true)

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  useEffect(() => {
    getCredentials()
      .then(setCredentials)
      .catch(() => setCredentials([]))
      .finally(() => setLoading(false))
  }, [])

  // Lightbox handlers
  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === 0 ? credentials.length - 1 : lightboxIndex - 1)
    }
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === credentials.length - 1 ? 0 : lightboxIndex + 1)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') setLightboxIndex(prev => prev !== null ? (prev === 0 ? credentials.length - 1 : prev - 1) : null)
      if (e.key === 'ArrowRight') setLightboxIndex(prev => prev !== null ? (prev === credentials.length - 1 ? 0 : prev + 1) : null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, credentials.length])

  // Prevent scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [lightboxIndex])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="lg" label="Loading…" />
      </div>
    )
  }

  const activeCredential = lightboxIndex !== null ? credentials[lightboxIndex] : null
  const lightboxImgUrl = activeCredential?.image ? toAbsoluteMediaUrl(activeCredential.image.url) : ''

  return (
    <section className="min-h-screen pt-36 pb-12">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="mb-2 text-center text-3xl font-bold">
          My <span className="text-brand-500">Hall of Fame</span>
        </h1>
        <p className="mb-10 text-center text-text-muted">
          Here you will find my degrees, credentials, certificates, and recognitions.
        </p>

        {credentials.length === 0 ? (
          <p className="text-center text-text-muted">No credentials yet — stay tuned!</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {credentials.map((cred, index) => (
              <div key={cred.id}>
                <CredentialCard 
                  credential={cred} 
                  onClickImage={() => openLightbox(index)} 
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Overlay */}
      {lightboxIndex !== null && activeCredential && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-6 right-6 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          {credentials.length > 1 && (
            <>
              <button 
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors hidden sm:block focus:outline-none focus:ring-2 focus:ring-white"
                onClick={handlePrev}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              
              <button 
                className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors hidden sm:block focus:outline-none focus:ring-2 focus:ring-white"
                onClick={handleNext}
                aria-label="Next image"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </>
          )}

          <div 
            className="relative max-h-full max-w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {lightboxImgUrl && (
              <img 
                src={lightboxImgUrl} 
                alt={activeCredential.title}
                className="max-h-[80vh] max-w-full rounded-md object-contain shadow-2xl"
              />
            )}
            
            <div className="absolute -bottom-16 left-0 right-0 text-center text-white pb-4">
              <p className="text-lg font-semibold tracking-wide drop-shadow-md">
                {activeCredential.title}
              </p>
              <p className="text-sm text-white/80">
                {lightboxIndex + 1} of {credentials.length}
              </p>
            </div>

            {/* Mobile nav buttons below image */}
            {credentials.length > 1 && (
              <div className="mt-8 flex justify-center gap-8 sm:hidden text-white pt-4">
                <button onClick={handlePrev} className="p-3 rounded-full bg-white/10 hover:bg-white/20">
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button onClick={handleNext} className="p-3 rounded-full bg-white/10 hover:bg-white/20">
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}