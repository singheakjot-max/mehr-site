import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { site } from '@/content/site';
import { ChevronDown } from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';
import Footer from '@/components/global/Footer';

const categories = [
  { key: 'all', label: 'All Questions' },
  { key: 'subscription', label: 'Subscriptions' },
  { key: 'shipping', label: 'Shipping' },
  { key: 'general', label: 'General' },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered =
    activeCategory === 'all'
      ? site.faqs
      : site.faqs.filter((f) => f.category === activeCategory);

  return (
    <div className="pt-28 pb-20">
      <div className="container-narrow">
        <SectionLabel label="FAQ" />

        <div className="text-center mb-12">
          <h1 className="font-display mb-4" style={{ color: 'var(--color-text)' }}>
            Frequently Asked Questions
          </h1>
          <p className="font-body" style={{ fontSize: '16px', color: 'var(--color-text-muted)' }}>
            Everything you need to know about our products, subscriptions, and shipping.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className="font-body px-4 py-2 rounded-md transition-all focus-ring"
              style={{
                fontSize: '13px',
                fontWeight: activeCategory === cat.key ? 500 : 400,
                backgroundColor: activeCategory === cat.key ? 'var(--color-accent)' : 'transparent',
                color: activeCategory === cat.key ? 'var(--color-accent-fg)' : 'var(--color-text)',
                border: activeCategory === cat.key ? 'none' : '1px solid var(--color-border)',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Questions */}
        <div className="space-y-3">
          <AnimatePresence mode="wait">
            {filtered.map((faq) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <div
                  className="rounded-lg overflow-hidden"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <button
                    onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                    className="w-full flex items-center justify-between p-5 text-left focus-ring"
                    aria-expanded={openId === faq.id}
                  >
                    <span
                      className="font-body font-medium pr-4"
                      style={{ fontSize: '15px', color: 'var(--color-text)' }}
                    >
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={18}
                      className="flex-shrink-0 transition-transform"
                      style={{
                        color: 'var(--color-text-muted)',
                        transform: openId === faq.id ? 'rotate(180deg)' : 'none',
                      }}
                    />
                  </button>
                  <AnimatePresence>
                    {openId === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div
                          className="px-5 pb-5 pt-0 font-body"
                          style={{
                            fontSize: '15px',
                            lineHeight: 1.7,
                            color: 'var(--color-text-muted)',
                            borderTop: '1px solid var(--color-border-subtle)',
                            paddingTop: '16px',
                            margin: '0 20px',
                          }}
                        >
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <p className="font-body text-center py-12" style={{ color: 'var(--color-text-muted)' }}>
            No questions found in this category.
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
}
