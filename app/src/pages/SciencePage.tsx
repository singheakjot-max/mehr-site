import { motion } from 'framer-motion';
import { site } from '@/content/site';
import StudyCard from '@/components/StudyCard';
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

      {/* Studies Grid — black flood */}
      <section className="section-padding relative overflow-hidden" style={{ backgroundColor: '#0A0A0A', color: '#fff' }}>
        <span className="absolute pointer-events-none" style={{ top: '8%', left: '8%', fontSize: 22, color: '#FFD700', opacity: 0.55 }} aria-hidden>✦</span>
        <span className="absolute pointer-events-none" style={{ top: '40%', right: '8%', fontSize: 16, color: '#fff', opacity: 0.4 }} aria-hidden>✦</span>
        <span className="absolute pointer-events-none" style={{ bottom: '15%', left: '40%', fontSize: 14, color: '#fff', opacity: 0.4 }} aria-hidden>✦</span>

        <div className="container-main relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-14"
          >
            <div
              className="brand-stamp shadow-deep tilt-l mb-5 inline-flex"
              style={{
                backgroundColor: '#FFD700',
                color: '#0A0A0A',
                padding: '6px 13px',
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.12em',
              }}
            >
              ✦ THE PROOF ✦
            </div>
            <h2
              className="font-display"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.04em', color: '#fff' }}
            >
              Studies, not{' '}
              <span style={{ color: '#FFD700', fontStyle: 'italic' }}>vibes.</span>
            </h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {site.studies.map((study, i) => {
              const tilts = ['rotate(-1.5deg)', 'rotate(1deg)', 'rotate(-1deg)'];
              return (
                <motion.div key={study.id} variants={fadeUp} style={{ transform: tilts[i % 3] }} className="shadow-deep">
                  <StudyCard study={study} />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Methodology — burgundy soft */}
      <section className="section-padding relative overflow-hidden" style={{ backgroundColor: '#FAF3F4' }}>
        <span className="absolute pointer-events-none" style={{ top: '15%', right: '10%', fontSize: 20, color: '#6B1F2A', opacity: 0.5 }} aria-hidden>✦</span>
        <span className="absolute pointer-events-none" style={{ bottom: '20%', left: '6%', fontSize: 16, color: '#6B1F2A', opacity: 0.4 }} aria-hidden>✦</span>

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
              ✦ HOW WE PICK INGREDIENTS ✦
            </div>
            <h2
              className="font-display"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.04em', color: '#0A0A0A' }}
            >
              Five filters before{' '}
              <span style={{ color: '#6B1F2A', fontStyle: 'italic' }}>anything</span>{' '}
              makes it in.
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {site.methodologySteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-5 mb-7 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-display shadow-pop"
                    style={{
                      backgroundColor: '#6B1F2A',
                      color: '#fff',
                      fontSize: '17px',
                      fontWeight: 700,
                    }}
                  >
                    {step.step}
                  </div>
                  {i < site.methodologySteps.length - 1 && (
                    <div
                      className="w-0.5 flex-1 mt-2"
                      style={{ backgroundColor: '#6B1F2A', opacity: 0.25 }}
                    />
                  )}
                </div>
                <div className="pb-7">
                  <h3 className="font-display mb-2" style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.02em', color: '#0A0A0A' }}>
                    {step.title}
                  </h3>
                  <p className="font-body" style={{ fontSize: '15px', color: '#2A2A2A', lineHeight: 1.55 }}>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testing Process — white with cards */}
      <section className="section-padding relative overflow-hidden" style={{ backgroundColor: '#FFFFFF' }}>
        <span className="absolute pointer-events-none" style={{ top: '12%', left: '8%', fontSize: 18, color: '#0A0A0A', opacity: 0.25 }} aria-hidden>✦</span>

        <div className="container-main relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
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
              ✦ TESTING PROCESS ✦
            </div>
            <h2
              className="font-display"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.04em', color: '#0A0A0A' }}
            >
              Five tests before{' '}
              <span style={{ color: '#6B1F2A', fontStyle: 'italic' }}>your door.</span>
            </h2>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {site.testingProcess.map((step, i) => {
              const tilts = ['rotate(-1.5deg)', 'rotate(1deg)', 'rotate(-1deg)', 'rotate(1.5deg)', 'rotate(-1deg)'];
              return (
                <motion.div
                  key={step.step}
                  variants={fadeUp}
                  className="p-6 rounded-2xl text-center shadow-card"
                  style={{
                    backgroundColor: '#FAF3F4',
                    border: '1px solid rgba(107, 31, 42, 0.15)',
                    transform: tilts[i % 5],
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-display shadow-pop"
                    style={{
                      backgroundColor: '#6B1F2A',
                      color: '#fff',
                      fontSize: '17px',
                      fontWeight: 700,
                    }}
                  >
                    {step.step}
                  </div>
                  <h3 className="font-display mb-2" style={{ fontSize: '17px', fontWeight: 700, letterSpacing: '-0.02em', color: '#0A0A0A' }}>
                    {step.title}
                </h3>
                <p className="font-body" style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                  {step.description}
                </p>
              </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
