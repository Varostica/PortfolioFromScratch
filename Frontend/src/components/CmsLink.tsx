import React from 'react';
import { Link } from 'react-router-dom';

interface CmsLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * Renders a React Router <Link> for internal paths (starting with "/")
 * and a plain <a> for external URLs (http:// or https://).
 * Use this for any CMS-driven URLs to prevent full-page reloads on SPA routes.
 */
export default function CmsLink({ href, className, children }: CmsLinkProps) {
  // Trim any accidental whitespace from CMS input
  const url = href.trim();

  if (url.startsWith('/')) {
    // Internal SPA route — use React Router for client-side navigation
    return (
      <Link to={url} className={className}>
        {children}
      </Link>
    );
  }

  // External URL — use a normal anchor, open in new tab
  return (
    <a
      href={url}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
