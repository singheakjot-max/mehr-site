import { motion } from 'framer-motion';
import { site } from '@/content/site';
import StudyCard from '@/components/StudyCard';
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

export default function SciencePage() {
  return (
    <div>
      {/* Hero — Obvi-style color flood */}
      <section
        className="pt-8 md:pt-12 pb-10 md:pb-14 relative overflow-hidden"
        style={{ backgroundColor: '#FAF3F4' }}
      >
        {/* Sparkles */}
        <span className="absolute pointer-events-none hidden md:block" style={{ top: '15%', left: '10%', fontSize: 22, color: '#6B1F2A', opacity: 0.5, zIndex: 1 }} aria-hidden>✦</span>
        <span className="absolute pointer-events-none hidden md:block" style={{ top: '60%', right: '12%', fontSize: 18, color: '#6B1F2A', opacity: 0.5, zIndex: 1 }} aria-hidden>✦</span>
        <span className="absolute pointer-events-none hidden md:block" style={{ bottom: '20%', left: '40%', fontSize: 16, color: '#6B1F2A', opacity: 0.4, zIndex: 1 }} aria-hidden>✦</span>

        <div className="container-narrow text-center relative" style={{ zIndex: 2 }}>
          <div
            className="brand-stamp shadow-pop tilt-r mb-5 inline-flex"
            style={{
              backgroundColor: '#6B1F2A',
              color: '#fff',
              fontSize: '11px',
              fontWeight: 900,
              padding: '6px 13px',
              letterSpacing: '0.1em',
            }}
          >
            ✦ THE SCIENCE ✦
          </div>
          <h1 className="font-display mb-5" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.04em', color: '#0A0A0A' }}>
            Evidence{' '}
            <span style={{ color: '#6B1F2A', fontStyle: 'italic' }}>over marketing.</span>
          </h1>
          <p className="font-body mx-auto max-w-2xl" style={{ fontSize: '15.5px', lineHeight: 1.6, color: '#2A2A2A' }}>
            Every ingredient is linked to peer-reviewed human clinical trials.
            We prioritize randomized controlled trials, systematic reviews, and meta-analyses.
            No rodent studies. No retracted papers. No industry-funded conflicts.
          </p>
        </div>
      </section>

      {/* Studies Grid */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="container-main">
          <SectionLabel label="Clinical Evidence" />
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {site.studies.map((study) => (
              <motion.div key={study.id} variants={fadeUp}>
                <StudyCard study={study} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Methodology */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="container-main">
          <SectionLabel label="Our Methodology" />
          <h2 className="font-display text-center mb-4" style={{ color: 'var(--color-text)' }}>
            How we evaluate ingredients
          </h2>
          <p className="font-body text-center mb-12 max-w-lg mx-auto" style={{ fontSize: '15px', color: 'var(--color-text-muted)' }}>
            Our 5-step evaluation process ensures only ingredients with robust human evidence make it into our formulas.
          </p>

          <div className="max-w-3xl mx-auto">
            {site.methodologySteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-display font-medium"
                    style={{
                      backgroundColor: 'var(--color-accent)',
                      color: 'var(--color-accent-fg)',
                      fontSize: '15px',
                    }}
                  >
                    {step.step}
                  </div>
                  {i < site.methodologySteps.length - 1 && (
                    <div
                      className="w-px flex-1 mt-2"
                      style={{ backgroundColor: 'var(--color-border)' }}
                    />
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="font-display mb-2" style={{ fontSize: '18px', color: 'var(--color-text)' }}>
                    {step.title}
                  </h3>
                  <p className="font-body" style={{ fontSize: '15px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testing Process */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="container-main">
          <SectionLabel label="Testing Process" />
          <h2 className="font-display text-center mb-4" style={{ color: 'var(--color-text)' }}>
            5-step quality assurance
          </h2>
          <p className="font-body text-center mb-12 max-w-lg mx-auto" style={{ fontSize: '15px', color: 'var(--color-text-muted)' }}>
            Every batch undergoes comprehensive analytical testing before it reaches your door.
          </p>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {site.testingProcess.map((step) => (
              <motion.div
                key={step.step}
                variants={fadeUp}
                className="p-6 rounded-xl text-center"
                style={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)' }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-display"
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    color: 'var(--color-accent-fg)',
                    fontSize: '18px',
                  }}
                >
                  {step.step}
                </div>
                <h3 className="font-display mb-2" style={{ fontSize: '16px', color: 'var(--color-text)' }}>
                  {step.title}
                </h3>
                <p className="font-body" style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
