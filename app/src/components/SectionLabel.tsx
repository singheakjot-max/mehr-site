interface SectionLabelProps {
  label: string;
}

export default function SectionLabel({ label }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div
        className="h-px flex-1"
        style={{ backgroundColor: 'var(--color-border)' }}
      />
      <span
        className="font-body flex-shrink-0"
        style={{
          fontSize: '12px',
          fontWeight: 500,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--color-text-muted)',
        }}
      >
        {label}
      </span>
      <div
        className="h-px flex-1"
        style={{ backgroundColor: 'var(--color-border)' }}
      />
    </div>
  );
}
