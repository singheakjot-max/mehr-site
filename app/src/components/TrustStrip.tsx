import { Truck, ShieldCheck, FlaskConical } from 'lucide-react';
import { site } from '@/content/site';

interface TrustStripProps {
  size?: 'sm' | 'md';
  showCOA?: boolean;
}

export default function TrustStrip({ size = 'md', showCOA = true }: TrustStripProps) {
  const iconSize = size === 'sm' ? 14 : 16;
  const textSize = size === 'sm' ? '12px' : '13px';
  const gap = size === 'sm' ? 'gap-4' : 'gap-6';

  return (
    <div className={`flex flex-wrap items-center justify-center ${gap}`}>
      <div className="flex items-center gap-1.5">
        <Truck size={iconSize} style={{ color: 'var(--color-text-muted)' }} />
        <span className="font-body" style={{ fontSize: textSize, color: 'var(--color-text-muted)' }}>
          Ships in 24h
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <ShieldCheck size={iconSize} style={{ color: 'var(--color-text-muted)' }} />
        <span className="font-body" style={{ fontSize: textSize, color: 'var(--color-text-muted)' }}>
          {site.promises.guarantee}
        </span>
      </div>
      {showCOA && (
        <div className="flex items-center gap-1.5">
          <FlaskConical size={iconSize} style={{ color: 'var(--color-text-muted)' }} />
          <span className="font-body" style={{ fontSize: textSize, color: 'var(--color-text-muted)' }}>
            3rd party tested
          </span>
        </div>
      )}
    </div>
  );
}
