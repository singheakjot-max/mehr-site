import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { site } from '@/content/site';
import type { Product } from '@/types';
import {
  Minus,
  Plus,
  Check,
  X,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  FileText,
} from 'lucide-react';
import StarRating from '@/components/StarRating';
import ReviewCard from '@/components/ReviewCard';
import COAModal from '@/components/COAModal';
import Footer from '@/components/global/Footer';

interface ProductDetailPageProps {
  onAddToCart: (productId: string, quantity: number, subscription: boolean) => void;
  cartCount: number;
}

/* ───────── helpers ───────── */

function accentFor(slug: string): { hex: string; soft: string } {
  if (slug === 'nattokinase') return { hex: '#6B1F2A', soft: '#FAF3F4' };
  return { hex: '#1E2F6B', soft: '#F2F4FA' };
}

const TIMELINES: Record<string, { day: string; headline: string; body: string }[]> = {
  nattokinase: [
    {
      day: 'Days 1–14',
      headline: 'The foundation lays itself.',
      body: 'No fireworks. Your body starts processing the clinical 10,800 FU dose, building plasma fibrinolytic activity quietly in the background.',
    },
    {
      day: 'Days 15–45',
      headline: 'The first real signals.',
      body: 'Most users report warmer extremities, less afternoon heaviness, and more even energy. Some see early movement on home blood-pressure readings.',
    },
    {
      day: 'Days 46–90',
      headline: 'Compounding shows up.',
      body: 'This is the window where lab work, BP cuffs, and Apple Watch data start agreeing with how you feel. Foundational health is a slow build — by design.',
    },
  ],
  'bpc-157': [
    {
      day: 'Days 1–14',
      headline: 'The gut goes first.',
      body: 'BPC-157 is a gut-derived peptide. Digestive comfort, less bloat, more regular routines — this is usually where users notice change first.',
    },
    {
      day: 'Days 15–45',
      headline: 'Recovery shifts.',
      body: 'Joint discomfort softens. Workout soreness shortens. Tendons and connective tissue start moving cleaner. Most users feel this by week 4.',
    },
    {
      day: 'Days 46–90',
      headline: 'A different baseline.',
      body: 'Recovery, gut, and tissue resilience all stack into a new daily baseline. This is what foundational means — not a stimulant, a substrate.',
    },
  ],
};

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ───────── 1. Hero ───────── */

function Hero({
  product,
  accent,
  onAddToCart,
}: {
  product: Product;
  accent: { hex: string; soft: string };
  onAddToCart: (productId: string, quantity: number, subscription: boolean) => void;
}) {
  const [selected, setSelected] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [subscription, setSubscription] = useState(false);
  const [coaOpen, setCoaOpen] = useState(false);
  const [adding, setAdding] = useState(false);

  const avgRating = product.reviews.length
    ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length
    : 0;

  const currentPrice = subscription ? product.subscriptionPrice : product.price;
  const total = currentPrice * quantity;

  const handleAdd = () => {
    setAdding(true);
    onAddToCart(product.id, quantity, subscription);
    setTimeout(() => setAdding(false), 900);
  };

  return (
    <section className="pt-28 pb-12 md:pb-16" style={{ backgroundColor: accent.soft }}>
      <div className="container-main">
        <nav className="flex items-center gap-2 text-[13px] mb-6 md:mb-8" style={{ color: 'var(--color-text-muted)' }}>
          <Link to="/" className="hover:underline">Home</Link>
          <ChevronRight size={13} strokeWidth={1.5} />
          <Link to="/shop" className="hover:underline">Shop</Link>
          <ChevronRight size={13} strokeWidth={1.5} />
          <span style={{ color: 'var(--color-text)' }}>{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-3">
            <div
              className="rounded-2xl overflow-hidden mb-4"
              style={{ aspectRatio: '4/5', backgroundColor: 'var(--color-surface)' }}
            >
              <img
                src={product.gallery[selected]}
                alt={`${product.name} — image ${selected + 1} of ${product.gallery.length}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-3 overflow-x-auto">
              {product.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  className="rounded-lg overflow-hidden flex-shrink-0 transition-all focus-ring"
                  style={{
                    width: 76,
                    height: 76,
                    border: selected === i ? `2px solid ${accent.hex}` : '2px solid transparent',
                    opacity: selected === i ? 1 : 0.55,
                  }}
                  aria-label={`View image ${i + 1}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-28">
              <div className="h-1 w-16 mb-4" style={{ backgroundColor: accent.hex }} />
              <StarRating rating={avgRating} size={14} reviewCount={product.reviews.length} />
              <h1
                className="font-display mt-3 mb-2"
                style={{
                  fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  color: 'var(--color-text-strong)',
                }}
              >
                {product.name}
              </h1>
              <p className="font-body text-[15px] mb-6" style={{ color: 'var(--color-text-muted)', lineHeight: 1.55 }}>
                {product.tagline}
              </p>

              <div className="space-y-5 mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="font-display" style={{ fontSize: '32px', fontWeight: 500, color: 'var(--color-text-strong)' }}>
                    ${currentPrice}
                  </span>
                  {subscription && (
                    <span className="font-body text-[14px] line-through" style={{ color: 'var(--color-text-subtle)' }}>
                      ${product.price}
                    </span>
                  )}
                  <span className="font-body text-[13px]" style={{ color: 'var(--color-text-muted)' }}>
                    / bottle
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 p-1 rounded-lg" style={{ backgroundColor: 'var(--color-surface)' }}>
                  <button
                    onClick={() => setSubscription(false)}
                    className="py-2.5 px-3 rounded-md font-body text-[13px] font-medium transition-all"
                    style={{
                      backgroundColor: !subscription ? 'var(--color-text-strong)' : 'transparent',
                      color: !subscription ? 'var(--color-text-inverse)' : 'var(--color-text-muted)',
                    }}
                  >
                    One-time
                  </button>
                  <button
                    onClick={() => setSubscription(true)}
                    className="py-2.5 px-3 rounded-md font-body text-[13px] font-medium transition-all flex items-center justify-center gap-1.5"
                    style={{
                      backgroundColor: subscription ? 'var(--color-text-strong)' : 'transparent',
                      color: subscription ? 'var(--color-text-inverse)' : 'var(--color-text-muted)',
                    }}
                  >
                    Subscribe
                    <span
                      className="font-body text-[11px] px-1.5 py-0.5 rounded"
                      style={{
                        backgroundColor: subscription ? accent.hex : 'transparent',
                        color: subscription ? '#fff' : accent.hex,
                        border: subscription ? 'none' : `1px solid ${accent.hex}40`,
                      }}
                    >
                      −{product.subscriptionDiscount}%
                    </span>
                  </button>
                </div>

                <div>
                  <label className="font-body text-[13px] font-medium mb-2 block" style={{ color: 'var(--color-text)' }}>
                    Quantity
                  </label>
                  <div className="inline-flex items-center rounded-lg" style={{ border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 transition-opacity hover:opacity-60 focus-ring"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-body text-[14px] font-medium w-10 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 transition-opacity hover:opacity-60 focus-ring"
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAdd}
                  disabled={adding}
                  className="w-full py-4 px-6 rounded-lg font-body text-[15px] font-medium transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
                  style={{ backgroundColor: 'var(--color-text-strong)', color: 'var(--color-text-inverse)' }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {adding ? (
                      <motion.span key="added" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                        <Check size={16} />
                        Added to cart
                      </motion.span>
                    ) : (
                      <motion.span key="add" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        Add to cart — ${total}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>

                <div className="grid grid-cols-3 gap-3 pt-1">
                  {[
                    { icon: <Truck size={14} />, label: 'Ships in 24h' },
                    { icon: <RotateCcw size={14} />, label: '60-day promise' },
                    { icon: <ShieldCheck size={14} />, label: 'Lab tested' },
                  ].map((t) => (
                    <div key={t.label} className="flex items-center gap-1.5 font-body text-[11px]" style={{ color: 'var(--color-text-muted)' }}>
                      {t.icon}
                      <span>{t.label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {['Visa', 'MC', 'Amex', 'Apple Pay', 'Shop Pay', 'Klarna'].map((pm) => (
                    <span
                      key={pm}
                      className="font-body text-[10px] font-medium px-2 py-1 rounded"
                      style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text-subtle)', border: '1px solid var(--color-border)' }}
                    >
                      {pm}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setCoaOpen(true)}
                  className="flex items-center gap-2 font-body text-[13px] font-medium transition-opacity hover:opacity-70 focus-ring"
                  style={{ color: 'var(--color-text)' }}
                >
                  <FileText size={14} />
                  View Certificate of Analysis
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <COAModal
        isOpen={coaOpen}
        onClose={() => setCoaOpen(false)}
        productName={product.name}
        coaUrl={product.coaUrl}
        coaLabel={product.coaLabel}
      />
    </section>
  );
}

/* ───────── 2. Why this peptide ───────── */

function WhyPeptide({ product, accent }: { product: Product; accent: { hex: string; soft: string } }) {
  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container-main">
        <div className="max-w-3xl mb-12 md:mb-16">
          <Reveal>
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: accent.hex }}>
              Why this matters
            </p>
            <h2
              className="font-display mb-6"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', letterSpacing: '-0.02em', lineHeight: 1.15, color: 'var(--color-text-strong)' }}
            >
              {product.slug === 'nattokinase' ? (
                <>The clinical dose, made <em style={{ fontStyle: 'italic' }}>daily.</em></>
              ) : (
                <>The peptide your body uses to <em style={{ fontStyle: 'italic' }}>repair itself.</em></>
              )}
            </h2>
            <p className="font-body text-[16px] md:text-[17px]" style={{ lineHeight: 1.65, color: 'var(--color-text-secondary)' }}>
              {product.description}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {product.numbersCallout.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div>
                <p
                  className="font-display mb-2"
                  style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 500, color: accent.hex, lineHeight: 1, letterSpacing: '-0.02em' }}
                >
                  {stat.value}
                </p>
                <p className="font-body text-[13px]" style={{ color: 'var(--color-text-muted)', letterSpacing: '0.02em' }}>
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── 3. Timeline ───────── */

function Timeline({ product, accent }: { product: Product; accent: { hex: string; soft: string } }) {
  const stages = TIMELINES[product.slug] || TIMELINES.nattokinase;

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-soft)' }}>
      <div className="container-main">
        <Reveal className="text-center mb-12 md:mb-16">
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: 'var(--color-text-muted)' }}>
            What to expect
          </p>
          <h2
            className="font-display"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', letterSpacing: '-0.02em', lineHeight: 1.15, color: 'var(--color-text-strong)' }}
          >
            The first 90 <em style={{ fontStyle: 'italic' }}>days.</em>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {stages.map((stage, i) => (
            <Reveal key={stage.day} delay={i * 0.1}>
              <div
                className="p-7 md:p-8 rounded-xl h-full"
                style={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)' }}
              >
                <div
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full font-body text-[13px] font-semibold mb-5"
                  style={{ backgroundColor: `${accent.hex}15`, color: accent.hex }}
                >
                  {i + 1}
                </div>
                <p className="font-body text-[11px] font-semibold uppercase tracking-[0.15em] mb-2" style={{ color: accent.hex }}>
                  {stage.day}
                </p>
                <h3
                  className="font-display mb-3"
                  style={{ fontSize: '20px', fontWeight: 500, color: 'var(--color-text-strong)', lineHeight: 1.3, letterSpacing: '-0.01em' }}
                >
                  {stage.headline}
                </h3>
                <p className="font-body text-[14px]" style={{ color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  {stage.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── 4. Ingredients ───────── */

function Ingredients({ product, accent }: { product: Product; accent: { hex: string; soft: string } }) {
  const primary = product.ingredients[0];

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container-main">
        <Reveal className="mb-12">
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: accent.hex }}>
            What's inside
          </p>
          <h2
            className="font-display"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', letterSpacing: '-0.02em', lineHeight: 1.15, color: 'var(--color-text-strong)' }}
          >
            Nothing you didn't <em style={{ fontStyle: 'italic' }}>ask for.</em>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <Reveal>
            <div
              className="p-7 md:p-9 rounded-xl h-full"
              style={{ backgroundColor: 'var(--color-bg-soft)', border: '1px solid var(--color-border)' }}
            >
              <div className="h-1 w-12 mb-5" style={{ backgroundColor: accent.hex }} />
              <h3
                className="font-display mb-1"
                style={{ fontSize: '22px', fontWeight: 500, color: 'var(--color-text-strong)', letterSpacing: '-0.01em' }}
              >
                {primary.name}
              </h3>
              <p className="font-body text-[13px] mb-5" style={{ color: 'var(--color-text-muted)', letterSpacing: '0.01em' }}>
                {primary.amount}
              </p>
              <p className="font-body text-[15px] mb-5" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>
                {primary.description}
              </p>
              <a
                href={primary.studyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-body text-[13px] font-medium transition-opacity hover:opacity-70"
                style={{ color: accent.hex }}
              >
                Read the study — {primary.studyRef}
                <ArrowRight size={13} strokeWidth={1.75} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              className="p-7 md:p-8 h-full"
              style={{ backgroundColor: 'var(--color-bg)', border: '2px solid var(--color-text-strong)' }}
            >
              <h4 className="font-body font-bold mb-1" style={{ fontSize: '20px', color: 'var(--color-text-strong)', letterSpacing: '-0.01em' }}>
                Supplement Facts
              </h4>
              <p className="font-body text-[12px]" style={{ color: 'var(--color-text-secondary)' }}>
                Serving Size: {product.servingSize}
              </p>
              <p className="font-body text-[12px] mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                Servings Per Container: {product.servingsPerContainer}
              </p>
              <div style={{ borderTop: '8px solid var(--color-text-strong)' }} />
              <div className="flex justify-between py-2.5" style={{ borderBottom: '1px solid var(--color-text-strong)' }}>
                <span className="font-body text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-strong)' }}>
                  Amount per serving
                </span>
                <span className="font-body text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-strong)' }}>
                  % DV
                </span>
              </div>
              {product.ingredients.map((ing) => (
                <div key={ing.name} className="flex justify-between py-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <div>
                    <span className="font-body text-[14px] font-bold block" style={{ color: 'var(--color-text-strong)' }}>
                      {ing.name}
                    </span>
                    <span className="font-body text-[13px]" style={{ color: 'var(--color-text-strong)' }}>
                      {ing.amount}
                    </span>
                  </div>
                  <span className="font-body text-[14px]" style={{ color: 'var(--color-text-muted)' }}>*</span>
                </div>
              ))}
              <p className="font-body text-[11px] mt-3" style={{ color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                * Daily Value not established. Other ingredients: vegetable cellulose capsule, rice flour. Vegan, gluten-free.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ───────── 5. Receipts ───────── */

function Receipts({ product, accent }: { product: Product; accent: { hex: string; soft: string } }) {
  const [coaOpen, setCoaOpen] = useState(false);

  const items: Array<{ title: string; body: string; cta?: { label: string; onClick: () => void } }> = [
    {
      title: 'Made in USA',
      body: 'Manufactured in a cGMP-certified, FDA-registered facility in Utah. Inspected and audited annually.',
    },
    {
      title: '3rd-party tested',
      body: 'Every batch independently tested for identity, potency, and contaminants. We publish the actual COA — not a marketing summary.',
      cta: { label: 'View Certificate of Analysis', onClick: () => setCoaOpen(true) },
    },
    {
      title: 'Heavy metals tested',
      body: 'Lead < 0.5 ppm (limit: 10). Cadmium < 0.1 ppm (limit: 4.1). Mercury < 0.1 ppm (limit: 2). All passing, every batch.',
    },
  ];

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-soft)' }}>
      <div className="container-main">
        <Reveal className="text-center mb-12 md:mb-16">
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: 'var(--color-text-muted)' }}>
            The receipts
          </p>
          <h2
            className="font-display"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', letterSpacing: '-0.02em', lineHeight: 1.15, color: 'var(--color-text-strong)' }}
          >
            Nothing to <em style={{ fontStyle: 'italic' }}>hide.</em>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div
                className="p-7 rounded-xl h-full"
                style={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)' }}
              >
                <div className="h-1 w-10 mb-5" style={{ backgroundColor: accent.hex }} />
                <h3 className="font-display mb-3" style={{ fontSize: '19px', fontWeight: 500, color: 'var(--color-text-strong)', letterSpacing: '-0.01em' }}>
                  {item.title}
                </h3>
                <p className="font-body text-[14px]" style={{ color: 'var(--color-text-muted)', lineHeight: 1.65 }}>
                  {item.body}
                </p>
                {item.cta && (
                  <button
                    onClick={item.cta.onClick}
                    className="inline-flex items-center gap-1.5 font-body text-[13px] font-medium mt-4 transition-opacity hover:opacity-70"
                    style={{ color: accent.hex }}
                  >
                    {item.cta.label}
                    <ArrowRight size={13} strokeWidth={1.75} />
                  </button>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <COAModal
        isOpen={coaOpen}
        onClose={() => setCoaOpen(false)}
        productName={product.name}
        coaUrl={product.coaUrl}
        coaLabel={product.coaLabel}
      />
    </section>
  );
}

/* ───────── 6. Directions ───────── */

function Directions({ product, accent }: { product: Product; accent: { hex: string; soft: string } }) {
  const dosePhrase = product.servingSize.replace(/\s*capsules?\b/i, (m) => `${m}.`);

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container-narrow text-center">
        <Reveal>
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] mb-6" style={{ color: accent.hex }}>
            Directions
          </p>
          <h2
            className="font-display mb-8"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.025em', lineHeight: 1.1, color: 'var(--color-text-strong)' }}
          >
            {dosePhrase} With breakfast. <em style={{ fontStyle: 'italic' }}>Daily.</em>
          </h2>
          <p className="font-body text-[16px] md:text-[17px]" style={{ color: 'var(--color-text-muted)', lineHeight: 1.65 }}>
            {product.howToUse}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────── 7. Comparison ───────── */

function Comparison({ product, accent }: { product: Product; accent: { hex: string; soft: string } }) {
  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-soft)' }}>
      <div className="container-main">
        <Reveal className="text-center mb-12">
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: 'var(--color-text-muted)' }}>
            How we compare
          </p>
          <h2
            className="font-display"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', letterSpacing: '-0.02em', lineHeight: 1.15, color: 'var(--color-text-strong)' }}
          >
            mehr vs. <em style={{ fontStyle: 'italic' }}>everything else.</em>
          </h2>
        </Reveal>

        <Reveal>
          <div className="overflow-x-auto rounded-xl" style={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
            <table className="w-full font-body text-[14px] md:text-[15px]">
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-text-strong)' }}>
                  <th className="text-left py-4 px-5 md:px-7 font-medium w-[40%]" style={{ color: 'var(--color-text-muted)' }}>
                    Feature
                  </th>
                  <th className="text-left py-4 px-5 md:px-7 font-semibold" style={{ color: 'var(--color-text-strong)' }}>
                    <span style={{ color: accent.hex }}>mehr</span>
                  </th>
                  <th className="text-left py-4 px-5 md:px-7 font-medium" style={{ color: 'var(--color-text-muted)' }}>
                    Other brands
                  </th>
                </tr>
              </thead>
              <tbody>
                {product.comparisonTable.map((row) => (
                  <tr key={row.feature} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td className="py-4 px-5 md:px-7 font-medium" style={{ color: 'var(--color-text)' }}>
                      {row.feature}
                    </td>
                    <td className="py-4 px-5 md:px-7">
                      <span className="inline-flex items-center gap-2 font-medium" style={{ color: 'var(--color-text-strong)' }}>
                        <Check size={15} strokeWidth={2.5} style={{ color: accent.hex }} />
                        {row.ourValue}
                      </span>
                    </td>
                    <td className="py-4 px-5 md:px-7" style={{ color: 'var(--color-text-muted)' }}>
                      <span className="inline-flex items-center gap-2">
                        <X size={15} strokeWidth={1.75} style={{ color: 'var(--color-text-subtle)' }} />
                        {row.theirValue}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────── 8. Reviews ───────── */

function Reviews({ product }: { product: Product }) {
  const avg = product.reviews.length
    ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length
    : 0;

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container-main">
        <Reveal className="mb-10">
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: 'var(--color-text-muted)' }}>
            Customer reviews
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="flex items-baseline gap-4">
              <span
                className="font-display"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 500, color: 'var(--color-text-strong)', letterSpacing: '-0.02em', lineHeight: 1 }}
              >
                {avg.toFixed(1)}
              </span>
              <div>
                <StarRating rating={avg} size={16} showValue={false} />
                <p className="font-body text-[13px] mt-1" style={{ color: 'var(--color-text-muted)' }}>
                  Based on {product.reviews.length} verified reviews
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {product.reviews.slice(0, 6).map((review, i) => (
            <Reveal key={review.id} delay={i * 0.05}>
              <ReviewCard review={review} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── 9. FAQ ───────── */

function FAQ({ product, accent }: { product: Product; accent: { hex: string; soft: string } }) {
  const faqs = useMemo(() => site.faqs.filter((f) => product.faqIds.includes(f.id)), [product]);
  const [open, setOpen] = useState<string | null>(null);

  if (!faqs.length) return null;

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-soft)' }}>
      <div className="container-narrow">
        <Reveal className="mb-10 text-center">
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: 'var(--color-text-muted)' }}>
            Questions, answered
          </p>
          <h2
            className="font-display"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', letterSpacing: '-0.02em', lineHeight: 1.15, color: 'var(--color-text-strong)' }}
          >
            Frequently <em style={{ fontStyle: 'italic' }}>asked.</em>
          </h2>
        </Reveal>

        <Reveal>
          <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
            {faqs.map((faq, i) => {
              const isOpen = open === faq.id;
              return (
                <div key={faq.id} style={{ borderBottom: i < faqs.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
                  <button
                    onClick={() => setOpen(isOpen ? null : faq.id)}
                    className="w-full flex items-center justify-between gap-6 py-5 px-6 md:px-8 text-left transition-colors hover:bg-[color:var(--color-bg-soft)] focus-ring"
                  >
                    <span className="font-body text-[15px] md:text-[16px] font-medium" style={{ color: 'var(--color-text-strong)' }}>
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={18}
                      style={{
                        color: isOpen ? accent.hex : 'var(--color-text-muted)',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                        transition: 'transform 0.25s ease',
                        flexShrink: 0,
                      }}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p className="font-body text-[14px] md:text-[15px] px-6 md:px-8 pb-5" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────── 10. Related ───────── */

function Related({ product }: { product: Product }) {
  const related = useMemo(() => site.products.find((p) => product.relatedSlugs.includes(p.slug)), [product]);
  if (!related) return null;
  const relatedAccent = accentFor(related.slug);

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container-main">
        <Reveal className="text-center mb-10">
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: 'var(--color-text-muted)' }}>
            The full ritual
          </p>
          <h2
            className="font-display"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', letterSpacing: '-0.02em', lineHeight: 1.15, color: 'var(--color-text-strong)' }}
          >
            Complete your daily <em style={{ fontStyle: 'italic' }}>stack.</em>
          </h2>
        </Reveal>

        <Reveal>
          <Link
            to={`/products/${related.slug}`}
            className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-10 p-6 md:p-10 rounded-2xl items-center transition-all hover:shadow-md"
            style={{ backgroundColor: relatedAccent.soft, border: `1px solid ${relatedAccent.hex}20` }}
          >
            <div className="md:col-span-2 rounded-xl overflow-hidden" style={{ aspectRatio: '4/5', backgroundColor: 'var(--color-surface)' }}>
              <img src={related.image} alt={related.name} className="w-full h-full object-cover" />
            </div>
            <div className="md:col-span-3">
              <div className="h-1 w-12 mb-4" style={{ backgroundColor: relatedAccent.hex }} />
              <h3
                className="font-display mb-2"
                style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 500, color: 'var(--color-text-strong)', letterSpacing: '-0.01em', lineHeight: 1.15 }}
              >
                {related.name}
              </h3>
              <p className="font-body text-[15px] mb-5" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                {related.tagline}
              </p>
              <div className="flex items-center gap-4">
                <span className="font-display" style={{ fontSize: '20px', fontWeight: 500, color: 'var(--color-text-strong)' }}>
                  ${related.price}
                </span>
                <span className="inline-flex items-center gap-1.5 font-body text-[13px] font-medium" style={{ color: relatedAccent.hex }}>
                  View product
                  <ArrowRight size={13} strokeWidth={2} />
                </span>
              </div>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────── 11. Sticky mobile bar ───────── */

function StickyMobileBar({
  product,
  onAddToCart,
}: {
  product: Product;
  onAddToCart: (productId: string, quantity: number, subscription: boolean) => void;
}) {
  const [adding, setAdding] = useState(false);
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden p-3"
      style={{ backgroundColor: 'var(--color-bg)', borderTop: '1px solid var(--color-border)', boxShadow: 'var(--shadow-lg)' }}
    >
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <p className="font-body text-[11px]" style={{ color: 'var(--color-text-muted)' }}>{product.name}</p>
          <p className="font-display" style={{ fontSize: '18px', fontWeight: 500, color: 'var(--color-text-strong)' }}>${product.price}</p>
        </div>
        <button
          onClick={() => {
            setAdding(true);
            onAddToCart(product.id, 1, false);
            setTimeout(() => setAdding(false), 900);
          }}
          disabled={adding}
          className="px-6 py-3.5 rounded-lg font-body text-[14px] font-medium flex items-center gap-2"
          style={{ backgroundColor: 'var(--color-text-strong)', color: 'var(--color-text-inverse)' }}
        >
          {adding ? (
            <>
              <Check size={16} /> Added
            </>
          ) : (
            'Add to cart'
          )}
        </button>
      </div>
    </div>
  );
}

/* ───────── Page ───────── */

export default function ProductDetailPage({ onAddToCart }: ProductDetailPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const product = useMemo(() => site.products.find((p) => p.slug === slug), [slug]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center pt-28">
        <div className="text-center">
          <h1 className="font-display mb-4" style={{ color: 'var(--color-text)' }}>Product Not Found</h1>
          <Link to="/shop" className="btn-secondary">Back to shop</Link>
        </div>
      </div>
    );
  }

  const accent = accentFor(product.slug);

  return (
    <div className="pb-24 lg:pb-0">
      <Hero product={product} accent={accent} onAddToCart={onAddToCart} />
      <WhyPeptide product={product} accent={accent} />
      <Timeline product={product} accent={accent} />
      <Ingredients product={product} accent={accent} />
      <Receipts product={product} accent={accent} />
      <Directions product={product} accent={accent} />
      <Comparison product={product} accent={accent} />
      <Reviews product={product} />
      <FAQ product={product} accent={accent} />
      <Related product={product} />
      <Footer />
      <StickyMobileBar product={product} onAddToCart={onAddToCart} />
    </div>
  );
}
