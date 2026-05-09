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
                  alt="mehr BPC-157 — premium frosted blue glass bottle with silver foil label, hero product photography"
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-4 text-center">
                <p className="font-display" style={{ fontSize: '16px', color: 'var(--color-text)' }}>
                  mehr BPC-157
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
        <SectionLabel label="Why mehr" />
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
  const avgRating = site.reviews.reduce((s, r) => s + r.rating, 0) / site.reviews.length;

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
      <WhyUsSection />
      <FeaturedProductsSection />
      <ScienceSection />
      <FounderSection />
      <ReviewsCarouselSection />
      <SubscribeExplainerSection />
      <NewsletterSection />
      <Footer />
    </>
  );
}
