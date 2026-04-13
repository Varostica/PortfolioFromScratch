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
        <Spinner size="lg" label="Cargando…" />
      </div>
    )
  }

  return (
    <section className="min-h-screen pt-36 pb-12">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="mb-2 text-center text-3xl font-bold">
          Mis <span className="text-brand-500">proyectos</span>
        </h1>
        <p className="mb-10 text-center text-text-muted">
          Aquí hay algunos de los proyectos en los que he trabajado recientemente.
        </p>

        {projects.length === 0 ? (
          <p className="text-center text-text-muted">No hay proyectos aún.</p>
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
