import React from 'react'
import type { StrapiBlock, StrapiBlockChild } from '../types/strapi'

interface BlockRendererProps {
  blocks?: StrapiBlock[] | null
  className?: string
}

function renderInlineChild(child: StrapiBlockChild, i: number): React.ReactNode {
  if (child.type === 'link') {
    return (
      <a
        key={i}
        href={child.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand-500 underline hover:text-brand-600"
      >
        {child.children?.map((c, j) => renderInlineChild(c, j))}
      </a>
    )
  }

  // text node
  let content: React.ReactNode = child.text ?? ''

  if (child.bold) content = <strong key={`b-${i}`}>{content}</strong>
  if (child.italic) content = <em key={`i-${i}`}>{content}</em>
  if (child.underline) content = <u key={`u-${i}`}>{content}</u>
  if (child.strikethrough) content = <s key={`s-${i}`}>{content}</s>
  if (child.code)
    content = (
      <code key={`c-${i}`} className="rounded bg-brand-100 px-1.5 py-0.5 text-sm font-mono">
        {content}
      </code>
    )

  return <span key={i}>{content}</span>
}

function renderBlock(block: StrapiBlock, i: number): React.ReactNode {
  const children = block.children?.map((child, j) => {
    // list-item children inside a list
    if (child.type === 'text' || child.type === 'link') {
      return renderInlineChild(child, j)
    }
    return null
  })

  switch (block.type) {
    case 'paragraph':
      return (
        <p key={i} className="mb-4 leading-relaxed">
          {children}
        </p>
      )

    case 'heading': {
      const Tag: any = `h${block.level ?? 2}`
      return (
        <Tag key={i} className="mb-4 font-bold">
          {children}
        </Tag>
      )
    }

    case 'list': {
      const Tag = block.format === 'ordered' ? 'ol' : 'ul'
      const listClass =
        block.format === 'ordered'
          ? 'mb-4 list-decimal pl-6 space-y-1'
          : 'mb-4 list-disc pl-6 space-y-1'

      return (
        <Tag key={i} className={listClass}>
          {block.children?.map((item, j) => {
            if (item.type === 'list-item' as string) {
              const listItem = item as unknown as StrapiBlock
              return (
                <li key={j}>
                  {listItem.children?.map((c, k) => renderInlineChild(c, k))}
                </li>
              )
            }
            return null
          })}
        </Tag>
      )
    }

    case 'quote':
      return (
        <blockquote
          key={i}
          className="mb-4 border-l-4 border-brand-300 pl-4 italic text-text-muted"
        >
          {children}
        </blockquote>
      )

    case 'code':
      return (
        <pre key={i} className="mb-4 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-100">
          <code>{children}</code>
        </pre>
      )

    default:
      return (
        <p key={i} className="mb-4 leading-relaxed">
          {children}
        </p>
      )
  }
}

export default function BlockRenderer({ blocks, className = '' }: BlockRendererProps) {
  if (!blocks || blocks.length === 0) return null

  return (
    <div className={className}>
      {blocks.map((block, i) => renderBlock(block, i))}
    </div>
  )
}
