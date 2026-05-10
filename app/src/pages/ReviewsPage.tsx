import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { site } from '@/content/site';
import { Star, X } from 'lucide-react';
import ReviewCard from '@/components/ReviewCard';
// import SectionLabel from '@/components/SectionLabel';
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
  const avgRating = allReviews.length
    ? allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length
    : 0;
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
    <div className="pt-20">
      {/* Hero — color flooded with personality */}
      <section
        className="pt-8 md:pt-12 pb-8 md:pb-10 relative overflow-hidden"
        style={{ backgroundColor: '#FAF3F4' }}
      >
        <span className="absolute pointer-events-none hidden md:block" style={{ top: '15%', left: '8%', fontSize: 22, color: '#6B1F2A', opacity: 0.55, zIndex: 1 }} aria-hidden>✦</span>
        <span className="absolute pointer-events-none hidden md:block" style={{ top: '50%', right: '10%', fontSize: 18, color: '#6B1F2A', opacity: 0.5, zIndex: 1 }} aria-hidden>✦</span>
        <span className="absolute pointer-events-none hidden md:block" style={{ bottom: '20%', left: '40%', fontSize: 14, color: '#6B1F2A', opacity: 0.4, zIndex: 1 }} aria-hidden>✦</span>

        <div className="container-main text-center relative" style={{ zIndex: 2 }}>
          <div
            className="brand-stamp shadow-pop tilt-l mb-5 inline-flex"
            style={{
              backgroundColor: '#6B1F2A',
              color: '#fff',
              fontSize: '11px',
              fontWeight: 900,
              padding: '6px 13px',
              letterSpacing: '0.1em',
            }}
          >
            ✦ REAL HUMANS · REAL RESULTS ✦
          </div>
          <h1 className="font-display mb-5" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.75rem)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.04em', color: '#0A0A0A' }}>
            What people{' '}
            <span style={{ color: '#6B1F2A', fontStyle: 'italic' }}>actually say.</span>
          </h1>
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} className="inline-flex items-center justify-center w-5 h-5" style={{ backgroundColor: '#00B67A' }}>
                  <Star size={12} fill="#FFFFFF" stroke="#FFFFFF" strokeWidth={0} />
                </span>
              ))}
            </div>
            <span className="font-display" style={{ fontSize: '24px', fontWeight: 900, color: '#0A0A0A', letterSpacing: '-0.02em' }}>
              {avgRating.toFixed(1)}/5
            </span>
            <span className="font-body" style={{ fontSize: '14px', color: '#6B6B6B' }}>
              · {totalReviews} verified
            </span>
          </div>
          <p className="font-body" style={{ fontSize: '13px', color: '#6B6B6B' }}>
            Every review is from a verified purchaser. We don&apos;t pay for reviews. Ever.
          </p>
        </div>
      </section>

      <div className="container-main pt-10 pb-20">

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
