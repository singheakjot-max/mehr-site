import { X, FileText, Download } from 'lucide-react';

interface COAModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  coaUrl: string;
  coaLabel: string;
}

export default function COAModal({ isOpen, onClose, productName, coaUrl, coaLabel }: COAModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(10, 10, 10, 0.4)' }}
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-2xl rounded-xl overflow-hidden"
        style={{
          backgroundColor: 'var(--color-surface)',
          boxShadow: 'var(--shadow-xl)',
        }}
      >
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--color-border)' }}>
          <div className="flex items-center gap-3">
            <FileText size={20} style={{ color: 'var(--color-text)' }} />
            <div>
              <h3 className="font-display" style={{ fontSize: '18px', color: 'var(--color-text)' }}>
                Certificate of Analysis
              </h3>
              <p className="font-body" style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                {productName}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 -mr-2 focus-ring" aria-label="Close modal">
            <X size={20} style={{ color: 'var(--color-text)' }} />
          </button>
        </div>

        <div className="p-6">
          <div
            className="rounded-lg border p-8 text-center"
            style={{
              borderColor: 'var(--color-border)',
              backgroundColor: 'var(--color-bg)',
            }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: 'var(--color-border-subtle)' }}
            >
              <FileText size={28} style={{ color: 'var(--color-text-muted)' }} />
            </div>
            <h4 className="font-display mb-2" style={{ fontSize: '16px', color: 'var(--color-text)' }}>
              Third-Party Lab Report
            </h4>
            <p className="font-body mb-6 max-w-sm mx-auto" style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              This document contains the complete analytical results from our independent testing laboratory,
              including identity, potency, purity, heavy metals, and microbiological screening.
            </p>
            <a
              href={coaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex"
            >
              <Download size={16} />
              {coaLabel}
            </a>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            {[
              { label: 'Identity', value: 'HPLC / FTIR Confirmed' },
              { label: 'Potency', value: 'Within 98-102% of claim' },
              { label: 'Heavy Metals', value: '< 0.5 ppb lead' },
              { label: 'Microbiology', value: 'USP <61> / <62> Pass' },
            ].map((item) => (
              <div
                key={item.label}
                className="p-3 rounded-md"
                style={{ backgroundColor: 'var(--color-bg)' }}
              >
                <p className="font-body" style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {item.label}
                </p>
                <p className="font-body font-medium mt-1" style={{ fontSize: '13px', color: 'var(--color-text)' }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
