import { useEffect, useState } from 'react'
import type { Project } from '../types/strapi'
import { getProjects } from '../services'
import ProjectCard from '../components/ProjectCard'
import Spinner from '../components/Spinner'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch(() => setProjects([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="lg" label="Loading…" />
      </div>
    )
  }

  return (
    <section className="min-h-screen pt-36 pb-12">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="mb-2 text-center text-3xl font-bold">
          My <span className="text-brand-500">Projects</span>
        </h1>
        <p className="mb-10 text-center text-text-muted">
          Here are some of the projects I've been working on lately.
        </p>

        {projects.length === 0 ? (
          <p className="text-center text-text-muted">No projects yet — stay tuned!</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
