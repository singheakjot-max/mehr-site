import { motion } from 'framer-motion';
import { site } from '@/content/site';
import { FlaskConical, ShieldCheck, Award, Users } from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';
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
    <section className="section-padding" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="container-main">
        <SectionLabel label="Quality Standards" />
        <h2 className="font-display text-center mb-4" style={{ color: 'var(--color-text)' }}>
          Built to pharmaceutical standards
        </h2>
        <p className="font-body text-center mb-12 max-w-lg mx-auto" style={{ fontSize: '15px', color: 'var(--color-text-muted)' }}>
          Most supplement companies outsource to the cheapest manufacturer. We hold our partners to standards usually reserved for drug production.
        </p>

        <motion.div
          className="grid md:grid-cols-2 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {standards.map((s) => (
            <motion.div
              key={s.title}
              variants={fadeUp}
              className="p-6 rounded-xl flex gap-5"
              style={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)' }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'var(--color-border-subtle)', color: 'var(--color-text)' }}
              >
                {s.icon}
              </div>
              <div>
                <h3 className="font-display mb-2" style={{ fontSize: '18px', color: 'var(--color-text)' }}>
                  {s.title}
                </h3>
                <p className="font-body" style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  {s.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <div className="pt-28">
      {/* Hero */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="container-main">
          <SectionLabel label="About" />
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            <div>
              <h1 className="font-display mb-6" style={{ color: 'var(--color-text)' }}>
                Built by scientists.<br />
                For people who read labels.
              </h1>
            </div>
            <div>
              <p className="font-body mb-4" style={{ fontSize: '16px', lineHeight: 1.7, color: 'var(--color-text-secondary)' }}>
                MEHR was started by a founder who refused to accept that peptides
                — among the most-studied compounds in modern human biology — should remain locked
                behind biohacker forums and sketchy international suppliers.
              </p>
              <p className="font-body" style={{ fontSize: '16px', lineHeight: 1.7, color: 'var(--color-text-secondary)' }}>
                Today, MEHR is on a mission to put pharmaceutical-grade peptides next to the multivitamin —
                clinically dosed, third-party tested, manufactured in the USA, and shipped within 24 hours.
                Every formula starts with the literature. Every batch is verified. Every label prints the truth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="container-main">
          <SectionLabel label="Founder" />
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            <div>
              <div
                className="rounded-2xl overflow-hidden mb-6"
                style={{ aspectRatio: '4/5', backgroundColor: 'var(--color-border-subtle)' }}
              >
                <img
                  src={site.brand.founderPortrait}
                  alt={`${site.brand.founderName} — Founder portrait, 3/4 view, warm neutral background, navy blazer, approachable professional expression, natural light`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-body font-medium" style={{ fontSize: '16px', color: 'var(--color-text)' }}>
                    {site.brand.founderName}
                  </p>
                  <p className="font-body" style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
                    {site.brand.founderTitle}
                  </p>
                </div>
              </div>
              <a
                href={`mailto:${site.promises.contactEmail}`}
                className="font-body flex items-center gap-2 mt-3 focus-ring transition-opacity hover:opacity-70"
                style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}
              >
                {site.promises.contactEmail}
              </a>
            </div>

            <div>
              <div
                className="font-body space-y-4"
                style={{ fontSize: '16px', lineHeight: 1.7, color: 'var(--color-text-secondary)' }}
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
