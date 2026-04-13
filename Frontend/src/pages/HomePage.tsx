import { useEffect, useState } from 'react'
import Typewriter from 'typewriter-effect'
import type { Homepage } from '../types/strapi'
import { getHomepage, toAbsoluteMediaUrl } from '../services'
import SocialLinks from '../components/SocialLinks'
import BlockRenderer from '../components/BlockRenderer'
import Spinner from '../components/Spinner'
import { ArrowRight } from 'lucide-react'
import heroFallback from '../assets/Varostica.gif'

export default function HomePage() {
  const [data, setData] = useState<Homepage | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getHomepage()
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

  const heroImg = data?.heroImage
    ? toAbsoluteMediaUrl(data.heroImage.url)
    : heroFallback

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-screen pt-24 pb-12">
        <div className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-8 px-6 md:flex-row">
          {/* Left */}
          <div className="flex-1 animate-fade-in text-left">
            {data?.eyebrow && (
              <p className="mb-2 text-3xl font-bold md:text-4xl text-brand-500">
                {data.eyebrow}
              </p>
            )}

            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              {data?.heroTitle ?? 'Hey there!'}{' '}
              <span className="inline-block animate-wave origin-[70%_70%]">👋🏻</span>
            </h1>

            <h2 className="mt-2 text-sm font-semibold uppercase tracking-widest text-brand-800">
              {data?.heroSubtitle ? (
                <>{data.heroSubtitle}</>
              ) : (
                <>Software Developer</>
              )}
            </h2>

            <div className="mt-8 text-left">
              <Typewriter
                options={{
                  strings: [
                    'Computer Science Engineer',
                    'Software Developer',
                    'Full-Stack Developer',
                    'Artist, curious & creative',
                    'UX Enthusiast',
                  ],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 50,
                }}
              />
            </div>

            {/* CTA buttons */}
            {(data?.heroCtaPrimaryText || data?.heroCtaSecondaryText) && (
              <div className="mt-8 flex flex-wrap gap-4">
                {data?.heroCtaPrimaryUrl && (
                  <a
                    href={data.heroCtaPrimaryUrl}
                    className="flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-3 font-semibold text-white no-underline
                      shadow-lg shadow-brand-500/30 transition-all hover:-translate-y-0.5 hover:bg-brand-600"
                  >
                    {data.heroCtaPrimaryText}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                )}
                {data?.heroCtaSecondaryUrl && (
                  <a
                    href={data.heroCtaSecondaryUrl}
                    className="rounded-xl border-2 border-brand-500 px-6 py-3 font-semibold text-brand-600 no-underline
                      transition-all hover:-translate-y-0.5 hover:bg-brand-50"
                  >
                    {data.heroCtaSecondaryText}
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Right — hero image */}
          <div className="flex-shrink-0 animate-fade-in">
            <img
              src={heroImg}
              alt="Hero"
              className="max-h-[450px] w-auto rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* ── Intro / About ── */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            {data?.introTitle ?? (
              <>
                LET ME <span className="text-brand-500">INTRODUCE MYSELF</span>
              </>
            )}
          </h2>

          {data?.introText && data.introText.length > 0 && (
            <BlockRenderer
              blocks={data.introText}
              className="mx-auto mt-6 max-w-2xl text-lg text-text-muted"
            />
          )}
        </div>
      </section>

      {/* ── Website overview ── */}
      {(data?.websiteOverviewTitle || data?.websiteOverviewText) && (
        <section className="bg-brand-50/50 py-20">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              {data.websiteOverviewTitle ?? (
                <>
                  What's on this <span className="text-brand-500">WEBSITE</span>?
                </>
              )}
            </h2>
            {data.websiteOverviewText && data.websiteOverviewText.length > 0 && (
              <BlockRenderer
                blocks={data.websiteOverviewText}
                className="mx-auto mt-6 max-w-2xl text-lg text-text-muted"
              />
            )}
          </div>
        </section>
      )}

      {/* ── Social ── */}
      {data?.showSocialLinks !== false && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <h2 className="text-2xl font-bold">FIND ME ON</h2>
            <p className="mt-2 text-text-muted">
              Feel free to <span className="text-brand-500">connect</span> with me
            </p>
            <div className="mt-6 flex justify-center">
              <SocialLinks filter="hero" />
            </div>
          </div>
        </section>
      )}
    </>
  )
}
