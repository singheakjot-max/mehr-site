interface MarqueeProps {
  items: React.ReactNode[];
  speed?: number; // seconds for one full loop
  className?: string;
  style?: React.CSSProperties;
  separator?: React.ReactNode;
  reverse?: boolean;
}

/**
 * Infinite-scrolling ticker. Pattern used by SpoiledChild, AG1 hero claim bars,
 * and every modern DTC site between content sections.
 *
 * Duplicates content twice to create seamless infinite scroll.
 */
export default function Marquee({
  items,
  speed = 30,
  className = '',
  style,
  separator,
  reverse = false,
}: MarqueeProps) {
  const renderTrack = (key: string) => (
    <div
      key={key}
      className="flex items-center gap-10 md:gap-14 flex-shrink-0 px-6 md:px-8"
      style={{ minWidth: '100%' }}
    >
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-10 md:gap-14 flex-shrink-0">
          {item}
          {separator && <span className="opacity-40">{separator}</span>}
        </div>
      ))}
    </div>
  );

  return (
    <div className={`overflow-hidden ${className}`} style={style}>
      <div
        className="flex"
        style={{
          animation: `${reverse ? 'marquee-reverse' : 'marquee'} ${speed}s linear infinite`,
          willChange: 'transform',
        }}
      >
        {renderTrack('a')}
        {renderTrack('b')}
      </div>
    </div>
  );
}
