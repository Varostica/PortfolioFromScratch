import { useEffect, useState } from 'react'
import type { ContactPage as ContactData } from '../types/strapi'
import { getContactPage } from '../services'
import Spinner from '../components/Spinner'

export default function ContactPage() {
  const [data, setData] = useState<ContactData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getContactPage()
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="lg" label="Cargando…" />
      </div>
    )
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    alert(data?.successMessage ?? '¡Gracias por tu mensaje!')
  }

  return (
    <section className="min-h-screen pt-36 pb-12">
      <div className="mx-auto max-w-5xl px-6">
        <h1 className="mb-2 text-center text-3xl font-bold">
          {data?.sectionTitle ?? 'Contacto'}
        </h1>

        {data?.sectionDescription && (
          <p className="mb-10 text-center text-text-muted">{data.sectionDescription}</p>
        )}

        <div className="grid gap-10 md:grid-cols-5">
          {/* Form */}
          {data?.contactFormEnabled !== false && (
            <form
              onSubmit={handleSubmit}
              className="space-y-5 md:col-span-3"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-text">Nombre</label>
                  <input
                    required
                    className="w-full rounded-lg border border-brand-200 px-4 py-2.5 text-sm
                      outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-text">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full rounded-lg border border-brand-200 px-4 py-2.5 text-sm
                      outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-text">Mensaje</label>
                <textarea
                  rows={5}
                  required
                  className="w-full rounded-lg border border-brand-200 px-4 py-2.5 text-sm
                    outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                />
              </div>

              <button
                type="submit"
                className="rounded-xl bg-brand-500 px-8 py-3 font-semibold text-white
                  shadow-lg shadow-brand-500/30 transition-all
                  hover:-translate-y-0.5 hover:bg-brand-600"
              >
                Enviar
              </button>
            </form>
          )}

          {/* Info card */}
          <div className="flex flex-col justify-center rounded-2xl bg-brand-50 p-8 md:col-span-2">
            <h3 className="mb-2 text-lg font-bold text-brand-800">
              {data?.contactCardTitle ?? '¿Tomamos un café virtual?'}
            </h3>
            <p className="text-sm text-text-muted">
              {data?.contactCardText ?? 'Santiago, Chile · Disponible para colaboraciones ✨'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
