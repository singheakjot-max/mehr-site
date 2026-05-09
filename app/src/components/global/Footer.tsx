import { Link } from 'react-router-dom';
import { site } from '@/content/site';
import { Instagram, Twitter, Facebook, Youtube, Mail } from 'lucide-react';

export default function Footer() {
  const socialIcons: Record<string, React.ReactNode> = {
    instagram: <Instagram size={18} />,
    twitter: <Twitter size={18} />,
    facebook: <Facebook size={18} />,
    youtube: <Youtube size={18} />,
  };

  return (
    <footer style={{ backgroundColor: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>
      <div className="container-main py-16 md:py-20">
        {/* Founder signature */}
        <div className="mb-16 md:mb-20 pb-16 md:pb-20" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <div className="max-w-2xl mx-auto text-center">
            <p
              className="font-display italic mb-6"
              style={{ fontSize: 'clamp(1.125rem, 2vw, 1.375rem)', lineHeight: 1.5, color: 'var(--color-text)' }}
            >
              &ldquo;{site.founderStoryShort}&rdquo;
            </p>
            <div className="flex items-center justify-center gap-3">
              <img
                src={site.brand.founderPortrait}
                alt={`${site.brand.founderName} — Founder portrait, 3/4 view, warm neutral background, professional but approachable`}
                className="w-10 h-10 rounded-full object-cover"
                style={{ backgroundColor: 'var(--color-border-subtle)' }}
              />
              <div className="text-left">
                <p className="font-body font-medium" style={{ fontSize: '14px', color: 'var(--color-text)' }}>
                  {site.brand.founderName}
                </p>
                <p className="font-body" style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                  {site.brand.founderTitle}
                </p>
              </div>
            </div>
            <a
              href={`mailto:${site.promises.contactEmail}`}
              className="inline-flex items-center gap-2 mt-6 font-body focus-ring transition-opacity hover:opacity-70"
              style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}
            >
              <Mail size={16} />
              {site.promises.contactEmail}
            </a>
          </div>
        </div>

        {/* Footer columns */}
        <div className="mb-12 pb-12" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <img
            src="/images/logo/mehr-logo.png"
            alt="mehr"
            className="h-8 md:h-10 w-auto select-none mb-3"
            style={{ filter: 'brightness(0)' }}
            draggable={false}
          />
          <p className="font-body italic" style={{ fontSize: '14px', color: 'var(--color-text-muted)', maxWidth: '420px' }}>
            {site.brand.tagline}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {site.footerColumns.map((column) => (
            <div key={column.title}>
              <h4
                className="font-body mb-4"
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text)',
                }}
              >
                {column.title}
              </h4>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="font-body transition-opacity hover:opacity-60 focus-ring"
                      style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          <div className="flex items-center gap-4">
            {Object.entries(site.social).map(([key, url]) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 -ml-2 transition-opacity hover:opacity-60 focus-ring"
                style={{ color: 'var(--color-text-muted)' }}
                aria-label={key}
              >
                {socialIcons[key]}
              </a>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {site.bottomLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="font-body transition-opacity hover:opacity-60 focus-ring"
                style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <p className="font-body" style={{ fontSize: '12px', color: 'var(--color-text-subtle)' }}>
            &copy; {new Date().getFullYear()} {site.brand.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
