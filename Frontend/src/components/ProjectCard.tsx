import { useState } from 'react'
import type { Project } from '../types/strapi'
import { toAbsoluteMediaUrl } from '../services'
import { PlayCircle, Globe, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import BlockRenderer from './BlockRenderer'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const cover = project.coverImage
    ? toAbsoluteMediaUrl(project.coverImage.url)
    : ''

  const buttons = [
    { url: project.githubUrl, label: project.ghLabel ?? 'GitHub', icon: FaGithub },
    { url: project.liveUrl, label: project.demoLabel ?? 'Demo', icon: PlayCircle },
    { url: project.websiteUrl, label: project.websiteLabel ?? 'Website', icon: Globe },
    { url: project.referenceUrl, label: project.referenceLabel ?? 'References', icon: ExternalLink },
  ].filter((b) => !!b.url)

  return (
    <article
      onClick={() => setIsExpanded(!isExpanded)}
      className={`group flex h-full flex-col overflow-hidden rounded-2xl bg-white
        shadow-[0_4px_5px_3px_rgba(136,85,53,0.15)]
        transition-all duration-500 cursor-pointer
        hover:scale-[1.02] hover:shadow-[0_4px_4px_5px_rgba(173,110,67,0.25)]
        ${isExpanded ? 'scale-[1.02] shadow-[0_4px_4px_5px_rgba(173,110,67,0.25)]' : ''}`}
    >
      {cover && (
        <img
          src={cover}
          alt={`${project.title} cover`}
          className="h-60 w-full object-cover p-4 rounded-2xl"
          loading="lazy"
        />
      )}

      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 text-lg font-bold text-text flex items-center justify-between">
          {project.title}
          {project.fullDescription && project.fullDescription.length > 0 && (
             isExpanded ? <ChevronUp className="h-5 w-5 text-brand-500" /> : <ChevronDown className="h-5 w-5 text-brand-500" />
          )}
        </h3>

        <p className="mb-4 text-sm leading-relaxed text-text-muted text-justify">
          {project.shortDescription}
        </p>

        {project.fullDescription && project.fullDescription.length > 0 && (
          <div className={`grid transition-all duration-500 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 mb-4' : 'grid-rows-[0fr] opacity-0'}`}>
            <div className="overflow-hidden">
              <BlockRenderer blocks={project.fullDescription} className="text-sm text-text-muted text-justify" />
            </div>
          </div>
        )}

        {project.stackSummary && (
          <p className="mb-4 text-xs font-medium text-brand-600 mt-auto">
            {project.stackSummary}
          </p>
        )}

        {buttons.length > 0 && (
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {buttons.map((btn) => (
              <a
                key={btn.url}
                href={btn.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 rounded-lg bg-brand-700 px-4 py-2
                  text-sm font-medium text-white no-underline
                  transition-all duration-200
                  hover:-translate-y-0.5 hover:bg-brand-600"
              >
                <btn.icon className="h-4 w-4" />
                {btn.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
