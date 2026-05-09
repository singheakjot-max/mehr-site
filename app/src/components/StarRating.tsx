import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: number;
  showValue?: boolean;
  reviewCount?: number;
}

export default function StarRating({ rating, size = 16, showValue = true, reviewCount }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            size={size}
            fill={i < fullStars ? 'var(--color-star)' : i === fullStars && hasHalf ? 'url(#halfStar)' : 'transparent'}
            stroke={i < fullStars || (i === fullStars && hasHalf) ? 'var(--color-star)' : 'var(--color-border)'}
            strokeWidth={1.5}
            className="flex-shrink-0"
          />
        ))}
      </div>
      {showValue && (
        <span className="font-body font-medium" style={{ fontSize: `${size - 2}px`, color: 'var(--color-text)' }}>
          {rating.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className="font-body" style={{ fontSize: `${size - 3}px`, color: 'var(--color-text-muted)' }}>
          ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
        </span>
      )}
    </div>
  );
}
