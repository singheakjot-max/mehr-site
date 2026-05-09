import { Link } from 'react-router-dom';
import type { Product } from '@/types';
import StarRating from './StarRating';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const avgRating = product.reviews.length > 0
    ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length
    : 0;

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group block focus-ring rounded-lg overflow-hidden"
    >
      <div
        className="relative overflow-hidden rounded-lg mb-4"
        style={{ aspectRatio: '4/5', backgroundColor: 'var(--color-surface-raised)' }}
      >
        <img
          src={product.image}
          alt={`${product.name} — ${product.tagline}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className="absolute top-3 left-3 px-2.5 py-1 rounded-full font-body"
          style={{
            fontSize: '11px',
            fontWeight: 500,
            backgroundColor: 'var(--color-surface)',
            color: 'var(--color-text)',
          }}
        >
          Subscribe & Save {product.subscriptionDiscount}%
        </div>
      </div>

      <div className="space-y-1.5">
        {avgRating > 0 && (
          <StarRating rating={avgRating} size={14} showValue reviewCount={product.reviews.length} />
        )}

        <h3
          className="font-display font-medium transition-opacity group-hover:opacity-70"
          style={{ fontSize: '17px', color: 'var(--color-text)' }}
        >
          {product.name}
        </h3>

        <p className="font-body line-clamp-2" style={{ fontSize: '14px', lineHeight: 1.5, color: 'var(--color-text-muted)' }}>
          {product.tagline}
        </p>

        <div className="flex items-center gap-2 pt-1">
          <span className="font-body font-semibold" style={{ fontSize: '15px', color: 'var(--color-text)' }}>
            ${product.price.toFixed(2)}
          </span>
          <span className="font-body" style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
            or ${product.subscriptionPrice.toFixed(2)}/mo
          </span>
        </div>
      </div>
    </Link>
  );
}
