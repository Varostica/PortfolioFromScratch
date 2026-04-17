import { useEffect, useState } from 'react'
import type { ResumePage as ResumeData } from '../types/strapi'
import { getResumePage, toPublicMediaUrl } from '../services'
import Spinner from '../components/Spinner'
import { Download } from 'lucide-react'

export default function ResumePage() {
  const [data, setData] = useState<ResumeData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getResumePage()
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="lg" label="Loading…" />
      </div>
    )
  }

  const fileUrl = data?.resumeFile?.[0]
    ? toPublicMediaUrl(data.resumeFile[0].url)
    : ''

  return (
    <section className="min-h-screen pt-28 pb-12">
      <div className="mx-auto max-w-4xl px-6">
        <h1 className="mb-6 text-center text-3xl font-bold">
          {data?.sectionTitle ?? 'Resume'}
        </h1>

        {data?.shortResumeIntro && (
          <p className="mb-8 text-center text-text-muted">{data.shortResumeIntro}</p>
        )}

        {/* Download button */}
        {fileUrl && (
          <div className="mb-8 flex justify-center">
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-3
                font-semibold text-white no-underline shadow-lg shadow-brand-500/30
                transition-all hover:-translate-y-0.5 hover:bg-brand-600"
            >
              <Download className="h-4 w-4" /> {data?.downloadButtonText ?? 'Download Resume'}
            </a>
          </div>
        )}

        {/* PDF preview */}
        {fileUrl && data?.previewEnabled !== false && (
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <iframe
              src={`${fileUrl}#view=FitH`}
              title="CV Preview"
              className="h-[80vh] w-full border-0"
            />
          </div>
        )}

        {/* Second download button */}
        {fileUrl && (
          <div className="mt-8 flex justify-center">
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-3
                font-semibold text-white no-underline shadow-lg shadow-brand-500/30
                transition-all hover:-translate-y-0.5 hover:bg-brand-600"
            >
              <Download className="h-4 w-4" /> {data?.downloadButtonText ?? 'Download Resume'}
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
