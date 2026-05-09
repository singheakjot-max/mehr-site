import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { site } from '@/content/site';
import type { Product } from '@/types';
import {
  Minus,
  Plus,
  CheckCircle2,
  FileText,
  Star,
  ChevronRight,
  X,
} from 'lucide-react';
import StarRating from '@/components/StarRating';
import ReviewCard from '@/components/ReviewCard';
import COAModal from '@/components/COAModal';
import ProductCard from '@/components/ProductCard';
import TrustStrip from '@/components/TrustStrip';
import SectionLabel from '@/components/SectionLabel';
import Footer from '@/components/global/Footer';

interface ProductDetailPageProps {
  onAddToCart: (productId: string, quantity: number, subscription: boolean) => void;
  cartCount: number;
}

function Breadcrumbs({ product }: { product: Product }) {
  return (
    <nav className="container-main pt-28 pb-6">
      <ol className="flex items-center gap-2 font-body" style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
        <li><Link to="/" className="hover:opacity-60 transition-opacity">Home</Link></li>
        <li><ChevronRight size={14} /></li>
        <li><Link to="/shop" className="hover:opacity-60 transition-opacity">Shop</Link></li>
        <li><ChevronRight size={14} /></li>
        <li style={{ color: 'var(--color-text)' }}>{product.name}</li>
      </ol>
    </nav>
  );
}

function ProductHero({ product, onAddToCart }: { product: Product; onAddToCart: (productId: string, quantity: number, subscription: boolean) => void }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [subscription, setSubscription] = useState(false);
  const [showCOA, setShowCOA] = useState(false);

  const avgRating = product.reviews.length > 0
    ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length
    : 0;

  return (
    <>
      <div className="container-main pb-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image Gallery */}
          <div>
            <div
              className="rounded-xl overflow-hidden mb-4"
              style={{ aspectRatio: '4/5', backgroundColor: 'var(--color-surface-raised)' }}
            >
              <img
                src={product.gallery[selectedImage]}
                alt={`${product.name} — Product image ${selectedImage + 1} of ${product.gallery.length}, ${product.tagline}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-3">
              {product.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className="rounded-lg overflow-hidden flex-shrink-0 focus-ring transition-all"
                  style={{
                    width: 72,
                    height: 72,
                    border: selectedImage === i ? '2px solid var(--color-accent)' : '2px solid var(--color-border)',
                    opacity: selectedImage === i ? 1 : 0.6,
                  }}
                  aria-label={`View image ${i + 1}`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:pt-4">
            <div className="flex items-center gap-2 mb-3">
              <span
                className="font-body px-2.5 py-1 rounded-full"
                style={{
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  backgroundColor: 'var(--color-border-subtle)',
                  color: 'var(--color-text-muted)',
                }}
              >
                {product.goal}
              </span>
            </div>

            <h1 className="font-display mb-2" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: 'var(--color-text)' }}>
              {product.name}
            </h1>

            <p className="font-body mb-4" style={{ fontSize: '16px', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
              {product.tagline}
            </p>

            <div className="mb-6">
              {avgRating > 0 && (
                <StarRating rating={avgRating} size={16} showValue reviewCount={product.reviews.length} />
              )}
            </div>

            <div className="mb-6 pb-6" style={{ borderBottom: '1px solid var(--color-border)' }}>
              <div className="flex items-baseline gap-3">
                <span className="font-display" style={{ fontSize: '28px', color: 'var(--color-text)' }}>
                  ${subscription ? product.subscriptionPrice.toFixed(2) : product.price.toFixed(2)}
                </span>
                {subscription && (
                  <span className="font-body line-through" style={{ fontSize: '16px', color: 'var(--color-text-subtle)' }}>
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
              {subscription ? (
                <p className="font-body mt-1" style={{ fontSize: '13px', color: 'var(--color-success)' }}>
                  Subscribe & Save {product.subscriptionDiscount}%
                </p>
              ) : (
                <p className="font-body mt-1" style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                  or ${product.subscriptionPrice.toFixed(2)}/mo with subscription
                </p>
              )}
            </div>

            {/* Subscribe Toggle */}
            <div className="mb-6">
              <button
                onClick={() => setSubscription(!subscription)}
                className="w-full p-4 rounded-lg border-2 text-left transition-all focus-ring"
                style={{
                  borderColor: subscription ? 'var(--color-accent)' : 'var(--color-border)',
                  backgroundColor: subscription ? 'var(--color-surface)' : 'transparent',
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                      style={{
                        borderColor: subscription ? 'var(--color-accent)' : 'var(--color-border)',
                        backgroundColor: subscription ? 'var(--color-accent)' : 'transparent',
                      }}
                    >
                      {subscription && (
                        <CheckCircle2 size={14} style={{ color: 'var(--color-accent-fg)' }} />
                      )}
                    </div>
                    <div>
                      <p className="font-body font-medium" style={{ fontSize: '15px', color: 'var(--color-text)' }}>
                        Subscribe & Save {product.subscriptionDiscount}%
                      </p>
                      <p className="font-body" style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                        {site.promises.subscribeSave}
                      </p>
                    </div>
                  </div>
                  <span className="font-body font-medium" style={{ fontSize: '14px', color: 'var(--color-success)' }}>
                    -${(product.price - product.subscriptionPrice).toFixed(2)}
                  </span>
                </div>
              </button>
              {!subscription && (
                <p className="font-body mt-2 ml-4" style={{ fontSize: '12px', color: 'var(--color-text-subtle)' }}>
                  One-time purchase selected. Toggle above to subscribe.
                </p>
              )}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <div
                className="flex items-center rounded-lg border overflow-hidden"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-black/5 transition-colors focus-ring"
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} style={{ color: 'var(--color-text)' }} />
                </button>
                <span className="font-body w-12 text-center" style={{ fontSize: '15px', color: 'var(--color-text)' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-black/5 transition-colors focus-ring"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} style={{ color: 'var(--color-text)' }} />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={() => onAddToCart(product.id, quantity, subscription)}
              className="btn-primary w-full py-4 mb-4"
            >
              Add to Cart — ${(subscription ? product.subscriptionPrice : product.price) * quantity}
            </button>

            <TrustStrip size="sm" />

            {/* COA */}
            <button
              onClick={() => setShowCOA(true)}
              className="flex items-center gap-2 mt-6 font-body focus-ring transition-opacity hover:opacity-70"
              style={{ fontSize: '13px', color: 'var(--color-text)' }}
            >
              <FileText size={16} />
              View Certificate of Analysis
              <span style={{ color: 'var(--color-text-muted)' }}>(PDF)</span>
            </button>

            {/* Payment icons */}
            <div className="flex items-center gap-3 mt-6 pt-6" style={{ borderTop: '1px solid var(--color-border)' }}>
              {['Visa', 'Mastercard', 'Amex', 'Discover', 'PayPal'].map((method) => (
                <span
                  key={method}
                  className="font-body"
                  style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <COAModal
        isOpen={showCOA}
        onClose={() => setShowCOA(false)}
        productName={product.name}
        coaUrl={product.coaUrl}
        coaLabel={product.coaLabel}
      />
    </>
  );
}

function ProductTabs({ product }: { product: Product }) {
  const [activeTab, setActiveTab] = useState<'benefits' | 'ingredients' | 'how-to-use' | 'faq'>('benefits');
  const productFaqs = site.faqs.filter((f) => product.faqIds.includes(f.id));

  return (
    <section className="container-main py-16">
      <div className="flex flex-wrap gap-2 mb-10">
        {([
          { key: 'benefits' as const, label: 'Benefits' },
          { key: 'ingredients' as const, label: 'Ingredients' },
          { key: 'how-to-use' as const, label: 'How to Use' },
          { key: 'faq' as const, label: 'FAQ' },
        ]).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className="font-body px-5 py-2.5 rounded-md transition-all focus-ring"
            style={{
              fontSize: '14px',
              fontWeight: activeTab === tab.key ? 500 : 400,
              backgroundColor: activeTab === tab.key ? 'var(--color-accent)' : 'transparent',
              color: activeTab === tab.key ? 'var(--color-accent-fg)' : 'var(--color-text)',
              border: activeTab === tab.key ? 'none' : '1px solid var(--color-border)',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'benefits' && (
            <div className="grid md:grid-cols-2 gap-4">
              {product.benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-lg" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                  <CheckCircle2 size={20} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--color-success)' }} />
                  <p className="font-body" style={{ fontSize: '15px', color: 'var(--color-text)' }}>{benefit}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div className="space-y-6">
              {product.ingredients.map((ing, i) => (
                <div key={i} className="p-6 rounded-lg" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                  <div className="flex items-baseline justify-between mb-2">
                    <h4 className="font-display" style={{ fontSize: '18px', color: 'var(--color-text)' }}>
                      {ing.name}
                    </h4>
                    <span className="font-body font-medium" style={{ fontSize: '14px', color: 'var(--color-success)' }}>
                      {ing.amount}
                    </span>
                  </div>
                  <p className="font-body mb-3" style={{ fontSize: '15px', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
                    {ing.description}
                  </p>
                  <a
                    href={ing.studyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body flex items-center gap-1.5 focus-ring transition-opacity hover:opacity-70"
                    style={{ fontSize: '13px', color: 'var(--color-text)', fontWeight: 500 }}
                  >
                    <FileText size={14} />
                    {ing.studyRef}
                  </a>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'how-to-use' && (
            <div className="max-w-2xl">
              <p className="font-body mb-6" style={{ fontSize: '16px', lineHeight: 1.7, color: 'var(--color-text-secondary)' }}>
                {product.howToUse}
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: 'Serving Size', value: product.servingSize },
                  { label: 'Servings Per Container', value: product.servingsPerContainer.toString() },
                  { label: 'Best Time to Take', value: 'See product label' },
                  { label: 'Storage', value: 'Cool, dry place' },
                ].map((item) => (
                  <div key={item.label} className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                    <p className="font-body" style={{ fontSize: '12px', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {item.label}
                    </p>
                    <p className="font-body font-medium mt-1" style={{ fontSize: '15px', color: 'var(--color-text)' }}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-4 max-w-2xl">
              {productFaqs.length > 0 ? (
                productFaqs.map((faq) => (
                  <div key={faq.id} className="p-5 rounded-lg" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                    <h4 className="font-display mb-2" style={{ fontSize: '16px', color: 'var(--color-text)' }}>
                      {faq.question}
                    </h4>
                    <p className="font-body" style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--color-text-muted)' }}>
                      {faq.answer}
                    </p>
                  </div>
                ))
              ) : (
                <p className="font-body" style={{ color: 'var(--color-text-muted)' }}>
                  No FAQs available for this product yet.
                </p>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

function NumbersCallout({ product }: { product: Product }) {
  return (
    <section style={{ backgroundColor: 'var(--color-accent)' }}>
      <div className="container-main py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {product.numbersCallout.map((item) => (
            <div key={item.label}>
              <p className="font-display" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'var(--color-accent-fg)' }}>
                {item.value}
              </p>
              <p className="font-body mt-1" style={{ fontSize: '13px', color: 'var(--color-accent-fg)', opacity: 0.7 }}>
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparisonTable({ product }: { product: Product }) {
  return (
    <section className="container-main section-padding">
      <SectionLabel label="How We Compare" />
      <h2 className="font-display text-center mb-4" style={{ color: 'var(--color-text)' }}>
        mehr vs. Other Brands
      </h2>
      <p className="font-body text-center mb-10 max-w-lg mx-auto" style={{ fontSize: '15px', color: 'var(--color-text-muted)' }}>
        We hold every product to a standard most brands reserve for their marketing copy.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
              <th className="text-left py-4 pr-4 font-body" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Feature
              </th>
              <th className="text-left py-4 px-4 font-body" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                mehr
              </th>
              <th className="text-left py-4 pl-4 font-body" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Other Brands
              </th>
            </tr>
          </thead>
          <tbody>
            {product.comparisonTable.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td className="py-4 pr-4 font-body font-medium" style={{ fontSize: '14px', color: 'var(--color-text)' }}>
                  {row.feature}
                </td>
                <td className="py-4 px-4">
                  <span className="font-body flex items-center gap-2" style={{ fontSize: '14px', color: 'var(--color-success)' }}>
                    <CheckCircle2 size={16} />
                    {row.ourValue}
                  </span>
                </td>
                <td className="py-4 pl-4 font-body" style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
                  {row.theirValue}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ProductReviews({ product }: { product: Product }) {
  const [filter, setFilter] = useState(0);

  const filtered = filter === 0 ? product.reviews : product.reviews.filter((r) => r.rating === filter);

  const distribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: product.reviews.filter((r) => r.rating === stars).length,
  }));

  return (
    <section className="container-main section-padding">
      <SectionLabel label="Customer Reviews" />
      <div className="grid lg:grid-cols-3 gap-10">
        {/* Distribution */}
        <div>
          <h3 className="font-display mb-6" style={{ fontSize: '20px', color: 'var(--color-text)' }}>
            Rating Breakdown
          </h3>
          <div className="space-y-2">
            {distribution.map((d) => {
              const pct = product.reviews.length > 0 ? (d.count / product.reviews.length) * 100 : 0;
              return (
                <button
                  key={d.stars}
                  onClick={() => setFilter(filter === d.stars ? 0 : d.stars)}
                  className="w-full flex items-center gap-3 focus-ring rounded-md p-1 -ml-1 transition-colors hover:bg-black/[0.02]"
                >
                  <span className="font-body w-8 text-right flex-shrink-0" style={{ fontSize: '14px', color: 'var(--color-text)' }}>
                    {d.stars}
                  </span>
                  <Star size={14} fill="var(--color-star)" stroke="var(--color-star)" />
                  <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-border-subtle)' }}>
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, backgroundColor: 'var(--color-star)' }}
                    />
                  </div>
                  <span className="font-body w-8 flex-shrink-0" style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                    {d.count}
                  </span>
                </button>
              );
            })}
          </div>
          {filter > 0 && (
            <button
              onClick={() => setFilter(0)}
              className="font-body mt-4 flex items-center gap-1 focus-ring transition-opacity hover:opacity-70"
              style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}
            >
              <X size={14} /> Clear filter
            </button>
          )}
        </div>

        {/* Review cards */}
        <div className="lg:col-span-2 space-y-6">
          {filtered.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
          {filtered.length === 0 && (
            <p className="font-body text-center py-12" style={{ color: 'var(--color-text-muted)' }}>
              No reviews with {filter} stars yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function RelatedProducts({ product }: { product: Product }) {
  const related = product.relatedSlugs
    .map((slug) => site.products.find((p) => p.slug === slug))
    .filter(Boolean);

  if (related.length === 0) return null;

  return (
    <section className="container-main section-padding">
      <SectionLabel label="You May Also Like" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {related.map((p) => (
          <ProductCard key={p!.id} product={p!} />
        ))}
      </div>
    </section>
  );
}

function StickyMobileCTA({ product, onAddToCart }: { product: Product; onAddToCart: (productId: string, quantity: number, subscription: boolean) => void }) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-4" style={{ backgroundColor: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', boxShadow: 'var(--shadow-lg)' }}>
      <button
        onClick={() => onAddToCart(product.id, 1, false)}
        className="btn-primary w-full py-3.5"
      >
        Add to Cart — ${product.price.toFixed(2)}
      </button>
    </div>
  );
}

export default function ProductDetailPage({ onAddToCart }: ProductDetailPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const product = site.products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="container-main pt-32 pb-20 text-center">
        <h1 className="font-display mb-4" style={{ color: 'var(--color-text)' }}>Product Not Found</h1>
        <p className="font-body mb-8" style={{ color: 'var(--color-text-muted)' }}>The product you are looking for does not exist.</p>
        <Link to="/shop" className="btn-primary">Browse All Products</Link>
      </div>
    );
  }

  return (
    <div className="pb-20 lg:pb-0">
      <Breadcrumbs product={product} />
      <ProductHero product={product} onAddToCart={onAddToCart} />
      <NumbersCallout product={product} />
      <ProductTabs product={product} />
      <ComparisonTable product={product} />
      <ProductReviews product={product} />
      <RelatedProducts product={product} />
      <Footer />
      <StickyMobileCTA product={product} onAddToCart={onAddToCart} />
    </div>
  );
}
