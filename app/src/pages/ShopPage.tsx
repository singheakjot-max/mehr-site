import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { site } from '@/content/site';
import type { GoalCategory, SortOption } from '@/types';
import ProductCard from '@/components/ProductCard';
import SectionLabel from '@/components/SectionLabel';
import Footer from '@/components/global/Footer';
import { ArrowUpDown } from 'lucide-react';

const goalFilters: { key: GoalCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'All Products' },
  { key: 'sleep', label: 'Sleep' },
  { key: 'cognition', label: 'Focus' },
  { key: 'gut', label: 'Gut Health' },
  { key: 'longevity', label: 'Longevity' },
  { key: 'recovery', label: 'Recovery' },
  { key: 'energy', label: 'Energy' },
];

const sortOptions: { key: SortOption; label: string }[] = [
  { key: 'featured', label: 'Featured' },
  { key: 'price-asc', label: 'Price: Low to High' },
  { key: 'price-desc', label: 'Price: High to Low' },
  { key: 'name-asc', label: 'Name: A-Z' },
  { key: 'rating', label: 'Highest Rated' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const goalParam = searchParams.get('goal') as GoalCategory | null;
  const [activeGoal, setActiveGoal] = useState<GoalCategory | 'all'>(goalParam || 'all');
  const [sort, setSort] = useState<SortOption>('featured');
  const filtered = useMemo(() => {
    let products = activeGoal === 'all' ? site.products : site.products.filter((p) => p.goal === activeGoal);

    switch (sort) {
      case 'price-asc':
        products = [...products].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        products = [...products].sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        products = [...products].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        products = [...products].sort((a, b) => {
          const aAvg = a.reviews.reduce((s, r) => s + r.rating, 0) / (a.reviews.length || 1);
          const bAvg = b.reviews.reduce((s, r) => s + r.rating, 0) / (b.reviews.length || 1);
          return bAvg - aAvg;
        });
        break;
    }

    return products;
  }, [activeGoal, sort]);

  const handleGoalChange = (goal: GoalCategory | 'all') => {
    setActiveGoal(goal);
    if (goal === 'all') {
      searchParams.delete('goal');
    } else {
      searchParams.set('goal', goal);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="pb-20">
      <div className="container-main">
        <SectionLabel label="Shop" />
        <h1 className="font-display mb-4" style={{ color: 'var(--color-text)' }}>
          All Products
        </h1>
        <p className="font-body mb-10 max-w-lg" style={{ fontSize: '16px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
          Every formula is third-party tested, dosed at clinically effective levels, and backed by peer-reviewed research.
        </p>

        {/* Filters & Sort */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          {/* Goal filters */}
          <div className="flex flex-wrap gap-2">
            {goalFilters.map((goal) => (
              <button
                key={goal.key}
                onClick={() => handleGoalChange(goal.key)}
                className="font-body px-4 py-2 rounded-md transition-all focus-ring"
                style={{
                  fontSize: '13px',
                  fontWeight: activeGoal === goal.key ? 500 : 400,
                  backgroundColor: activeGoal === goal.key ? 'var(--color-accent)' : 'transparent',
                  color: activeGoal === goal.key ? 'var(--color-accent-fg)' : 'var(--color-text)',
                  border: activeGoal === goal.key ? 'none' : '1px solid var(--color-border)',
                }}
              >
                {goal.label}
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="font-body appearance-none px-4 py-2.5 pr-10 rounded-md border focus-ring cursor-pointer"
              style={{
                fontSize: '13px',
                backgroundColor: 'var(--color-surface)',
                color: 'var(--color-text)',
                borderColor: 'var(--color-border)',
              }}
            >
              {sortOptions.map((opt) => (
                <option key={opt.key} value={opt.key}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ArrowUpDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--color-text-muted)' }} />
          </div>
        </div>

        {/* Results */}
        {filtered.length > 0 ? (
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
          >
            {filtered.map((product) => (
              <motion.div key={product.id} variants={fadeUp}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <p className="font-body" style={{ fontSize: '16px', color: 'var(--color-text-muted)' }}>
              No products match this filter. Try another category.
            </p>
            <button
              onClick={() => handleGoalChange('all')}
              className="btn-primary mt-4"
            >
              View All Products
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
