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
    <div className="pt-28">
      {/* Hero */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="container-narrow text-center">
          <SectionLabel label="Science" />
          <h1 className="font-display mb-6" style={{ color: 'var(--color-text)' }}>
            Evidence over marketing.
          </h1>
          <p className="font-body" style={{ fontSize: '16px', lineHeight: 1.7, color: 'var(--color-text-muted)' }}>
            Every ingredient in every product is linked to peer-reviewed human clinical trials.
            We prioritize randomized controlled trials, systematic reviews, and meta-analyses.
            No rodent studies. No retracted papers. No industry-funded studies with conflicts of interest.
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
