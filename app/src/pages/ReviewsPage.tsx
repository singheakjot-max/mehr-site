import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { site } from '@/content/site';
import { Star, X } from 'lucide-react';
import ReviewCard from '@/components/ReviewCard';
import SectionLabel from '@/components/SectionLabel';
import Footer from '@/components/global/Footer';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function ReviewsPage() {
  const [filter, setFilter] = useState(0);

  const allReviews = site.reviews;
  const avgRating = allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length;
  const totalReviews = allReviews.length;

  const filtered = filter === 0 ? allReviews : allReviews.filter((r) => r.rating === filter);

  const distribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: allReviews.filter((r) => r.rating === stars).length,
  }));

  const productReviews = useMemo(() => {
    const map = new Map<string, { count: number; avg: number; name: string }>();
    site.products.forEach((p) => {
      const reviews = [...p.reviews, ...site.reviews.filter((r) => r.productSlug === p.slug)];
      if (reviews.length > 0) {
        map.set(p.slug, {
          count: reviews.length,
          avg: reviews.reduce((s, r) => s + r.rating, 0) / reviews.length,
          name: p.name,
        });
      }
    });
    return Array.from(map.entries());
  }, []);

  return (
    <div className="pt-28 pb-20">
      <div className="container-main">
        <SectionLabel label="Reviews" />

        {/* Summary */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star size={28} fill="var(--color-star)" stroke="var(--color-star)" />
            <span className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--color-text)' }}>
              {avgRating.toFixed(1)}
            </span>
          </div>
          <p className="font-body mb-2" style={{ fontSize: '16px', color: 'var(--color-text-muted)' }}>
            Based on {totalReviews} verified reviews
          </p>
          <p className="font-body" style={{ fontSize: '14px', color: 'var(--color-text-subtle)' }}>
            Every review is from a verified purchaser
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Sidebar */}
          <div className="space-y-8">
            {/* Distribution */}
            <div>
              <h3 className="font-display mb-4" style={{ fontSize: '18px', color: 'var(--color-text)' }}>
                Rating Breakdown
              </h3>
              <div className="space-y-2">
                {distribution.map((d) => {
                  const pct = totalReviews > 0 ? (d.count / totalReviews) * 100 : 0;
                  return (
                    <button
                      key={d.stars}
                      onClick={() => setFilter(filter === d.stars ? 0 : d.stars)}
                      className="w-full flex items-center gap-3 focus-ring rounded-md p-1 -ml-1 transition-colors hover:bg-black/[0.02]"
                    >
                      <span className="font-body w-8 text-right flex-shrink-0" style={{ fontSize: '14px', color: 'var(--color-text)' }}>
                        {d.stars}
                      </span>
                      <Star size={14} fill="var(--color-star)" stroke="var(--color-star)" />
                      <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-border-subtle)' }}>
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${pct}%`, backgroundColor: 'var(--color-star)' }}
                        />
                      </div>
                      <span className="font-body w-8 flex-shrink-0" style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                        {d.count}
                      </span>
                    </button>
                  );
                })}
              </div>
              {filter > 0 && (
                <button
                  onClick={() => setFilter(0)}
                  className="font-body mt-4 flex items-center gap-1 focus-ring transition-opacity hover:opacity-70"
                  style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}
                >
                  <X size={14} /> Clear filter
                </button>
              )}
            </div>

            {/* By Product */}
            <div>
              <h3 className="font-display mb-4" style={{ fontSize: '18px', color: 'var(--color-text)' }}>
                Reviews by Product
              </h3>
              <div className="space-y-3">
                {productReviews.map(([slug, data]) => (
                  <div key={slug} className="flex items-center justify-between">
                    <span className="font-body" style={{ fontSize: '14px', color: 'var(--color-text)' }}>
                      {data.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <Star size={12} fill="var(--color-star)" stroke="var(--color-star)" />
                      <span className="font-body" style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                        {data.avg.toFixed(1)} ({data.count})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Review cards */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {filtered.map((review) => (
              <motion.div key={review.id} variants={fadeUp}>
                <ReviewCard review={review} />
              </motion.div>
            ))}
            {filtered.length === 0 && (
              <p className="font-body text-center py-12" style={{ color: 'var(--color-text-muted)' }}>
                No reviews with {filter} stars yet.
              </p>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
