import { useEffect, useState } from 'react'
import type { AboutPage as AboutData, Skill, Tool, Hobby } from '../types/strapi'
import { getAboutPage, getSkills, getTools, getHobbies, toAbsoluteMediaUrl } from '../services'
import BlockRenderer from '../components/BlockRenderer'
import Spinner from '../components/Spinner'
import aboutImg from '../assets/about.png'

export default function AboutPage() {
  const [about, setAbout] = useState<AboutData | null>(null)
  const [skills, setSkills] = useState<Skill[]>([])
  const [tools, setTools] = useState<Tool[]>([])
  const [hobbies, setHobbies] = useState<Hobby[]>([])
  const [loading, setLoading] = useState(true)

  const highlightLastWord = (text: string) => {
    const words = text.trim().split(' ')
    if (words.length <= 1) return <span className="text-brand-500">{text}</span>
    const last = words.pop()
    return (
      <>
        {words.join(' ')} <span className="text-brand-500">{last}</span>
      </>
    )
  }

  useEffect(() => {
    Promise.all([getAboutPage(), getSkills(), getTools(), getHobbies()])
      .then(([a, s, t, h]) => { setAbout(a); setSkills(s); setTools(t); setHobbies(h) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="lg" label="Loading…" />
      </div>
    )
  }

  // We are using the static asset rather than CMS image
  const profileImg = aboutImg

  return (
    <section className="min-h-screen pt-36 pb-12">
      <div className="mx-auto max-w-7xl px-6">
        {/* ── Bio row ── */}
        <div className="flex flex-col items-center gap-10 md:flex-row">
          <div className="flex-1 animate-fade-in">
            <h1 className="mb-6 text-3xl font-bold">
              {about?.sectionTitle ? highlightLastWord(about.sectionTitle) : (
                <>
                  Who is <span className="text-brand-500">Varóstica?</span>
                </>
              )}
            </h1>

            {about?.bio && about.bio.length > 0 && (
              <BlockRenderer
                blocks={about.bio}
                className="text-lg text-text-muted"
              />
            )}

            {about?.nicknameLine && (
              <p className="mt-4 text-text-muted">
                <span className="text-brand-500 font-semibold">{about.nicknameLine}</span>
              </p>
            )}

            {about?.quote && (
              <blockquote className="mt-8 border-l-4 border-brand-300 pl-4 italic text-text-muted">
                "{about.quote}"
                {about.quoteAuthor && (
                  <footer className="mt-1 text-sm font-medium text-brand-700">
                    — {about.quoteAuthor}
                  </footer>
                )}
              </blockquote>
            )}
          </div>

          {profileImg && (
            <div className="flex-shrink-0 animate-fade-in">
              <img
                src={profileImg}
                alt="About Varóstica"
                className="w-80 md:w-[450px] lg:w-[450px] h-auto object-contain"
              />
            </div>
          )}
        </div>

        {/* ── Skills ── */}
        {skills.length > 0 && (
          <div className="mt-20 animate-fade-in">
            <h2 className="mb-8 text-center text-2xl font-bold">
              Technical <span className="text-brand-500">Skills</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {skills.map((s) => (
                <div
                  key={s.id}
                  className="flex flex-col items-center justify-center rounded-lg border border-brand-200
                    px-5 py-4 shadow-sm transition-all duration-300
                    hover:scale-105 hover:border-brand-400 hover:shadow-md"
                >
                  <span className="text-sm font-semibold text-text">{s.name}</span>
                  <span className="mt-1 text-xs text-text-muted capitalize">{s.category}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Tools ── */}
        {tools.length > 0 && (
          <div className="mt-16 animate-fade-in">
            <h2 className="mb-8 text-center text-2xl font-bold">
              <span className="text-brand-500">Tools</span> I Use
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {tools.map((t) => (
                <div
                  key={t.id}
                  className="flex flex-col items-center justify-center rounded-lg border border-brand-200
                    px-5 py-4 shadow-sm transition-all duration-300
                    hover:scale-105 hover:border-brand-400 hover:shadow-md"
                >
                  <span className="text-sm font-semibold text-text">{t.name}</span>
                  <span className="mt-1 text-xs text-text-muted capitalize">{t.category}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Hobbies ── */}
        {hobbies.length > 0 && (
          <div className="mt-16 animate-fade-in">
            <h2 className="mb-8 text-center text-2xl font-bold">
              My <span className="text-brand-500">Hobbies</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {hobbies.map((h) => (
                <div
                  key={h.id}
                  className="flex flex-col items-center justify-center rounded-lg border border-brand-200
                    px-5 py-4 shadow-sm transition-all duration-300
                    hover:scale-105 hover:border-brand-400 hover:shadow-md"
                >
                  <span className="text-sm font-semibold text-text">{h.name}</span>
                  {h.description && (
                    <span className="mt-1 text-xs text-text-muted">{h.description}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
