import { useState } from 'react';
import { site } from '@/content/site';
import { Truck } from 'lucide-react';

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      style={{
        backgroundColor: 'var(--color-accent)',
        color: 'var(--color-accent-fg)',
      }}
      className="relative w-full"
    >
      <div className="container-main flex items-center justify-center py-2.5 px-4">
        <Truck size={14} className="mr-2 flex-shrink-0 opacity-80" />
        <p
          className="text-center font-body"
          style={{
            fontSize: '13px',
            letterSpacing: '0.02em',
            color: 'var(--color-accent-fg)',
          }}
        >
          {site.announcement}
        </p>
        <button
          onClick={() => setDismissed(true)}
          className="absolute right-4 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100 transition-opacity"
          aria-label="Dismiss announcement"
          style={{ color: 'var(--color-accent-fg)' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M1 1L7 7M7 7L13 13M7 7L13 1M7 7L1 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
