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
import TrustStrip from '@/components/TrustStrip';
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
    <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-soft)' }}>
      <div className="container-main">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] mb-5"
            style={{ color: 'var(--color-text-muted)' }}
          >
            A new category
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="font-display mb-8"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', letterSpacing: '-0.025em', lineHeight: 1.1, color: 'var(--color-text-strong)' }}
          >
            The world's first daily<br />foundational <em style={{ fontStyle: 'italic' }}>peptides.</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-body mx-auto"
            style={{ fontSize: 'clamp(1rem, 1.4vw, 1.125rem)', lineHeight: 1.7, color: 'var(--color-text-secondary)', maxWidth: '52ch' }}
          >
            Peptides used to live in two places: research labs and biohacker forums. We made
            them as simple to take as a vitamin — pharmaceutical-grade, clinically dosed,
            third-party tested, and shipped from the USA in 24 hours.
          </motion.p>
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
            Two peptides. One <em style={{ fontStyle: 'italic' }}>morning ritual.</em>
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
    <section className="relative min-h-[90vh] flex items-center pt-20" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container-main w-full">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
              style={{ backgroundColor: 'var(--color-border-subtle)' }}
            >
              <Sparkles size={14} style={{ color: 'var(--color-text-muted)' }} />
              <span className="font-body uppercase tracking-widest" style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                The world&rsquo;s first daily peptides
              </span>
            </div>

            <h1 className="font-display mb-6" style={{ fontSize: 'clamp(2.75rem, 6vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--color-text)' }}>
              Peptides.<br /><em style={{ fontStyle: 'italic', fontWeight: 600 }}>Now daily.</em>
            </h1>

            <p className="font-body mb-8 max-w-md" style={{ fontSize: '17px', lineHeight: 1.6, color: 'var(--color-text-muted)' }}>
              Foundational health, evolved. Pharmaceutical-grade peptides made as easy as a daily vitamin.
              Made in the USA. Shipped in 24 hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link to="/shop" className="btn-primary">
                Shop the daily essentials
                <ArrowRight size={16} />
              </Link>
              <Link to="/science" className="btn-secondary">
                Why peptides?
              </Link>
            </div>

            <TrustStrip size="sm" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative"
          >
            <Link to="/products/bpc-157" className="block group">
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  aspectRatio: '4/5',
                  backgroundColor: '#FFFFFF',
                }}
              >
                <img
                  src="/images/bpc/bpc_front_bottle.webp"
                  alt="MEHR BPC-157 — premium frosted blue glass bottle with silver foil label, hero product photography"
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-4 text-center">
                <p className="font-display" style={{ fontSize: '16px', color: 'var(--color-text)' }}>
                  MEHR BPC-157
                </p>
                <p className="font-body" style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
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
    <section className="section-padding" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container-main">
        <SectionLabel label="Why MEHR" />
        <motion.div
          className="grid md:grid-cols-3 gap-8 md:gap-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {site.whyUsCards.map((card) => (
            <motion.div
              key={card.headline}
              variants={fadeUp}
              className="text-center p-8 rounded-xl"
              style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ backgroundColor: 'var(--color-border-subtle)', color: 'var(--color-text)' }}
              >
                {iconMap[card.icon]}
              </div>
              <h3 className="font-display mb-3" style={{ fontSize: '20px', color: 'var(--color-text)' }}>
                {card.headline}
              </h3>
              <p className="font-body" style={{ fontSize: '15px', lineHeight: 1.6, color: 'var(--color-text-muted)' }}>
                {card.proof}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedProductsSection() {
  const featured = site.products.slice(0, 4);

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="container-main">
        <SectionLabel label="Featured Products" />
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display mb-2" style={{ color: 'var(--color-text)' }}>
              Formulas backed by evidence
            </h2>
            <p className="font-body" style={{ fontSize: '16px', color: 'var(--color-text-muted)' }}>
              Every ingredient dosed at clinically effective levels. No proprietary blends.
            </p>
          </div>
          <Link
            to="/shop"
            className="btn-secondary hidden md:inline-flex"
          >
            View All
            <ArrowRight size={16} />
          </Link>
        </div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
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
    <section className="section-padding" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container-main">
        <SectionLabel label="The Science" />
        <div className="text-center mb-12">
          <h2 className="font-display mb-4" style={{ color: 'var(--color-text)' }}>
            We don&apos;t claim — we cite
          </h2>
          <p className="font-body max-w-xl mx-auto" style={{ fontSize: '16px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
            Every ingredient in every product is linked to peer-reviewed human clinical trials.
            No rodent studies passed off as human evidence. No retracted papers. Just real science.
          </p>
        </div>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {featuredStudies.map((study) => (
            <motion.div key={study.id} variants={fadeUp}>
              <StudyCard study={study} />
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-10">
          <Link to="/science" className="btn-secondary">
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
    <section className="section-padding" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="container-main">
        <SectionLabel label="Our Story" />
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                aspectRatio: '4/5',
                backgroundColor: 'var(--color-border-subtle)',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <img
                src={site.brand.founderPortrait}
                alt={`${site.brand.founderName} — Founder portrait, 3/4 view, warm neutral background, wearing a navy blazer, professional but approachable expression, natural light from left`}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display mb-6" style={{ color: 'var(--color-text)' }}>
              Built by a scientist<br />who was tired of the hype.
            </h2>
            <div
              className="font-body space-y-4 mb-8"
              style={{ fontSize: '16px', lineHeight: 1.7, color: 'var(--color-text-secondary)' }}
            >
              {site.founderStoryShort.split('. ').slice(0, 4).map((s, i, arr) => (
                <p key={i}>
                  {s}{i < arr.length - 1 ? '.' : ''}
                </p>
              ))}
            </div>
            <Link to="/about" className="btn-secondary">
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
    <section className="section-padding" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container-main">
        <SectionLabel label="Customer Reviews" />
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star size={24} fill="var(--color-star)" stroke="var(--color-star)" />
            <span className="font-display" style={{ fontSize: '28px', color: 'var(--color-text)' }}>
              {avgRating.toFixed(1)}
            </span>
          </div>
          <p className="font-body" style={{ fontSize: '15px', color: 'var(--color-text-muted)' }}>
            Based on {site.reviews.length}+ verified reviews
          </p>
        </div>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {featuredReviews.map((review) => (
            <motion.div key={review.id} variants={fadeUp}>
              <ReviewCard review={review} />
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-10">
          <Link to="/reviews" className="btn-secondary">
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
