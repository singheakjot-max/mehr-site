import { ExternalLink } from 'lucide-react';
import type { Study } from '@/types';

interface StudyCardProps {
  study: Study;
}

export default function StudyCard({ study }: StudyCardProps) {
  return (
    <div
      className="p-6 rounded-lg h-full flex flex-col transition-all duration-200 hover:shadow-md"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span
          className="font-body px-2.5 py-1 rounded-full"
          style={{
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            backgroundColor: 'var(--color-border-subtle)',
            color: 'var(--color-text-muted)',
          }}
        >
          {study.ingredient}
        </span>
        <span className="font-body" style={{ fontSize: '12px', color: 'var(--color-text-subtle)' }}>
          {study.year}
        </span>
      </div>

      <h3 className="font-display font-medium mb-2" style={{ fontSize: '16px', lineHeight: 1.35, color: 'var(--color-text)' }}>
        {study.title}
      </h3>

      <p className="font-body mb-1" style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
        <em>{study.journal}</em>
      </p>

      <p className="font-body mb-4 flex-1" style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
        {study.finding}
      </p>

      <a
        href={study.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 font-body focus-ring transition-opacity hover:opacity-70"
        style={{ fontSize: '13px', color: 'var(--color-text)', fontWeight: 500 }}
      >
        <ExternalLink size={14} />
        View on PubMed
      </a>
    </div>
  );
}
