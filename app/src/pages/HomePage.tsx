// HomePage.tsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { site } from '@/content/site';
import {
  FlaskConical,
  ShieldCheck,
  Truck,
  ArrowRight,
  Star,
  CheckCircle2,
  Sparkles,
  Sun,
} from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';
import ProductCard from '@/components/ProductCard';
import StudyCard from '@/components/StudyCard';
import ReviewCard from '@/components/ReviewCard';
// import TrustStrip from '@/components/TrustStrip';
import Footer from '@/components/global/Footer';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ───── Category positioning ─────
   Sets up the brand thesis between the press strip and product grid.
   "The world's first daily foundational peptides." */
function CategoryPitchSection() {
  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: '#0A0A0A', color: '#fff' }}
    >
      {/* Giant ghost outline number */}
      <div
        className="absolute inset-0 pointer-events-none flex items-center justify-end opacity-[0.05]"
        aria-hidden
      >
        <span
          className="font-display pr-[3vw]"
          style={{
            fontSize: 'clamp(20rem, 50vw, 50rem)',
            fontWeight: 800,
            letterSpacing: '-0.05em',
            lineHeight: 0.8,
            color: '#fff',
            WebkitTextStroke: '1.5px #fff',
          }}
        >
          01
        </span>
      </div>

      {/* Sparkles — minimal */}
      <span className="absolute pointer-events-none" style={{ top: '12%', left: '12%', fontSize: 22, color: '#fff', opacity: 0.4 }} aria-hidden>✦</span>
      <span className="absolute pointer-events-none" style={{ bottom: '22%', right: '8%', fontSize: 16, color: '#fff', opacity: 0.35 }} aria-hidden>✦</span>

      <div className="container-main relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="brand-stamp shadow-deep tilt-l mb-7 inline-flex"
            style={{
              backgroundColor: '#fff',
              color: '#0A0A0A',
              padding: '7px 14px',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.12em',
            }}
          >
            ✦ A NEW CATEGORY ✦
          </div>

          <h2
            className="font-display max-w-4xl mb-7 text-balance"
            style={{
              fontSize: 'clamp(3rem, 7vw, 6rem)',
              letterSpacing: '-0.045em',
              lineHeight: 0.95,
              fontWeight: 700,
              color: '#fff',
            }}
          >
            The world&apos;s first{' '}
            <span style={{ fontStyle: 'italic', fontWeight: 600 }}>daily</span>{' '}
            foundational{' '}
            <span style={{ fontStyle: 'italic', fontWeight: 600 }}>peptides.</span>
          </h2>

          <p className="font-body max-w-2xl mb-12" style={{ fontSize: 'clamp(15px, 1.3vw, 17px)', lineHeight: 1.6, color: 'rgba(255,255,255,0.8)' }}>
            Peptides used to live in two places: research labs and biohacker forums.
            We made them as simple to take as a vitamin — pharmaceutical-grade,
            clinically dosed, third-party tested, shipped from the USA in 24h.
          </p>
        </motion.div>

        {/* 3 stat cards with tilts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 pt-10" style={{ borderTop: '1px solid rgba(255,255,255,0.18)' }}>
          {[
            { value: '10,800', suffix: ' FU', label: 'Clinical natto dose' },
            { value: '500', suffix: ' MCG', label: 'Pharmaceutical BPC' },
            { value: '24', suffix: 'h', label: 'Ships from the USA' },
          ].map((stat, i) => {
            const tilts = ['rotate(-2deg)', 'rotate(1.5deg)', 'rotate(-1deg)'];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl p-6 md:p-7 shadow-deep"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(4px)',
                  transform: tilts[i % 3],
                }}
              >
                <p
                  className="font-display tabular mb-2"
                  style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, letterSpacing: '-0.045em', lineHeight: 0.95, color: '#fff' }}
                >
                  {stat.value}
                  <span style={{ fontSize: '0.55em', fontWeight: 600 }}>{stat.suffix}</span>
                </p>
                <p
                  className="font-body uppercase tracking-[0.15em]"
                  style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}
                >
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───── Daily stack — both products as a bundle pitch ─────
   Sits between the founder story and reviews. Frames the two products
   as a complete daily ritual, not isolated SKUs. */
function DailyStackSection() {
  const natto = site.products.find((p) => p.slug === 'nattokinase');
  const bpc = site.products.find((p) => p.slug === 'bpc-157');
  if (!natto || !bpc) return null;

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: 'var(--color-text-muted)' }}>
            The daily stack
          </p>
          <h2
            className="font-display mb-5"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', letterSpacing: '-0.02em', lineHeight: 1.1, color: 'var(--color-text-strong)' }}
          >
            Two peptides. One <span style={{ fontWeight: 600 }}>morning ritual.</span>
          </h2>
          <p className="font-body max-w-xl mx-auto" style={{ fontSize: '16px', lineHeight: 1.65, color: 'var(--color-text-muted)' }}>
            Circulation and recovery — the two compounds your body uses every day to stay
            resilient. Take both with breakfast. Skip nothing.
          </p>
        </motion.div>

        {/* Two product columns side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-10">
          {[
            { product: natto, accent: '#6B1F2A', soft: '#FAF3F4', role: 'Circulation', stat: '10,800 FU' },
            { product: bpc, accent: '#1E2F6B', soft: '#F2F4FA', role: 'Recovery', stat: '500mcg' },
          ].map(({ product, accent, soft, role, stat }, i) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link
                to={`/products/${product.slug}`}
                className="block rounded-2xl overflow-hidden h-full transition-all hover:shadow-md"
                style={{ backgroundColor: soft, border: `1px solid ${accent}20` }}
              >
                <div className="grid grid-cols-5 gap-4 p-5 md:p-7 items-center">
                  <div className="col-span-2 rounded-lg overflow-hidden" style={{ aspectRatio: '4/5', backgroundColor: 'var(--color-surface)' }}>
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="col-span-3">
                    <p className="font-body text-[11px] font-semibold uppercase tracking-[0.15em] mb-2" style={{ color: accent }}>
                      {role}
                    </p>
                    <h3 className="font-display mb-1" style={{ fontSize: '20px', fontWeight: 500, color: 'var(--color-text-strong)', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                      {product.name.replace('MEHR ', '')}
                    </h3>
                    <p className="font-display mb-3" style={{ fontSize: '24px', fontWeight: 500, color: accent, letterSpacing: '-0.01em' }}>
                      {stat}
                    </p>
                    <p className="font-body text-[13px] mb-4" style={{ color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                      {product.tagline}
                    </p>
                    <span className="inline-flex items-center gap-1.5 font-body text-[13px] font-medium" style={{ color: 'var(--color-text-strong)' }}>
                      View product
                      <ArrowRight size={13} strokeWidth={2} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Ritual cadence row — a simple "what your morning looks like" */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-xl p-6 md:p-8"
          style={{ backgroundColor: 'var(--color-bg-soft)', border: '1px solid var(--color-border)' }}
        >
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'var(--color-text-strong)', color: 'var(--color-text-inverse)' }}
              >
                <Sun size={18} strokeWidth={1.75} />
              </div>
              <div>
                <p className="font-body text-[11px] font-semibold uppercase tracking-[0.15em]" style={{ color: 'var(--color-text-muted)' }}>
                  The morning ritual
                </p>
                <p className="font-display" style={{ fontSize: '18px', fontWeight: 500, color: 'var(--color-text-strong)', letterSpacing: '-0.01em' }}>
                  Two capsules, one cup of coffee.
                </p>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { step: '01', label: 'Wake.', detail: 'Black coffee or water.' },
                { step: '02', label: 'Take both.', detail: 'Nattokinase + BPC-157.' },
                { step: '03', label: 'Breakfast.', detail: 'With food, every day.' },
              ].map((r) => (
                <div key={r.step} className="flex items-baseline gap-3">
                  <span className="font-body text-[11px] font-semibold tabular-nums" style={{ color: 'var(--color-text-subtle)' }}>
                    {r.step}
                  </span>
                  <div>
                    <p className="font-body text-[14px] font-medium" style={{ color: 'var(--color-text-strong)' }}>
                      {r.label}
                    </p>
                    <p className="font-body text-[13px]" style={{ color: 'var(--color-text-muted)' }}>
                      {r.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HeroSection() {
  return (
    <section
      className="relative pt-6 md:pt-10 pb-12 md:pb-16 overflow-hidden"
      style={{ backgroundColor: '#F7F5F0' }}
    >
      {/* Soft neutral blobs — no brand colors flooding the homepage */}
      <div
        className="absolute pointer-events-none hidden md:block"
        style={{ top: '100px', left: '-100px', width: '300px', height: '300px', borderRadius: '50%', backgroundColor: '#0A0A0A', opacity: 0.04, zIndex: 0 }}
        aria-hidden
      />
      <div
        className="absolute pointer-events-none hidden md:block"
        style={{ bottom: '-80px', right: '-80px', width: '320px', height: '320px', borderRadius: '50%', backgroundColor: '#0A0A0A', opacity: 0.03, zIndex: 0 }}
        aria-hidden
      />

      <span className="absolute pointer-events-none hidden md:block" style={{ top: '14%', right: '10%', fontSize: 22, color: '#0A0A0A', opacity: 0.25, zIndex: 1 }} aria-hidden>✦</span>

      <div className="container-main w-full relative" style={{ zIndex: 2 }}>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-2.5 mb-5">
              <span
                className="brand-stamp shadow-pop"
                style={{
                  backgroundColor: '#0A0A0A',
                  color: '#fff',
                  fontSize: '10.5px',
                  fontWeight: 700,
                  padding: '5px 10px',
                  letterSpacing: '0.1em',
                  transform: 'rotate(-2deg)',
                }}
              >
                ✦ NEW CATEGORY
              </span>
              <span className="font-body italic" style={{ fontSize: '13px', color: '#6B6B6B', fontWeight: 500 }}>
                daily peptides
              </span>
            </div>

            <h1 className="font-display mb-4" style={{ fontSize: 'clamp(2.75rem, 6.5vw, 5.25rem)', lineHeight: 0.95, letterSpacing: '-0.04em', color: '#0A0A0A', fontWeight: 700, fontVariationSettings: '"opsz" 80' }}>
              Peptides.<br />
              <span style={{ fontStyle: 'italic', fontWeight: 700, color: '#0A0A0A' }}>Now daily.</span>
            </h1>

            <p className="font-body mb-6 max-w-md" style={{ fontSize: '16px', lineHeight: 1.55, color: '#2A2A2A' }}>
              Foundational health, evolved. Pharmaceutical-grade peptides as easy as a daily vitamin.
              Made in the USA. Shipped in 24h.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Link to="/shop" className="btn-primary shadow-deep">
                Shop the daily essentials
                <ArrowRight size={16} />
              </Link>
              <Link to="/science" className="btn-secondary">
                Why peptides?
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} className="inline-flex items-center justify-center w-4 h-4" style={{ backgroundColor: '#00B67A' }}>
                      <Star size={9} fill="#FFFFFF" stroke="#FFFFFF" strokeWidth={0} />
                    </span>
                  ))}
                </div>
                <span className="font-body font-bold" style={{ fontSize: '13px', color: '#0A0A0A' }}>4.8</span>
                <span className="font-body" style={{ fontSize: '12.5px', color: '#6B6B6B' }}>14,847+ reviews</span>
              </div>
              <span style={{ width: 1, height: 14, backgroundColor: '#E8E8E5' }} aria-hidden className="hidden sm:inline-block" />
              <span className="inline-flex items-center gap-1.5 font-body font-bold uppercase" style={{ fontSize: '10.5px', letterSpacing: '0.08em', color: '#0A0A0A' }}>
                <ShieldCheck size={12} strokeWidth={2.5} />
                Cardiologist approved
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative"
          >
            <Link to="/products/bpc-157" className="block group relative">
              <div
                className="absolute pointer-events-none"
                style={{ top: '8%', left: '8%', width: '84%', height: '84%', borderRadius: '50%', backgroundColor: '#1E2F6B', opacity: 0.08, zIndex: 1 }}
                aria-hidden
              />
              <div
                className="rounded-2xl overflow-visible relative shadow-card"
                style={{ aspectRatio: '4/5', backgroundColor: '#FFFFFF', border: '1px solid #1E2F6B1F', zIndex: 2 }}
              >
                <img
                  src="/images/bpc/bpc_front_bottle.webp"
                  alt="Body Protection Compound"
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 float-anim"
                  style={{ position: 'relative', zIndex: 2 }}
                />
                <div
                  className="brand-stamp shadow-deep tilt-l absolute pointer-events-none"
                  style={{
                    top: '-16px',
                    right: '-10px',
                    width: 88,
                    height: 88,
                    backgroundColor: '#1E2F6B',
                    color: '#fff',
                    flexDirection: 'column',
                    padding: '8px',
                    lineHeight: 1.05,
                    zIndex: 8,
                  }}
                >
                  <span style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1 }}>NEW</span>
                  <span style={{ fontSize: '8px', letterSpacing: '0.1em', marginTop: 3, opacity: 0.95 }}>DAILY</span>
                  <span style={{ fontSize: '7px', letterSpacing: '0.12em', marginTop: 1, opacity: 0.85 }}>PEPTIDE</span>
                </div>
              </div>
              <div className="mt-3 text-center">
                <p className="font-display" style={{ fontSize: '15px', fontWeight: 700, color: '#0A0A0A', letterSpacing: '-0.01em' }}>
                  Body Protection Compound
                </p>
                <p className="font-body" style={{ fontSize: '12.5px', color: '#6B6B6B' }}>
                  From $74.00/mo
                </p>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


function PressLogosSection() {
  return (
    <section className="py-12" style={{ borderBottom: '1px solid var(--color-border)' }}>
      <div className="container-main">
        <p
          className="font-body text-center mb-8"
          style={{ fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}
        >
          As seen in
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {site.pressLogos.map((logo) => (
            <span
              key={logo.name}
              className="font-display"
              style={{
                fontSize: '15px',
                fontWeight: 500,
                color: 'var(--color-text-subtle)',
                letterSpacing: '0.02em',
              }}
              title={logo.alt}
            >
              {logo.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUsSection() {
  const iconMap: Record<string, React.ReactNode> = {
    'flask-conical': <FlaskConical size={24} />,
    'shield-check': <ShieldCheck size={24} />,
    'truck': <Truck size={24} />,
  };

  return (
    <section className="section-padding relative overflow-hidden" style={{ backgroundColor: '#F7F5F0' }}>
      {/* Sparkles */}
      <span className="absolute pointer-events-none" style={{ top: '12%', left: '8%', fontSize: 22, color: '#0A0A0A', opacity: 0.25 }} aria-hidden>✦</span>
      <span className="absolute pointer-events-none" style={{ top: '20%', right: '12%', fontSize: 16, color: '#0A0A0A', opacity: 0.2 }} aria-hidden>✦</span>

      <div className="container-main relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div
            className="brand-stamp shadow-pop tilt-r mb-5 inline-flex"
            style={{
              backgroundColor: '#0A0A0A',
              color: '#fff',
              padding: '6px 13px',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.12em',
            }}
          >
            ✦ WHY MEHR ✦
          </div>
          <h2
            className="font-display"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.04em', color: '#0A0A0A' }}
          >
            Three things we{' '}
            <span style={{ color: '#0A0A0A', fontStyle: 'italic' }}>refuse</span>{' '}
            to compromise on.
          </h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-5 md:gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {site.whyUsCards.map((card, i) => {
            const tilts = ['rotate(-1.5deg)', 'rotate(1deg)', 'rotate(-1deg)'];
            return (
              <motion.div
                key={card.headline}
                variants={fadeUp}
                className="rounded-2xl p-7 md:p-8 shadow-card relative"
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid rgba(10, 10, 10, 0.10)',
                  transform: tilts[i % 3],
                }}
              >
                <span
                  className="absolute font-body font-bold uppercase shadow-pop"
                  style={{
                    top: '-13px',
                    left: '20px',
                    backgroundColor: '#0A0A0A',
                    color: '#fff',
                    fontSize: '10px',
                    letterSpacing: '0.1em',
                    padding: '4px 9px',
                    borderRadius: '999px',
                  }}
                >
                  0{i + 1} / 03
                </span>
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
                  style={{ backgroundColor: '#0A0A0A', color: '#fff' }}
                >
                  {iconMap[card.icon]}
                </div>
                <h3 className="font-display mb-3" style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '-0.02em', color: '#0A0A0A' }}>
                  {card.headline}
                </h3>
                <p className="font-body" style={{ fontSize: '14.5px', lineHeight: 1.55, color: '#2A2A2A' }}>
                  {card.proof}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedProductsSection() {
  const featured = site.products.slice(0, 4);

  return (
    <section className="section-padding relative overflow-hidden" style={{ backgroundColor: '#FFFFFF' }}>
      <span className="absolute pointer-events-none" style={{ top: '12%', right: '8%', fontSize: 20, color: '#0A0A0A', opacity: 0.25 }} aria-hidden>✦</span>
      <span className="absolute pointer-events-none" style={{ bottom: '10%', left: '6%', fontSize: 16, color: '#0A0A0A', opacity: 0.2 }} aria-hidden>✦</span>

      <div className="container-main relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14"
        >
          <div>
            <div
              className="brand-stamp shadow-pop tilt-l mb-4 inline-flex"
              style={{
                backgroundColor: '#0A0A0A',
                color: '#fff',
                padding: '6px 13px',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.12em',
              }}
            >
              ✦ THE LINEUP ✦
            </div>
            <h2
              className="font-display"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.04em', color: '#0A0A0A' }}
            >
              Two products.{' '}
              <span style={{ color: '#0A0A0A', fontStyle: 'italic' }}>Both essentials.</span>
            </h2>
            <p className="font-body mt-4 max-w-md" style={{ fontSize: '15.5px', lineHeight: 1.55, color: '#2A2A2A' }}>
              Every ingredient dosed at clinically effective levels. No proprietary blends. No filler.
            </p>
          </div>
          <Link to="/shop" className="btn-secondary hidden md:inline-flex shadow-pop">
            View All
            <ArrowRight size={16} />
          </Link>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {featured.map((product) => (
            <motion.div key={product.id} variants={fadeUp}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-8 text-center md:hidden">
          <Link to="/shop" className="btn-secondary">
            View All Products
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ScienceSection() {
  const featuredStudies = site.studies.slice(0, 3);

  return (
    <section className="section-padding relative overflow-hidden" style={{ backgroundColor: '#F7F5F0' }}>
      <span className="absolute pointer-events-none" style={{ top: '14%', right: '10%', fontSize: 20, color: '#0A0A0A', opacity: 0.25 }} aria-hidden>✦</span>

      <div className="container-main relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-14"
        >
          <div
            className="brand-stamp shadow-pop tilt-r mb-5 inline-flex"
            style={{
              backgroundColor: '#0A0A0A',
              color: '#fff',
              padding: '6px 13px',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.12em',
            }}
          >
            ✦ THE SCIENCE ✦
          </div>
          <h2
            className="font-display"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.04em', color: '#0A0A0A' }}
          >
            We don&apos;t claim — we{' '}
            <span style={{ color: '#0A0A0A', fontStyle: 'italic' }}>cite.</span>
          </h2>
          <p className="font-body max-w-xl mx-auto mt-5" style={{ fontSize: '15.5px', color: '#2A2A2A', lineHeight: 1.55 }}>
            Every ingredient is linked to peer-reviewed human clinical trials.
            No rodent studies. No retracted papers. Just real science.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-5 md:gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {featuredStudies.map((study, i) => {
            const tilts = ['rotate(-1.5deg)', 'rotate(1deg)', 'rotate(-1deg)'];
            return (
              <motion.div
                key={study.id}
                variants={fadeUp}
                style={{ transform: tilts[i % 3] }}
              >
                <StudyCard study={study} />
              </motion.div>
            );
          })}
        </motion.div>

        <div className="text-center mt-10">
          <Link to="/science" className="btn-secondary shadow-pop">
            View All Studies
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function FounderSection() {
  return (
    <section className="section-padding relative overflow-hidden" style={{ backgroundColor: '#FFFFFF' }}>
      {/* Sparkles + ornaments */}
      <span className="absolute pointer-events-none" style={{ top: '8%', right: '6%', fontSize: 22, color: '#0A0A0A', opacity: 0.25 }} aria-hidden>✦</span>
      <span className="absolute pointer-events-none" style={{ bottom: '15%', left: '6%', fontSize: 16, color: '#0A0A0A', opacity: 0.2 }} aria-hidden>✦</span>

      <div className="container-main relative">
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Polaroid-style frame, slight tilt */}
            <div
              className="polaroid relative"
              style={{
                transform: 'rotate(-2deg)',
                padding: '14px 14px 28px',
                maxWidth: '440px',
              }}
            >
              <div
                className="overflow-hidden rounded-sm"
                style={{ aspectRatio: '4/5', backgroundColor: 'var(--color-border-subtle)' }}
              >
                <img
                  src={site.brand.founderPortrait}
                  alt={`${site.brand.founderName} — Founder portrait`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center mt-3">
                <p className="font-body italic" style={{ fontSize: '13px', color: '#0A0A0A' }}>
                  &mdash; {site.brand.founderName}, founder
                </p>
              </div>
              {/* Sticker overlay */}
              <span
                className="absolute font-body font-bold uppercase shadow-pop"
                style={{
                  top: '-12px',
                  right: '-10px',
                  backgroundColor: '#0A0A0A',
                  color: '#fff',
                  fontSize: '10px',
                  letterSpacing: '0.1em',
                  padding: '5px 10px',
                  borderRadius: '999px',
                  transform: 'rotate(8deg)',
                  zIndex: 5,
                }}
              >
                ✦ FOUNDER
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="brand-stamp shadow-pop tilt-l mb-5 inline-flex"
              style={{
                backgroundColor: '#0A0A0A',
                color: '#fff',
                padding: '6px 13px',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.12em',
              }}
            >
              ✦ OUR STORY ✦
            </div>
            <h2
              className="font-display mb-6"
              style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.25rem)', fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.04em', color: '#0A0A0A' }}
            >
              Built by a scientist who was{' '}
              <span style={{ color: '#0A0A0A', fontStyle: 'italic' }}>tired of the hype.</span>
            </h2>
            <div
              className="font-body space-y-4 mb-7"
              style={{ fontSize: '15.5px', lineHeight: 1.65, color: '#2A2A2A' }}
            >
              {site.founderStoryShort.split('. ').slice(0, 4).map((s, i, arr) => (
                <p key={i}>
                  {s}{i < arr.length - 1 ? '.' : ''}
                </p>
              ))}
            </div>
            <Link to="/about" className="btn-secondary shadow-pop">
              Read Our Story
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ReviewsCarouselSection() {
  const featuredReviews = site.reviews.slice(0, 3);
  const avgRating = site.reviews.length
    ? site.reviews.reduce((s, r) => s + r.rating, 0) / site.reviews.length
    : 0;

  return (
    <section className="section-padding relative overflow-hidden" style={{ backgroundColor: '#FFFFFF' }}>
      <span className="absolute pointer-events-none" style={{ top: '12%', right: '8%', fontSize: 22, color: '#0A0A0A', opacity: 0.25 }} aria-hidden>✦</span>
      <span className="absolute pointer-events-none" style={{ bottom: '15%', left: '6%', fontSize: 16, color: '#0A0A0A', opacity: 0.2 }} aria-hidden>✦</span>

      <div className="container-main relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-14"
        >
          <div
            className="brand-stamp shadow-pop tilt-l mb-5 inline-flex"
            style={{
              backgroundColor: '#0A0A0A',
              color: '#fff',
              padding: '6px 13px',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.12em',
            }}
          >
            ✦ REAL HUMANS · REAL RESULTS ✦
          </div>
          <h2
            className="font-display mb-5"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.04em', color: '#0A0A0A' }}
          >
            What people{' '}
            <span style={{ color: '#0A0A0A', fontStyle: 'italic' }}>actually say.</span>
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} className="inline-flex items-center justify-center w-5 h-5" style={{ backgroundColor: '#00B67A' }}>
                  <Star size={12} fill="#FFFFFF" stroke="#FFFFFF" strokeWidth={0} />
                </span>
              ))}
            </div>
            <span className="font-display" style={{ fontSize: '20px', fontWeight: 700, color: '#0A0A0A' }}>
              {avgRating.toFixed(1)}/5
            </span>
            <span className="font-body" style={{ fontSize: '13px', color: '#6B6B6B' }}>
              · {site.reviews.length}+ verified
            </span>
          </div>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-5 md:gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {featuredReviews.map((review, i) => {
            const tilts = ['rotate(-1.5deg)', 'rotate(1deg)', 'rotate(-1deg)'];
            return (
              <motion.div key={review.id} variants={fadeUp} style={{ transform: tilts[i % 3] }} className="shadow-card rounded-2xl">
                <ReviewCard review={review} />
              </motion.div>
            );
          })}
        </motion.div>

        <div className="text-center mt-10">
          <Link to="/reviews" className="btn-secondary shadow-pop">
            Read All Reviews
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function SubscribeExplainerSection() {
  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="container-narrow text-center">
        <SectionLabel label="Subscribe & Save" />
        <h2 className="font-display mb-6" style={{ color: 'var(--color-text)' }}>
          Save 15% on every order. Cancel in one click.
        </h2>
        <p className="font-body mb-10" style={{ fontSize: '16px', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
          {site.promises.subscribeSave}. No hidden fees, no lock-in periods, no phone calls required.
          Skip a month, change your frequency, or cancel anytime from your account.
        </p>

        <motion.div
          className="grid sm:grid-cols-3 gap-6 mb-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { icon: <Sparkles size={20} />, title: '15% Off Every Order', desc: 'Automatic savings on every delivery' },
            { icon: <Truck size={20} />, title: 'Free Shipping', desc: 'All subscription orders ship free' },
            { icon: <CheckCircle2 size={20} />, title: 'Cancel Anytime', desc: 'One click from your account page' },
          ].map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="p-6 rounded-xl text-center"
              style={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)' }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3"
                style={{ backgroundColor: 'var(--color-border-subtle)', color: 'var(--color-text)' }}
              >
                {item.icon}
              </div>
              <h3 className="font-display mb-1" style={{ fontSize: '16px', color: 'var(--color-text)' }}>
                {item.title}
              </h3>
              <p className="font-body" style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <Link to="/shop" className="btn-primary">
          Start Saving
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}

function NewsletterSection() {
  return (
    <section className="py-16 md:py-20" style={{ backgroundColor: 'var(--color-accent)' }}>
      <div className="container-narrow text-center">
        <h2 className="font-display mb-4" style={{ color: 'var(--color-accent-fg)' }}>
          Stay in the loop
        </h2>
        <p className="font-body mb-8" style={{ fontSize: '15px', color: 'var(--color-accent-fg)', opacity: 0.8 }}>
          Get notified about new products, restocks, and the latest research summaries.
          No spam — we send about one email a month.
        </p>

        <form
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3.5 rounded-md font-body focus-ring outline-none"
            style={{
              fontSize: '14px',
              backgroundColor: 'var(--color-accent-fg)',
              color: 'var(--color-accent)',
              border: 'none',
            }}
          />
          <button
            type="submit"
            className="px-6 py-3.5 rounded-md font-body font-medium focus-ring transition-opacity hover:opacity-90"
            style={{
              fontSize: '14px',
              backgroundColor: 'var(--color-accent-fg)',
              color: 'var(--color-accent)',
            }}
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PressLogosSection />
      <CategoryPitchSection />
      <WhyUsSection />
      <FeaturedProductsSection />
      <ScienceSection />
      <FounderSection />
      <DailyStackSection />
      <ReviewsCarouselSection />
      <SubscribeExplainerSection />
      <NewsletterSection />
      <Footer />
    </>
  );
}
