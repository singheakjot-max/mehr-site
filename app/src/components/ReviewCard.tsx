import { ThumbsUp, CheckCircle2 } from 'lucide-react';
import type { Review } from '@/types';
import StarRating from './StarRating';

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const date = new Date(review.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      className="p-6 rounded-lg"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
      }}
    >
      <div className="flex items-start gap-3 mb-3">
        <img
          src={review.avatar}
          alt={`${review.author} avatar`}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          style={{ backgroundColor: 'var(--color-border-subtle)' }}
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-body font-medium" style={{ fontSize: '14px', color: 'var(--color-text)' }}>
              {review.author}
            </span>
            {review.verified && (
              <span
                className="flex items-center gap-1 font-body"
                style={{ fontSize: '11px', color: 'var(--color-success)' }}
              >
                <CheckCircle2 size={12} /> Verified Buyer
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <StarRating rating={review.rating} size={14} showValue={false} />
            <span className="font-body" style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
              {date}
            </span>
          </div>
        </div>
      </div>

      <h4 className="font-display font-medium mb-2" style={{ fontSize: '16px', color: 'var(--color-text)' }}>
        {review.title}
      </h4>

      <p className="font-body" style={{ fontSize: '14px', lineHeight: 1.65, color: 'var(--color-text-secondary)' }}>
        {review.body}
      </p>

      {review.image && (
        <img
          src={review.image}
          alt={`Photo from ${review.author}'s review`}
          className="mt-4 w-full max-w-xs rounded-md object-cover"
          style={{ aspectRatio: '4/3', backgroundColor: 'var(--color-border-subtle)' }}
        />
      )}

      <button
        className="flex items-center gap-1.5 mt-4 font-body focus-ring"
        style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}
      >
        <ThumbsUp size={14} />
        Helpful ({review.helpful})
      </button>
    </div>
  );
}
