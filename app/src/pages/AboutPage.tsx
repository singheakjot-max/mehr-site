import { motion } from 'framer-motion';
import { site } from '@/content/site';
import { FlaskConical, ShieldCheck, Award, Users } from 'lucide-react';
// import SectionLabel from '@/components/SectionLabel';
import Footer from '@/components/global/Footer';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function QualityStandards() {
  const standards = [
    {
      icon: <FlaskConical size={22} />,
      title: 'Third-Party Testing',
      desc: 'Every batch is independently verified by ISO-accredited labs for identity, potency, purity, heavy metals, and microbiological contaminants.',
    },
    {
      icon: <ShieldCheck size={22} />,
      title: 'NSF-Certified Manufacturing',
      desc: 'Produced in FDA-registered, cGMP-compliant facilities that undergo regular third-party audits and NSF certification inspections.',
    },
    {
      icon: <Award size={22} />,
      title: 'USP-Grade Raw Materials',
      desc: 'We source pharmaceutical-grade ingredients with Certificates of Analysis from every supplier, verified with our own independent testing.',
    },
    {
      icon: <Users size={22} />,
      title: 'Expert Formulation',
      desc: 'Our formulas are developed by PhDs in pharmacology and registered dietitians using systematic literature review methodology.',
    },
  ];

  return (
    <section className="section-padding relative overflow-hidden" style={{ backgroundColor: '#FAF3F4' }}>
      <span className="absolute pointer-events-none" style={{ top: '12%', right: '8%', fontSize: 22, color: '#6B1F2A', opacity: 0.5 }} aria-hidden>✦</span>
      <span className="absolute pointer-events-none" style={{ top: '40%', left: '6%', fontSize: 16, color: '#6B1F2A', opacity: 0.4 }} aria-hidden>✦</span>
      <span className="absolute pointer-events-none" style={{ bottom: '15%', left: '40%', fontSize: 14, color: '#6B1F2A', opacity: 0.4 }} aria-hidden>✦</span>

      <div className="container-main relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div
            className="brand-stamp shadow-pop tilt-r mb-5 inline-flex"
            style={{
              backgroundColor: '#6B1F2A',
              color: '#fff',
              padding: '6px 13px',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.12em',
            }}
          >
            ✦ QUALITY STANDARDS ✦
          </div>
          <h2
            className="font-display"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.04em', color: '#0A0A0A' }}
          >
            Built to{' '}
            <span style={{ color: '#6B1F2A', fontStyle: 'italic' }}>pharmaceutical</span>{' '}
            standards.
          </h2>
          <p className="font-body text-center max-w-lg mx-auto mt-5" style={{ fontSize: '15.5px', color: '#2A2A2A', lineHeight: 1.55 }}>
            Most supplement companies outsource to the cheapest manufacturer.
            We hold our partners to standards usually reserved for drug production.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-5 md:gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {standards.map((s, i) => {
            const tilts = ['rotate(-1.5deg)', 'rotate(1deg)', 'rotate(-1deg)', 'rotate(1.5deg)'];
            return (
              <motion.div
                key={s.title}
                variants={fadeUp}
                className="p-7 rounded-2xl flex gap-5 shadow-card relative"
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid rgba(107, 31, 42, 0.15)',
                  transform: tilts[i % 4],
                }}
              >
                <span
                  className="absolute font-body font-bold uppercase shadow-pop"
                  style={{
                    top: '-12px',
                    left: '20px',
                    backgroundColor: '#6B1F2A',
                    color: '#fff',
                    fontSize: '10px',
                    letterSpacing: '0.1em',
                    padding: '4px 9px',
                    borderRadius: '999px',
                  }}
                >
                  0{i + 1} / 0{standards.length}
                </span>
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-pop"
                  style={{ backgroundColor: '#6B1F2A', color: '#fff' }}
                >
                  {s.icon}
                </div>
                <div>
                  <h3 className="font-display mb-2" style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.02em', color: '#0A0A0A' }}>
                    {s.title}
                  </h3>
                  <p className="font-body" style={{ fontSize: '14px', color: '#2A2A2A', lineHeight: 1.55 }}>
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <div>
      {/* Hero — color flooded with personality */}
      <section
        className="pt-8 md:pt-12 pb-10 md:pb-14 relative overflow-hidden"
        style={{ backgroundColor: '#FAF3F4' }}
      >
        <span className="absolute pointer-events-none hidden md:block" style={{ top: '12%', left: '8%', fontSize: 22, color: '#6B1F2A', opacity: 0.55, zIndex: 1 }} aria-hidden>✦</span>
        <span className="absolute pointer-events-none hidden md:block" style={{ top: '40%', right: '10%', fontSize: 18, color: '#6B1F2A', opacity: 0.5, zIndex: 1 }} aria-hidden>✦</span>
        <span className="absolute pointer-events-none hidden md:block" style={{ bottom: '20%', left: '40%', fontSize: 14, color: '#6B1F2A', opacity: 0.4, zIndex: 1 }} aria-hidden>✦</span>

        <div className="container-main relative" style={{ zIndex: 2 }}>
          <div
            className="brand-stamp shadow-pop tilt-r mb-6 inline-flex"
            style={{
              backgroundColor: '#6B1F2A',
              color: '#fff',
              fontSize: '11px',
              fontWeight: 900,
              padding: '6px 13px',
              letterSpacing: '0.1em',
            }}
          >
            ✦ ABOUT MEHR ✦
          </div>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            <div>
              <h1 className="font-display" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.75rem)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.04em', color: '#0A0A0A' }}>
                Built by{' '}
                <span style={{ color: '#6B1F2A', fontStyle: 'italic' }}>scientists.</span>
                <br />
                For people who{' '}
                <span style={{ color: '#6B1F2A', fontStyle: 'italic' }}>read labels.</span>
              </h1>
            </div>
            <div>
              <p className="font-body mb-4" style={{ fontSize: '15.5px', lineHeight: 1.6, color: '#2A2A2A' }}>
                MEHR was started by a founder who refused to accept that peptides
                — among the most-studied compounds in modern human biology — should remain locked
                behind biohacker forums and sketchy international suppliers.
              </p>
              <p className="font-body" style={{ fontSize: '15.5px', lineHeight: 1.6, color: '#2A2A2A' }}>
                Today, MEHR puts pharmaceutical-grade peptides next to the multivitamin —
                clinically dosed, third-party tested, made in the USA, shipped in 24 hours.
                Every formula starts with the literature. Every batch is verified. Every label prints the truth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder — navy soft */}
      <section className="section-padding relative overflow-hidden" style={{ backgroundColor: '#F2F4FA' }}>
        <span className="absolute pointer-events-none" style={{ top: '8%', left: '8%', fontSize: 22, color: '#1E2F6B', opacity: 0.5 }} aria-hidden>✦</span>
        <span className="absolute pointer-events-none" style={{ bottom: '15%', right: '10%', fontSize: 16, color: '#1E2F6B', opacity: 0.4 }} aria-hidden>✦</span>

        <div className="container-main relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div
              className="brand-stamp shadow-pop tilt-l mb-5 inline-flex"
              style={{
                backgroundColor: '#1E2F6B',
                color: '#fff',
                padding: '6px 13px',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.12em',
              }}
            >
              ✦ THE FOUNDER ✦
            </div>
            <h2
              className="font-display max-w-4xl"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.04em', color: '#0A0A0A' }}
            >
              The story behind{' '}
              <span style={{ color: '#1E2F6B', fontStyle: 'italic' }}>the brand.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start">
            <div>
              {/* Polaroid frame portrait */}
              <div
                className="polaroid relative mb-5"
                style={{ transform: 'rotate(-2deg)', padding: '12px 12px 24px', maxWidth: '440px' }}
              >
                <div className="overflow-hidden rounded-sm" style={{ aspectRatio: '4/5', backgroundColor: 'var(--color-border-subtle)' }}>
                  <img
                    src={site.brand.founderPortrait}
                    alt={`${site.brand.founderName} — Founder portrait`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center mt-3">
                  <p className="font-body italic" style={{ fontSize: '13px', color: '#0A0A0A' }}>
                    &mdash; {site.brand.founderName}, {site.brand.founderTitle}
                  </p>
                </div>
                <span
                  className="absolute font-body font-bold uppercase shadow-pop"
                  style={{
                    top: '-12px',
                    right: '-10px',
                    backgroundColor: '#1E2F6B',
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
              <a
                href={`mailto:${site.promises.contactEmail}`}
                className="font-body flex items-center gap-2 mt-3 focus-ring transition-opacity hover:opacity-70"
                style={{ fontSize: '13px', color: '#1E2F6B', fontWeight: 600 }}
              >
                ✉ {site.promises.contactEmail}
              </a>
            </div>

            <div>
              <div
                className="font-body space-y-4"
                style={{ fontSize: '15.5px', lineHeight: 1.7, color: '#2A2A2A' }}
              >
                {site.founderStory.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <QualityStandards />
      <Footer />
    </div>
  );
}
