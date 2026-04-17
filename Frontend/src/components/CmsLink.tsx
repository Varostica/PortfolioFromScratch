import React from 'react';
import { Link } from 'react-router-dom';

interface CmsLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export default function CmsLink({ href, className, children }: CmsLinkProps) {
  const isInternal = href.startsWith('/');

  if (isInternal) {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    );
  }

  const isExternal = href.startsWith('http://') || href.startsWith('https://');

  return (
    <a
      href={href}
      className={className}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  );
}
