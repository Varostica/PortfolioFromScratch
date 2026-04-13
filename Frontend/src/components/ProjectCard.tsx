import type { Project } from '../types/strapi'
import { toAbsoluteMediaUrl } from '../services'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const cover = project.coverImage
    ? toAbsoluteMediaUrl(project.coverImage.url)
    : ''

  const buttons = [
    { url: project.githubUrl, label: project.ghLabel ?? 'GitHub' },
    { url: project.liveUrl, label: project.demoLabel ?? 'Demo' },
    { url: project.websiteUrl, label: project.websiteLabel ?? 'Website' },
    { url: project.referenceUrl, label: project.referenceLabel ?? 'References' },
  ].filter((b) => !!b.url)

  return (
    <article
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white
        shadow-[0_4px_5px_3px_rgba(136,85,53,0.15)]
        transition-all duration-500
        hover:scale-[1.02] hover:shadow-[0_4px_4px_5px_rgba(173,110,67,0.25)]"
    >
      {cover && (
        <img
          src={cover}
          alt={`${project.title} cover`}
          className="h-52 w-full object-cover p-4 rounded-2xl"
          loading="lazy"
        />
      )}

      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 text-lg font-bold text-text">{project.title}</h3>

        <p className="mb-4 flex-1 text-sm leading-relaxed text-text-muted text-justify">
          {project.shortDescription}
        </p>

        {project.stackSummary && (
          <p className="mb-4 text-xs font-medium text-brand-600">
            {project.stackSummary}
          </p>
        )}

        {buttons.length > 0 && (
          <div className="mt-auto flex flex-wrap justify-center gap-2">
            {buttons.map((btn) => (
              <a
                key={btn.url}
                href={btn.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-lg bg-brand-700 px-4 py-2
                  text-sm font-medium text-white no-underline
                  transition-all duration-200
                  hover:-translate-y-0.5 hover:bg-brand-600"
              >
                {btn.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
