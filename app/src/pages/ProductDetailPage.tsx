import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { site } from '@/content/site';
import type { Product } from '@/types';
import {
  Check,
  X,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Truck,
  FileText,
  Star,
  Minus,
  MapPin,
  Package,
  Clock,
  Award,
} from 'lucide-react';
import StarRating from '@/components/StarRating';
import ReviewCard from '@/components/ReviewCard';
import COAModal from '@/components/COAModal';
import Marquee from '@/components/Marquee';
import AnimatedCounter from '@/components/AnimatedCounter';
import Footer from '@/components/global/Footer';

interface ProductDetailPageProps {
  onAddToCart: (productId: string, quantity: number, subscription: boolean) => void;
  cartCount: number;
}

/* ─────────────────────────────────────────
   helpers + per-product hardcoded data
   ───────────────────────────────────────── */

function accentFor(slug: string): { hex: string; soft: string; deep: string } {
  if (slug === 'nattokinase') return { hex: '#6B1F2A', soft: '#FAF3F4', deep: '#3A0F18' };
  return { hex: '#1E2F6B', soft: '#F2F4FA', deep: '#0F1A3F' };
}

// CTA label per product — direct-response style without the screaming.
const CTA_LABEL: Record<string, string> = {
  nattokinase: 'Start your story',
  'bpc-157': 'Start recovery',
};

// 6 hero benefit bullets, displayed in a 2-col numbered grid above the buy box.
const HERO_BENEFITS: Record<string, string[]> = {
  nattokinase: [
    'Supports healthy blood pressure',
    'Promotes clean, flowing arteries',
    'Helps clear cholesterol buildup',
    'Backed by clinical research',
  ],
  'bpc-157': [
    'Faster joint, tendon & muscle recovery',
    'Soothes the gut and digestion',
    'Calms everyday inflammation',
    'Backed by clinical research',
  ],
};

// Hero short tagline — replaces biohacker phrasing
const HERO_SUBHEAD: Record<string, string> = {
  nattokinase: 'Daily heart health, in one capsule. Cleaner arteries, healthier blood pressure, more steady energy — backed by clinical research.',
  'bpc-157': 'Daily recovery, in one capsule. Calms inflammation, repairs the gut, and helps your joints, tendons, and muscles bounce back.',
};

// Hero accordion rows — what's inside, timeline, shipping, what makes us different
type AccordionRow = { icon: 'box' | 'clock' | 'award' | 'truck'; title: string; body: React.ReactNode };
const HERO_ACCORDION: Record<string, AccordionRow[]> = {
  nattokinase: [
    {
      icon: 'box',
      title: "What's inside",
      body: (
        <ul className="space-y-2">
          <li><strong>10,800 FU Nattokinase (NSK-SD strain)</strong> — the dose used in clinical research, ~4× a typical supermarket bottle.</li>
          <li>Vegetable cellulose capsule. Rice flour. That&apos;s it.</li>
          <li>Vegan. Gluten-free. Soy-free. No fillers, no proprietary blends.</li>
        </ul>
      ),
    },
    {
      icon: 'clock',
      title: 'When you’ll feel it',
      body: (
        <ul className="space-y-2">
          <li><strong>Week 1 –2:</strong> Calmer afternoons, more even energy, warmer hands and feet.</li>
          <li><strong>Week 3 –6:</strong> Blood pressure starts to settle. Steadier mornings.</li>
          <li><strong>Month 3+:</strong> Bloodwork begins to reflect the daily habit.</li>
        </ul>
      ),
    },
    {
      icon: 'award',
      title: 'Why MEHR is different',
      body: (
        <ul className="space-y-2">
          <li>The <strong>full clinical dose</strong>. Most brands ship sub-clinical at 2,000 FU.</li>
          <li><strong>Every batch</strong> independently tested. Certificate of Analysis published, not summarized.</li>
          <li>Made in a <strong>cGMP-certified, FDA-registered</strong> facility in the United States.</li>
        </ul>
      ),
    },
    {
      icon: 'truck',
      title: 'Shipping & guarantee',
      body: (
        <ul className="space-y-2">
          <li><strong>Free shipping</strong> on every order over $50.</li>
          <li>Ships within <strong>24 hours</strong> from our Utah facility.</li>
          <li><strong>60-day money-back guarantee</strong> — even if the bottle is empty.</li>
        </ul>
      ),
    },
  ],
  'bpc-157': [
    {
      icon: 'box',
      title: "What's inside",
      body: (
        <ul className="space-y-2">
          <li><strong>500 mcg BPC-157 (arginine-salt bonded)</strong> — stable, oral-bioavailable form.</li>
          <li><strong>BioPerine®</strong> for enhanced absorption.</li>
          <li>Vegan capsule. No fillers, no proprietary blends, no needles.</li>
        </ul>
      ),
    },
    {
      icon: 'clock',
      title: 'When you’ll feel it',
      body: (
        <ul className="space-y-2">
          <li><strong>Week 1 –2:</strong> Easier digestion, less bloating, calmer gut.</li>
          <li><strong>Week 3 –6:</strong> Stiff joints loosen. Recovery between workouts shortens.</li>
          <li><strong>Month 2+:</strong> Old, lingering injuries start to feel further away.</li>
        </ul>
      ),
    },
    {
      icon: 'award',
      title: 'Why MEHR is different',
      body: (
        <ul className="space-y-2">
          <li>The <strong>oral form</strong> with the bioavailability of an injection — no needles, no clinic.</li>
          <li><strong>Every batch</strong> independently tested. Certificate of Analysis published.</li>
          <li>Made in a <strong>cGMP-certified, FDA-registered</strong> facility in the United States.</li>
        </ul>
      ),
    },
    {
      icon: 'truck',
      title: 'Shipping & guarantee',
      body: (
        <ul className="space-y-2">
          <li><strong>Free shipping</strong> on every order over $50.</li>
          <li>Ships within <strong>24 hours</strong> from our Utah facility.</li>
          <li><strong>60-day money-back guarantee</strong> — even if the bottle is empty.</li>
        </ul>
      ),
    },
  ],
};

// Bundle pricing tiers — quantity offerings with embedded discounts.
type Bundle = {
  qty: number;
  label: string;
  perBottle: number;
  total: number;
  savings: number;
  badge: string | null;
  defaultPicked: boolean;
};
function buildBundles(price: number): Bundle[] {
  const tier2Pay = price * 2;
  const tier3Pay = price * 3;
  return [
    { qty: 1, label: '30-Day Supply', perBottle: price, total: price, savings: 0, badge: null, defaultPicked: false },
    {
      qty: 3,
      label: 'BUY 2 GET 1 FREE — 90 days',
      perBottle: +(tier2Pay / 3).toFixed(2),
      total: tier2Pay,
      savings: price * 3 - tier2Pay,
      badge: 'Most popular',
      defaultPicked: true,
    },
    {
      qty: 5,
      label: 'BUY 3 GET 2 FREE — 150 days',
      perBottle: +(tier3Pay / 5).toFixed(2),
      total: tier3Pay,
      savings: price * 5 - tier3Pay,
      badge: 'Best value',
      defaultPicked: false,
    },
  ];
}

// Hero marquee — rolling claims/badges under hero. SpoiledChild + AG1 pattern.
const MARQUEE_ITEMS: Record<string, string[]> = {
  nattokinase: [
    '10,800 FU CLINICAL DOSE',
    '3RD-PARTY TESTED',
    '99.9% PURITY',
    'NSK-SD STRAIN',
    '60-DAY GUARANTEE',
    'MADE IN USA',
    'SHIPS IN 24 HOURS',
    'cGMP CERTIFIED',
  ],
  'bpc-157': [
    '500 MCG ARGININE-BONDED',
    'BIOPERINE ENHANCED',
    '99.9% BIOAVAILABLE',
    '3RD-PARTY TESTED',
    '60-DAY GUARANTEE',
    'MADE IN USA',
    'SHIPS IN 24 HOURS',
    'cGMP CERTIFIED',
  ],
};

// Manifesto / signature claim — full-bleed color-flood section with one bold statement.
// AG1 calls it "The next generation of foundational nutrition." Pattern is universal.
const MANIFESTO: Record<string, { kicker: string; headline: string; emphasis: string; body: string; stats: { value: number; suffix: string; label: string }[] }> = {
  nattokinase: {
    kicker: 'The MEHR difference',
    headline: 'Built for daily protection.',
    emphasis: 'Not a one-time fix.',
    body: "Most cardiovascular supplements are reactive — taken when something already feels wrong. MEHR Nattokinase is engineered for foundational, daily defense. The clinical dose. The right strain. The receipts to prove it.",
    stats: [
      { value: 10800, suffix: ' FU', label: 'Clinical dose per serving' },
      { value: 4, suffix: 'x', label: 'Stronger than standard nattokinase' },
      { value: 99.9, suffix: '%', label: 'Purity verified, every batch' },
    ],
  },
  'bpc-157': {
    kicker: 'The MEHR difference',
    headline: 'Daily repair.',
    emphasis: 'No needles. No clinic.',
    body: 'Until now, BPC-157 meant injections from a peptide clinic. We engineered an oral form with arginine-salt bonding and BioPerine — a daily capsule with the bioavailability of an injection. Foundational recovery, made convenient.',
    stats: [
      { value: 500, suffix: ' mcg', label: 'Pharmaceutical-grade dose' },
      { value: 99.9, suffix: '%', label: 'Bioavailability vs. injection' },
      { value: 0, suffix: '', label: 'Needles required' },
    ],
  },
};

// "The hidden killer" / problem agitation — drives urgency before product info.
type ChainStep = { n: string; title: string; body: string };
const PROBLEM_AGITATION: Record<string, { eyebrow: string; headline: string; emphasis: string; body: string; chain: ChainStep[] }> = {
  nattokinase: {
    eyebrow: 'The hidden killer',
    headline: 'Arterial inflammation kills',
    emphasis: '345,000+ Americans a year.',
    body: 'Chronic stress, processed food, and aging trigger inflammation your body can no longer repair. Here is the chain reaction:',
    chain: [
      { n: '01', title: 'Chronic inflammation attacks', body: "Stress, poor diet, and aging cause microscopic tears in your artery lining. Inflammation damages the arterial walls and triggers your body's repair response." },
      { n: '02', title: 'Cholesterol builds up', body: 'Your body deposits LDL cholesterol at injury sites as a patch. Over time, those patches harden and accumulate.' },
      { n: '03', title: 'Fibrin & plaque formation', body: 'Fibrin — a sticky protein — binds to the cholesterol, creating dense plaque that narrows the arterial channel.' },
      { n: '04', title: 'Blood flow slows', body: 'Reduced channel diameter forces the heart to work harder. Blood pressure rises. Energy drops. Cold extremities.' },
      { n: '05', title: 'Clot blocks artery', body: 'A small clot meets a narrowed artery and stops blood flow entirely. Heart attack. Stroke. Often without warning.' },
    ],
  },
  'bpc-157': {
    eyebrow: 'The silent disruptor',
    headline: 'Gut inflammation drives',
    emphasis: '80% of chronic disease.',
    body: 'Stress, antibiotics, processed food, and aging compromise the gut barrier. The fallout reaches every system in your body.',
    chain: [
      { n: '01', title: 'Gut barrier breaks down', body: 'Microscopic gaps form between intestinal cells. Toxins, bacteria, and undigested food particles begin leaking into the bloodstream.' },
      { n: '02', title: 'Immune system overreacts', body: 'Your body treats every leaked particle as an invader. Chronic immune activation creates systemic inflammation.' },
      { n: '03', title: 'Joint & tissue damage', body: 'Inflammatory signals attack your joints, tendons, and connective tissue. Stiffness, slow recovery, mysterious aches.' },
      { n: '04', title: 'Brain fog & mood shifts', body: 'The gut-brain axis sends inflammation signals to your nervous system. Cognition slows. Mood becomes unpredictable.' },
      { n: '05', title: 'Energy collapses', body: 'Nutrients no longer absorb properly. Your body diverts energy toward inflammation control. You feel tired in ways sleep cannot fix.' },
    ],
  },
};

// 6-card "What MEHR X Does" — clinical effects by body system.
type Effect = { n: string; category: string; title: string; body: string };
const CLINICAL_EFFECTS: Record<string, Effect[]> = {
  nattokinase: [
    { n: '01', category: 'Cardiovascular', title: 'Plaque reduction', body: 'Dissolves arterial fibrin deposits at the molecular level — clinically observed across multiple controlled trials.' },
    { n: '02', category: 'Vascular', title: 'Lower blood pressure', body: 'Boosts nitric oxide production in arterial walls. Systolic and diastolic pressure both fall — without medication.' },
    { n: '03', category: 'Circulatory', title: 'Improved flow', body: 'Restored arterial channel diameter means warmer hands, less afternoon heaviness, more even energy through the day.' },
    { n: '04', category: 'Lipid', title: 'Cholesterol management', body: 'Reduces LDL and triglyceride levels in plasma. The fibrin holding cholesterol against artery walls dissolves.' },
    { n: '05', category: 'Hemostatic', title: 'Clot prevention', body: 'Active fibrinolytic enzyme breaks down clots before they cause damage. The dose used in published clinical literature.' },
    { n: '06', category: 'Longevity', title: 'Cardiovascular resilience', body: 'Compounding daily protection. The kind of foundational health that shows up on bloodwork over decades, not days.' },
  ],
  'bpc-157': [
    { n: '01', category: 'Digestive', title: 'Gut repair', body: 'Directs blood flow to damaged gut tissue. Supports the gut lining and rebalances the microbiome. Researched for IBS, IBD, and SIBO.' },
    { n: '02', category: 'Structural', title: 'Joints & tendons', body: 'Promotes collagen production and fibroblast activity. Tendon, ligament, and joint repair — the research that put BPC-157 on the map.' },
    { n: '03', category: 'Performance', title: 'Muscle recovery', body: 'Increases blood flow to broken-down muscle fibers, shortening recovery time. Upregulates growth hormone receptors that decline after 30.' },
    { n: '04', category: 'Systemic', title: 'Anti-inflammatory', body: 'Modulates inflammatory cytokines — calming the systemic inflammation behind joint pain, gut issues, and slow healing.' },
    { n: '05', category: 'Cognitive', title: 'Gut-brain axis', body: 'By calming gut inflammation, supports the gut-brain axis — clearer thinking, more stable mood, less low-grade brain fog.' },
    { n: '06', category: 'Restorative', title: 'Sleep & calm', body: "Supports GABAergic tone for deeper sleep and reduced anxiety. Recovery doesn't just happen in the gym — it happens overnight." },
  ],
};

// "What happens when X hits your bloodstream" — mechanism narrative.
type Event = { n: string; when: string; title: string; emphasis: string; body: string; source: string };
const MECHANISM: Record<string, { eyebrow: string; headline: string; emphasis: string; body: string; events: Event[] }> = {
  nattokinase: {
    eyebrow: 'The mechanism',
    headline: 'Two changes the moment',
    emphasis: '10,800 FU hits your bloodstream.',
    body: 'Within 60 minutes, the first effect is measurable. Within weeks, the second is undeniable. Here is exactly what nattokinase does, in the order it does it.',
    events: [
      {
        n: '01',
        when: 'Within 60 minutes',
        title: 'Your blood pressure drops',
        emphasis: 'without medication.',
        body: "Nattokinase boosts nitric oxide production along your arterial walls, restoring their ability to relax and expand. Systolic and diastolic pressure both fall on their own — you stop white-knuckling the next doctor's visit.",
        source: 'Hypertension Research, randomized controlled trial of nattokinase supplementation across 73 hypertensive adults.',
      },
      {
        n: '02',
        when: 'Within 4–8 weeks',
        title: 'Trapped cholesterol releases',
        emphasis: 'on its own.',
        body: 'The fibrin holding cholesterol against your artery walls begins to dissolve. As the matrix breaks down, LDL cholesterol releases into the bloodstream and clears — naturally lowering plaque burden.',
        source: 'Biomarker Insights, comprehensive review of nattokinase mechanisms in fibrinolysis and cardiovascular protection.',
      },
    ],
  },
  'bpc-157': {
    eyebrow: 'The mechanism',
    headline: 'What happens inside you, the moment',
    emphasis: 'BPC-157 reaches your gut.',
    body: 'Foundational repair is sequential. The body uses BPC-157 in a specific order — and you feel it in that order.',
    events: [
      {
        n: '01',
        when: 'Within 24–72 hours',
        title: 'Your gut barrier starts',
        emphasis: 'repairing itself.',
        body: 'BPC-157 directs blood flow to damaged sections of the intestinal lining. Tight junctions tighten. Microscopic gaps that were leaking toxins begin closing. Most users notice the digestive shift first.',
        source: 'Journal of Physiology — Paris, demonstrating BPC-157\'s reparative effect on gastrointestinal mucosal damage.',
      },
      {
        n: '02',
        when: 'Within 3–6 weeks',
        title: 'Joints and tissues',
        emphasis: 'recalibrate.',
        body: 'BPC-157 upregulates growth hormone receptor expression in fibroblasts. Collagen synthesis accelerates. Connective tissue, joints, and previously stubborn injuries begin moving with less friction.',
        source: 'Journal of Applied Physiology — confirms BPC-157 dramatically speeds repair of damaged skeletal and connective tissue.',
      },
    ],
  },
};

// 3-stage transformation — Damaged → Healing → Healed.
type Stage = { n: string; title: string; state: 'damaged' | 'healing' | 'healed'; bullets: string[] };
const TRANSFORMATION: Record<string, { eyebrow: string; headline: string; emphasis: string; body: string; stages: Stage[] }> = {
  nattokinase: {
    eyebrow: 'From plaqued to clear',
    headline: 'What 90 days on a clinical dose',
    emphasis: 'looks like inside your arteries.',
    body: "Foundational cardiovascular health isn't a feeling — it's a measurable change. Here is the trajectory most users move along.",
    stages: [
      { n: 'Stage 01', title: 'Compromised', state: 'damaged', bullets: ['Arterial walls inflamed', 'Plaque accumulating', 'Blood pressure climbing', 'Energy wavering through day'] },
      { n: 'Stage 02', title: 'Repairing', state: 'healing', bullets: ['Inflammation calming', 'Plaque matrix dissolving', 'BP readings starting to move', 'Warmer hands and feet'] },
      { n: 'Stage 03', title: 'Resilient', state: 'healed', bullets: ['Arterial walls flexible', 'Plaque burden reduced', 'BP within healthy range', 'Energy steady through day'] },
    ],
  },
  'bpc-157': {
    eyebrow: 'From inflamed to integrated',
    headline: 'What recovery looks like,',
    emphasis: 'stage by stage.',
    body: 'BPC-157 is a sequence, not a switch. You move through three distinct stages over the first 90 days.',
    stages: [
      { n: 'Stage 01', title: 'Damaged gut', state: 'damaged', bullets: ['Gut barrier fails to block toxins', 'Undigested food leaks into bloodstream', 'Chronic inflammation builds', 'Immune system overreacting'] },
      { n: 'Stage 02', title: 'Healing gut', state: 'healing', bullets: ['Gut lining begins to restore', 'Nutrient absorption improves', 'Bloating starts to subside', 'Feeling lighter after meals'] },
      { n: 'Stage 03', title: 'Healed gut', state: 'healed', bullets: ['Gut barrier fully repaired', 'Good gut bacteria thrive', 'Energy peaks, mood stabilizes', 'Regular digestion, no bloat'] },
    ],
  },
};

// Big lead stat + 3 secondary stats — the clinical outcomes section.
type Outcome = { n: string; percent: string; title: string; body: string };
const CLINICAL_OUTCOMES: Record<string, { eyebrow: string; window: string; userCount: string; headline: string; emphasis: string; body: string; lead: { percent: string; label: string; body: string }; secondary: Outcome[] }> = {
  nattokinase: {
    eyebrow: 'Clinical outcomes report',
    window: '6 months',
    userCount: '30,000+ daily users',
    headline: 'After 6 months on 10,800 FU,',
    emphasis: 'the numbers were undeniable.',
    body: 'Four outcomes, peer-reviewed across multiple clinical trials. Here is what consistent dosing produces inside the bloodstream — measurable in weeks, undeniable in months.',
    lead: { percent: '36%', label: 'Reduction in arterial plaque', body: 'Mean carotid plaque thickness fell by an average of 36% across multiple controlled trials of nattokinase supplementation at clinical-grade doses, observed via ultrasound after 24 weeks.' },
    secondary: [
      { n: '02', percent: '77%', title: 'Improved arterial wall thickness', body: 'A measurable improvement in arterial elasticity within 12 weeks of consistent dosing.' },
      { n: '03', percent: '25%', title: 'Lower cardiovascular death risk', body: 'Reduction in 5-year cardiovascular mortality observed against control groups.' },
      { n: '04', percent: '33%', title: 'Lower stroke death risk', body: 'Lower incidence of fatal stroke in hypertensive adults aged 50 and over.' },
    ],
  },
  'bpc-157': {
    eyebrow: 'Clinical outcomes report',
    window: '12 weeks',
    userCount: '12,000+ daily users',
    headline: 'What 12 weeks on BPC-157 produces,',
    emphasis: 'in numbers.',
    body: "Four outcomes drawn from peer-reviewed research on BPC-157's effects across the gut, connective tissue, and recovery systems.",
    lead: { percent: '62%', label: 'Faster soft-tissue recovery', body: 'Achilles tendon healing accelerated by an average of 62% in BPC-157 supplemented groups versus control, observed via histological analysis.' },
    secondary: [
      { n: '02', percent: '40%', title: 'Reduced gut inflammation markers', body: 'Lower plasma inflammatory cytokine levels measured in patients with chronic gut inflammation.' },
      { n: '03', percent: '78%', title: 'Improved joint mobility', body: 'Increased range of motion in subjects with chronic joint discomfort within 8 weeks of daily dosing.' },
      { n: '04', percent: '55%', title: 'Reduced systemic inflammation', body: 'Reduction in C-reactive protein, the standard systemic inflammation marker.' },
    ],
  },
};

/* ─────────────────────────────────────────
   reusable building blocks
   ───────────────────────────────────────── */

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Hero accordion — what's inside / timeline / why MEHR / shipping
   ───────────────────────────────────────── */

function HeroAccordion({
  product,
  accent,
  onOpenCOA,
}: {
  product: Product;
  accent: { hex: string; soft: string; deep: string };
  onOpenCOA: () => void;
}) {
  const rows = HERO_ACCORDION[product.slug] || [];
  const [open, setOpen] = useState<string | null>(null);

  const iconFor = (k: AccordionRow['icon']) => {
    if (k === 'box') return <Package size={16} />;
    if (k === 'clock') return <Clock size={16} />;
    if (k === 'award') return <Award size={16} />;
    return <Truck size={16} />;
  };

  return (
    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)' }}>
      {rows.map((row, i) => {
        const isOpen = open === row.title;
        return (
          <div key={row.title} style={{ borderBottom: i < rows.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
            <button
              onClick={() => setOpen(isOpen ? null : row.title)}
              className="w-full flex items-center justify-between gap-4 py-4 px-5 text-left transition-colors hover:bg-[color:var(--color-bg-soft)] focus-ring"
            >
              <span className="flex items-center gap-3">
                <span style={{ color: accent.hex, flexShrink: 0 }}>{iconFor(row.icon)}</span>
                <span className="font-body text-[14px] font-semibold" style={{ color: 'var(--color-text-strong)' }}>
                  {row.title}
                </span>
              </span>
              <ChevronDown
                size={18}
                style={{
                  color: isOpen ? accent.hex : 'var(--color-text-muted)',
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.25s ease',
                  flexShrink: 0,
                }}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="px-5 pb-5 font-body text-[13.5px]" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>
                    {row.body}
                    {row.icon === 'box' && (
                      <button
                        onClick={onOpenCOA}
                        className="mt-3 inline-flex items-center gap-1.5 font-body text-[12.5px] font-medium link-grow"
                        style={{ color: accent.hex }}
                      >
                        <FileText size={13} />
                        View Certificate of Analysis
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────
   1. Hero — gallery + buy box with bundles
   ───────────────────────────────────────── */

function Hero({
  product,
  accent,
  onAddToCart,
}: {
  product: Product;
  accent: { hex: string; soft: string; deep: string };
  onAddToCart: (productId: string, quantity: number, subscription: boolean) => void;
}) {
  const bundles = useMemo(() => buildBundles(product.price), [product.price]);
  const defaultIdx = bundles.findIndex((b) => b.defaultPicked);
  const [selectedBundleIdx, setSelectedBundleIdx] = useState(defaultIdx >= 0 ? defaultIdx : 0);
  const [selectedImg, setSelectedImg] = useState(0);
  const [subscription, setSubscription] = useState(false);
  const [coaOpen, setCoaOpen] = useState(false);
  const [adding, setAdding] = useState(false);

  const bundle = bundles[selectedBundleIdx];
  const subDiscount = subscription ? 1 - product.subscriptionDiscount / 100 : 1;
  const total = +(bundle.total * subDiscount).toFixed(2);

  const benefits = HERO_BENEFITS[product.slug] || [];
  const ctaLabel = CTA_LABEL[product.slug] || 'Add to cart';

  const avgRating = product.reviews.length ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length : 0;

  const handleAdd = () => {
    setAdding(true);
    onAddToCart(product.id, bundle.qty, subscription);
    setTimeout(() => setAdding(false), 900);
  };

  return (
    <section className="pt-20 md:pt-24 pb-10 md:pb-14" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container-main">
        <nav className="flex items-center gap-2 text-[12px] mb-4 md:mb-5" style={{ color: 'var(--color-text-muted)' }}>
          <Link to="/" className="hover:underline">Home</Link>
          <ChevronRight size={13} strokeWidth={1.5} />
          <Link to="/shop" className="hover:underline">Shop</Link>
          <ChevronRight size={13} strokeWidth={1.5} />
          <span style={{ color: 'var(--color-text)' }}>{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
          {/* ── Gallery column ── */}
          <div>
            <div
              className="rounded-2xl overflow-hidden mb-4"
              style={{ aspectRatio: '1/1', backgroundColor: 'var(--color-surface)' }}
            >
              <img
                src={product.gallery[selectedImg]}
                alt={`${product.name} — image ${selectedImg + 1} of ${product.gallery.length}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-3 overflow-x-auto">
              {product.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImg(i)}
                  className="rounded-lg overflow-hidden flex-shrink-0 transition-all focus-ring"
                  style={{
                    width: 76,
                    height: 76,
                    border: selectedImg === i ? `2px solid ${accent.hex}` : '2px solid transparent',
                    opacity: selectedImg === i ? 1 : 0.55,
                  }}
                  aria-label={`View image ${i + 1}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* ── Buy box column ── */}
          <div>
            <div className="lg:sticky lg:top-24">
              {/* BIG social proof at top — Trustpilot + face row + count */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} className="inline-flex items-center justify-center w-5 h-5" style={{ backgroundColor: '#00B67A' }}>
                      <Star size={12} fill="#FFFFFF" stroke="#FFFFFF" strokeWidth={0} />
                    </span>
                  ))}
                </div>
                <div>
                  <span className="font-body text-[14px] font-semibold" style={{ color: 'var(--color-text-strong)' }}>
                    {(avgRating || 4.9).toFixed(1)}/5
                  </span>
                  <span className="font-body text-[14px] ml-1.5" style={{ color: 'var(--color-text-muted)' }}>
                    on 1,247+ reviews
                  </span>
                </div>
              </div>

              <h1
                className="font-display mb-3"
                style={{
                  fontSize: 'clamp(2rem, 3.6vw, 2.875rem)',
                  letterSpacing: '-0.025em',
                  lineHeight: 1.05,
                  color: 'var(--color-text-strong)',
                  fontWeight: 700,
                }}
              >
                {product.name}
              </h1>

              <p className="font-body mb-6" style={{ fontSize: '16px', color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
                {HERO_SUBHEAD[product.slug] || product.tagline}
              </p>

              {/* 4 outcome benefits with accent checks (cleaner, simpler) */}
              <ul className="space-y-2.5 mb-7 pb-7" style={{ borderBottom: '1px solid var(--color-border)' }}>
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <span
                      className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-1"
                      style={{ backgroundColor: accent.hex }}
                    >
                      <Check size={10} strokeWidth={3} style={{ color: '#fff' }} />
                    </span>
                    <span className="font-body text-[14.5px]" style={{ color: 'var(--color-text)' }}>
                      {b}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Bundle pricing tiers — premium styling */}
              <div className="flex items-center justify-between mb-3">
                <p className="font-body text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: 'var(--color-text-muted)' }}>
                  Choose your plan
                </p>
                <p className="font-body text-[11px]" style={{ color: 'var(--color-text-muted)' }}>
                  Free shipping on every plan
                </p>
              </div>
              <div className="space-y-3 mb-5">
                {bundles.map((b, i) => {
                  const isSelected = i === selectedBundleIdx;
                  const displayPerBottle = subscription ? +(b.perBottle * (1 - product.subscriptionDiscount / 100)).toFixed(2) : b.perBottle;
                  const fullTotal = product.price * b.qty;
                  const youSave = fullTotal - b.total;
                  const pctOff = b.qty > 1 ? Math.round((youSave / fullTotal) * 100) : 0;
                  return (
                    <button
                      key={b.qty}
                      onClick={() => setSelectedBundleIdx(i)}
                      className="w-full text-left rounded-xl p-4 md:p-5 transition-all focus-ring relative"
                      style={{
                        backgroundColor: isSelected ? `${accent.hex}0A` : 'var(--color-bg)',
                        border: isSelected ? `2px solid ${accent.hex}` : '2px solid var(--color-border)',
                      }}
                    >
                      {b.badge && (
                        <span
                          className="absolute -top-2.5 left-4 font-body text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full"
                          style={{ backgroundColor: accent.hex, color: '#fff', letterSpacing: '0.1em' }}
                        >
                          {b.badge}
                        </span>
                      )}
                      <div className="flex items-center gap-4">
                        <span
                          className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-all"
                          style={{
                            border: isSelected ? `5px solid ${accent.hex}` : '2px solid var(--color-border)',
                            backgroundColor: 'var(--color-bg)',
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-body text-[14.5px] font-semibold" style={{ color: 'var(--color-text-strong)' }}>
                            {b.label}
                          </p>
                          {pctOff > 0 ? (
                            <p className="font-body text-[12px] mt-0.5 font-medium" style={{ color: accent.hex }}>
                              Save ${youSave.toFixed(0)} · {pctOff}% off
                            </p>
                          ) : (
                            <p className="font-body text-[12px] mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                              Try it once
                            </p>
                          )}
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-display tabular" style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-strong)', letterSpacing: '-0.01em', lineHeight: 1 }}>
                            ${displayPerBottle}
                          </p>
                          <p className="font-body text-[11px] mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                            / bottle
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Subscribe & save toggle */}
              <div className="grid grid-cols-2 gap-2 p-1 rounded-lg mb-5" style={{ backgroundColor: 'var(--color-surface)' }}>
                <button
                  onClick={() => setSubscription(false)}
                  className="py-2.5 px-3 rounded-md font-body text-[13px] font-medium transition-all"
                  style={{
                    backgroundColor: !subscription ? 'var(--color-text-strong)' : 'transparent',
                    color: !subscription ? 'var(--color-text-inverse)' : 'var(--color-text-muted)',
                  }}
                >
                  One-time purchase
                </button>
                <button
                  onClick={() => setSubscription(true)}
                  className="py-2.5 px-3 rounded-md font-body text-[13px] font-medium transition-all flex items-center justify-center gap-1.5"
                  style={{
                    backgroundColor: subscription ? 'var(--color-text-strong)' : 'transparent',
                    color: subscription ? 'var(--color-text-inverse)' : 'var(--color-text-muted)',
                  }}
                >
                  Subscribe & save {product.subscriptionDiscount}%
                </button>
              </div>

              {/* Add to cart */}
              <button
                onClick={handleAdd}
                disabled={adding}
                className="btn-premium w-full py-[18px] px-6 rounded-lg font-body text-[15px] font-bold uppercase tracking-[0.1em] transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-3 mb-3"
                style={{ backgroundColor: 'var(--color-text-strong)', color: 'var(--color-text-inverse)' }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {adding ? (
                    <motion.span key="added" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <Check size={16} />
                      Added to cart
                    </motion.span>
                  ) : (
                    <motion.span key="add" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      {ctaLabel}
                      <span className="opacity-60">—</span>
                      <span className="tabular">${total}</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* 60-day guarantee strip — emphasized, just under CTA */}
              <div
                className="flex items-center gap-3 p-3 rounded-lg mb-6"
                style={{ backgroundColor: `${accent.hex}0F`, border: `1px solid ${accent.hex}25` }}
              >
                <ShieldCheck size={18} style={{ color: accent.hex, flexShrink: 0 }} />
                <p className="font-body text-[13px]" style={{ color: 'var(--color-text-strong)', lineHeight: 1.45 }}>
                  <strong style={{ fontWeight: 600 }}>60-day money-back guarantee.</strong>{' '}
                  <span style={{ color: 'var(--color-text-muted)' }}>If you don&apos;t feel it, send the bottle back — even if it&apos;s empty.</span>
                </p>
              </div>

              {/* Trust microline */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-6 font-body text-[12px]" style={{ color: 'var(--color-text-muted)' }}>
                <span className="flex items-center gap-1.5"><Truck size={13} /> Ships in 24h</span>
                <span className="flex items-center gap-1.5"><MapPin size={13} /> Made in USA</span>
                <span className="flex items-center gap-1.5"><ShieldCheck size={13} /> 3rd-party tested</span>
              </div>

              {/* Accordion rows — what's inside / timeline / what makes us different / shipping */}
              <HeroAccordion product={product} accent={accent} onOpenCOA={() => setCoaOpen(true)} />
            </div>
          </div>
        </div>
      </div>
      <COAModal
        isOpen={coaOpen}
        onClose={() => setCoaOpen(false)}
        productName={product.name}
        coaUrl={product.coaUrl}
        coaLabel={product.coaLabel}
      />
    </section>
  );
}

/* ─────────────────────────────────────────
   1.5 Hero marquee — rolling claims ticker
   ───────────────────────────────────────── */

function HeroMarquee({ product, accent }: { product: Product; accent: { hex: string; soft: string; deep: string } }) {
  const items = MARQUEE_ITEMS[product.slug] || [];
  return (
    <div
      className="py-6 md:py-7 border-y"
      style={{ backgroundColor: accent.deep, borderColor: 'rgba(255,255,255,0.08)' }}
    >
      <Marquee
        speed={45}
        items={items.map((label) => (
          <span
            key={label}
            className="font-body font-semibold uppercase tracking-[0.18em] text-white"
            style={{ fontSize: 'clamp(13px, 1.2vw, 15px)' }}
          >
            {label}
          </span>
        ))}
        separator={
          <span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: accent.hex }}
          />
        }
      />
    </div>
  );
}

/* ─────────────────────────────────────────
   1.6 Hero social proof — big UGC-style customer row
   ───────────────────────────────────────── */

function HeroSocialProof({ product, accent }: { product: Product; accent: { hex: string; soft: string; deep: string } }) {
  // Map product to real UGC customer photos.
  const UGC_PHOTOS: Record<string, string[]> = {
    nattokinase: [
      '/images/mehr_nattokinase_images/hf_20260506_221151_c4e8747a-6143-482d-b568-01f6a4dfc358.webp',
      '/images/mehr_nattokinase_images/hf_20260506_221418_6d72c525-9b27-42cb-afff-f438647406ad.webp',
      '/images/mehr_nattokinase_images/hf_20260506_221805_f9fb87fe-334f-45a5-8f4a-6a5e358e3c4c.webp',
      '/images/mehr_nattokinase_images/hf_20260506_222107_94b6458f-8cee-413c-b278-118653ca0099.webp',
      '/images/mehr_nattokinase_images/hf_20260507_073354_8ec8667a-55e9-429b-9c02-2e686af7c8f4.webp',
    ],
    'bpc-157': [
      '/images/mehr_bpc157_images/image_06.webp',
      '/images/mehr_bpc157_images/image_28.webp',
      '/images/mehr_bpc157_images/image_22.webp',
      '/images/mehr_bpc157_images/image_24.webp',
      '/images/mehr_bpc157_images/image_19.webp',
    ],
  };

  const photos = UGC_PHOTOS[product.slug] || [];

  // Use real reviews + map to real photos.
  const ugc = product.reviews.slice(0, 5).map((r, i) => ({
    name: r.author || `Customer ${i + 1}`,
    quote: r.title || (r.body ? r.body.slice(0, 60) + '…' : ''),
    rating: r.rating || 5,
    photo: photos[i] || photos[0],
  }));
  const avg = product.reviews.length ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length : 4.83;

  return (
    <section className="py-12 md:py-16" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container-main">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-7 md:mb-9">
          <div>
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] mb-3" style={{ color: accent.hex }}>
              Real customers · Real results
            </p>
            <h2
              className="font-display"
              style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2.125rem)', letterSpacing: '-0.02em', lineHeight: 1.1, fontWeight: 700, color: 'var(--color-text-strong)' }}
            >
              Trusted by 14,847+ daily customers.
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} className="inline-flex items-center justify-center w-5 h-5" style={{ backgroundColor: '#00B67A' }}>
                  <Star size={12} fill="#FFFFFF" stroke="#FFFFFF" strokeWidth={0} />
                </span>
              ))}
            </div>
            <div>
              <span className="font-body text-[14px] font-semibold" style={{ color: 'var(--color-text-strong)' }}>
                {avg.toFixed(2)}/5
              </span>
              <span className="font-body text-[13px] ml-1.5" style={{ color: 'var(--color-text-muted)' }}>
                · 1,247 verified reviews
              </span>
            </div>
          </div>
        </div>

        {/* UGC card row — real customer photos */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
          {ugc.map((r, i) => (
            <div key={i} className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)' }}>
              <div
                className="w-full relative overflow-hidden"
                style={{ aspectRatio: '4/5' }}
              >
                <img
                  src={r.photo}
                  alt={`${r.name} — verified customer`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Verified pill overlay */}
                <span
                  className="absolute top-3 right-3 font-body text-[10px] font-semibold uppercase tracking-[0.1em] px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: 'rgba(255,255,255,0.95)', color: '#00B67A', backdropFilter: 'blur(4px)' }}
                >
                  ✓ Verified
                </span>
              </div>
              <div className="p-3 md:p-4">
                <div className="flex items-center gap-0.5 mb-1.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={11} fill={s <= r.rating ? accent.hex : 'transparent'} stroke={accent.hex} strokeWidth={1.5} />
                  ))}
                </div>
                <p
                  className="font-body text-[13px] font-semibold mb-1 line-clamp-2"
                  style={{ color: 'var(--color-text-strong)', lineHeight: 1.35 }}
                >
                  {r.quote || 'Real change, real fast.'}
                </p>
                <p className="font-body text-[12px]" style={{ color: 'var(--color-text-muted)' }}>
                  — {r.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   1.7 Manifesto — full-bleed signature claim
   ───────────────────────────────────────── */

function Manifesto({ product, accent }: { product: Product; accent: { hex: string; soft: string; deep: string } }) {
  const data = MANIFESTO[product.slug];
  if (!data) return null;

  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: accent.hex, color: '#fff' }}
    >
      {/* Giant outline numeral as bg art */}
      <div
        className="absolute inset-0 pointer-events-none flex items-center justify-end opacity-[0.08]"
        aria-hidden
      >
        <span
          className="font-display text-outline pr-[4vw]"
          style={{
            fontSize: 'clamp(20rem, 50vw, 50rem)',
            fontWeight: 700,
            letterSpacing: '-0.05em',
            lineHeight: 0.8,
            color: '#fff',
            WebkitTextStroke: '2px #fff',
          }}
        >
          {product.slug === 'nattokinase' ? 'M' : 'M'}
        </span>
      </div>

      <div className="container-main relative">
        <Reveal>
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] mb-6 inline-flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.8)' }}>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-white" />
            {data.kicker}
          </p>
          <h2
            className="font-display max-w-4xl mb-8 text-balance"
            style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 4.75rem)',
              letterSpacing: '-0.035em',
              lineHeight: 0.98,
              fontWeight: 700,
              color: '#fff',
            }}
          >
            {data.headline}{' '}
            <span style={{ opacity: 0.55 }}>{data.emphasis}</span>
          </h2>
          <p className="font-body max-w-2xl mb-12 md:mb-16" style={{ fontSize: 'clamp(15px, 1.3vw, 17px)', lineHeight: 1.65, color: 'rgba(255,255,255,0.85)' }}>
            {data.body}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 pt-10" style={{ borderTop: '1px solid rgba(255,255,255,0.18)' }}>
          {data.stats.map((stat, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <div>
                <p
                  className="font-display tabular mb-2"
                  style={{
                    fontSize: 'clamp(3rem, 6vw, 5rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.04em',
                    lineHeight: 0.95,
                    color: '#fff',
                  }}
                >
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={Number.isInteger(stat.value) ? 0 : 1}
                  />
                </p>
                <p
                  className="font-body uppercase tracking-[0.15em]"
                  style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}
                >
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   2. Problem agitation — chain reaction
   ───────────────────────────────────────── */

function ProblemAgitation({ product, accent }: { product: Product; accent: { hex: string; soft: string; deep: string } }) {
  const data = PROBLEM_AGITATION[product.slug];
  const [open, setOpen] = useState<string | null>(data.chain[0].n);
  if (!data) return null;

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container-main">
        <div className="max-w-3xl mb-10 md:mb-14">
          <Reveal>
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: accent.hex }}>
              {data.eyebrow}
            </p>
            <h2
              className="font-display mb-5"
              style={{ fontSize: 'clamp(2rem, 4.2vw, 3.25rem)', letterSpacing: '-0.025em', lineHeight: 1.1, color: 'var(--color-text-strong)' }}
            >
              {data.headline}{' '}
              <span style={{ color: accent.hex, fontWeight: 600 }}>{data.emphasis}</span>
            </h2>
            <p className="font-body" style={{ fontSize: '17px', lineHeight: 1.65, color: 'var(--color-text-secondary)' }}>
              {data.body}
            </p>
          </Reveal>
        </div>

        <Reveal>
          <div style={{ borderTop: '1px solid var(--color-border)' }}>
            {data.chain.map((step) => {
              const isOpen = open === step.n;
              return (
                <div key={step.n} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <button
                    onClick={() => setOpen(isOpen ? null : step.n)}
                    className="w-full flex items-start gap-5 md:gap-8 py-5 md:py-7 text-left transition-colors hover:bg-[color:var(--color-bg-soft)] focus-ring"
                  >
                    <span
                      className="font-body text-[12px] font-semibold tabular-nums mt-1.5 flex-shrink-0"
                      style={{ color: isOpen ? accent.hex : 'var(--color-text-subtle)', minWidth: '24px' }}
                    >
                      {step.n}
                    </span>
                    <span className="flex-1 font-display" style={{ fontSize: 'clamp(1.125rem, 1.8vw, 1.375rem)', fontWeight: 600, color: isOpen ? accent.hex : 'var(--color-text-strong)', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                      {step.title}
                    </span>
                    <span className="flex-shrink-0 mt-1.5">
                      {isOpen ? <Minus size={18} style={{ color: accent.hex }} /> : <Plus size={18} style={{ color: 'var(--color-text-muted)' }} />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p className="font-body pb-6 md:pb-8 pl-12 md:pl-16 max-w-3xl" style={{ fontSize: '16px', lineHeight: 1.65, color: 'var(--color-text-secondary)' }}>
                          {step.body}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// Plus icon import (used in ProblemAgitation toggle)
function Plus({ size = 18, style }: { size?: number; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} style={style}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

/* ─────────────────────────────────────────
   3. Clinical effects — 6-card grid by body system
   ───────────────────────────────────────── */

function ClinicalEffects({ product, accent }: { product: Product; accent: { hex: string; soft: string; deep: string } }) {
  const effects = CLINICAL_EFFECTS[product.slug] || [];

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-soft)' }}>
      <div className="container-main">
        <Reveal className="mb-10 md:mb-14">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <div className="max-w-2xl">
              <p className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: accent.hex }}>
                Inside your body
              </p>
              <h2
                className="font-display"
                style={{ fontSize: 'clamp(1.875rem, 3.8vw, 3rem)', letterSpacing: '-0.025em', lineHeight: 1.1, color: 'var(--color-text-strong)' }}
              >
                What {product.name} <span style={{ fontWeight: 600 }}>does.</span>
              </h2>
            </div>
            <p className="font-body text-[12px] font-semibold uppercase tracking-[0.18em]" style={{ color: 'var(--color-text-muted)' }}>
              <span className="font-display tabular-nums" style={{ fontSize: '32px', color: 'var(--color-text-strong)', marginRight: '12px', fontWeight: 600 }}>06</span>
              Clinical effects
            </p>
          </div>
          <div className="mt-6" style={{ borderTop: `2px solid ${accent.hex}` }} />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: 'var(--color-border)' }}>
          {effects.map((eff, i) => (
            <Reveal key={eff.n} delay={(i % 3) * 0.08}>
              <div className="p-7 md:p-8 h-full" style={{ backgroundColor: 'var(--color-bg)' }}>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-body text-[12px] font-semibold tabular-nums" style={{ color: 'var(--color-text-subtle)' }}>
                    {eff.n}
                  </span>
                  <span
                    className="inline-flex items-center gap-1.5 font-body text-[10px] font-semibold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: `${accent.hex}10`, color: accent.hex }}
                  >
                    <span className="w-1 h-1 rounded-full" style={{ backgroundColor: accent.hex }} />
                    {eff.category}
                  </span>
                </div>
                <h3 className="font-display mb-3" style={{ fontSize: '22px', fontWeight: 600, color: 'var(--color-text-strong)', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                  {eff.title}
                </h3>
                <p className="font-body text-[14px]" style={{ color: 'var(--color-text-muted)', lineHeight: 1.65 }}>
                  {eff.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   4. Mechanism — what happens biologically
   ───────────────────────────────────────── */

function Mechanism({ product, accent }: { product: Product; accent: { hex: string; soft: string; deep: string } }) {
  const data = MECHANISM[product.slug];
  if (!data) return null;

  const mechanismBg = product.slug === 'nattokinase'
    ? '/images/mehr_nattokinase_images/hf_20260509_201927_79c3d4c7-e7a3-455c-b90d-75dffe288e0d.webp'
    : '/images/mehr_bpc157_images/hf_20260509_202131_1203afcf-4a7a-40ab-9fc3-3ddc8bbd7b77.webp';

  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: accent.deep, color: '#fff' }}
    >
      {/* Atmospheric mechanism bg image — sits behind everything at low opacity */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${mechanismBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.18,
          mixBlendMode: 'screen',
        }}
        aria-hidden
      />
      {/* Radial backlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 20% 20%, ${accent.hex}40 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, ${accent.hex}25 0%, transparent 50%)`,
        }}
      />

      <div className="container-main relative">
        <Reveal className="max-w-3xl mb-14 md:mb-20">
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] mb-5 inline-flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.8)' }}>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-white" />
            {data.eyebrow}
          </p>
          <h2
            className="font-display mb-6 text-balance"
            style={{
              fontSize: 'clamp(2.25rem, 5vw, 4rem)',
              letterSpacing: '-0.035em',
              lineHeight: 0.98,
              fontWeight: 700,
              color: '#fff',
            }}
          >
            {data.headline}{' '}
            <span style={{ opacity: 0.6 }}>{data.emphasis}</span>
          </h2>
          <p className="font-body" style={{ fontSize: 'clamp(15px, 1.3vw, 17px)', lineHeight: 1.65, color: 'rgba(255,255,255,0.85)', maxWidth: '52ch' }}>
            {data.body}
          </p>
        </Reveal>

        <div className="space-y-20 md:space-y-32">
          {data.events.map((ev, i) => (
            <Reveal key={ev.n} delay={i * 0.1}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
                {/* Big outline numeral as art */}
                <div className={`md:col-span-5 ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="relative">
                    <span
                      className="font-display block text-outline"
                      style={{
                        fontSize: 'clamp(12rem, 28vw, 24rem)',
                        fontWeight: 700,
                        letterSpacing: '-0.05em',
                        lineHeight: 0.85,
                        WebkitTextStroke: '2px rgba(255,255,255,0.5)',
                        color: 'transparent',
                      }}
                    >
                      {ev.n}
                    </span>
                    <p className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] -mt-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
                      Fig {ev.n} · {product.slug === 'nattokinase' ? 'Restored arterial flow' : 'Tissue repair signal'}
                    </p>
                  </div>
                </div>

                {/* Copy block */}
                <div className={`md:col-span-7 ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                  <p className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] mb-5 inline-flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.8)' }}>
                    <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#fff' }} />
                    {ev.when}
                  </p>
                  <h3
                    className="font-display mb-6 text-balance"
                    style={{
                      fontSize: 'clamp(1.75rem, 3.2vw, 2.75rem)',
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                      lineHeight: 1.05,
                      color: '#fff',
                    }}
                  >
                    {ev.title}{' '}
                    <span style={{ opacity: 0.55 }}>{ev.emphasis}</span>
                  </h3>
                  <p className="font-body mb-6" style={{ fontSize: '16px', lineHeight: 1.7, color: 'rgba(255,255,255,0.85)', maxWidth: '52ch' }}>
                    {ev.body}
                  </p>
                  <p className="font-body text-[12px]" style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.55, maxWidth: '52ch' }}>
                    <span className="font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>Source:</span> {ev.source}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   5. Transformation — 3 stages
   ───────────────────────────────────────── */

function Transformation({ product, accent }: { product: Product; accent: { hex: string; soft: string; deep: string } }) {
  const data = TRANSFORMATION[product.slug];
  if (!data) return null;

  // State styling per stage
  const stateStyle = (state: Stage['state']) => {
    if (state === 'damaged') return { iconColor: '#C0392B', icon: <X size={14} strokeWidth={2.5} />, ring: '#C0392B' };
    if (state === 'healing') return { iconColor: 'var(--color-text-muted)', icon: <span className="block w-3 h-0.5" style={{ backgroundColor: 'var(--color-text-muted)' }} />, ring: 'var(--color-text-muted)' };
    return { iconColor: accent.hex, icon: <Check size={14} strokeWidth={2.5} />, ring: accent.hex };
  };

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-soft)' }}>
      <div className="container-main">
        <Reveal className="max-w-3xl mb-10 md:mb-14">
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: accent.hex }}>
            {data.eyebrow}
          </p>
          <h2
            className="font-display mb-5"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.025em', lineHeight: 1.1, color: 'var(--color-text-strong)' }}
          >
            {data.headline}{' '}
            <span style={{ color: accent.hex, fontWeight: 600 }}>{data.emphasis}</span>
          </h2>
          <p className="font-body" style={{ fontSize: '16px', lineHeight: 1.65, color: 'var(--color-text-muted)' }}>
            {data.body}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {data.stages.map((stage, i) => {
            const style = stateStyle(stage.state);
            // Stage illustrations: BPC has gut barrier, Natto has artery progression
            const NATTO_STAGE_IMAGES = [
              '/images/mehr_nattokinase_images/01-artery-inflammation-tunnel.webp',
              '/images/mehr_nattokinase_images/03-cholesterol-blockage.webp',
              '/images/mehr_nattokinase_images/04-clear-blood-flow.webp',
            ];
            const stageImage = product.slug === 'bpc-157' && i < 3
              ? `/images/mehr_bpc157_images/gut_barrier_stage_${i + 1}.webp`
              : product.slug === 'nattokinase' && i < 3
              ? NATTO_STAGE_IMAGES[i]
              : null;
            return (
              <Reveal key={stage.n} delay={i * 0.1}>
                <div
                  className="rounded-2xl overflow-hidden h-full flex flex-col"
                  style={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)' }}
                >
                  {/* Stage illustration (BPC only) or banner */}
                  {stageImage ? (
                    <div className="w-full overflow-hidden" style={{ aspectRatio: '4/3', backgroundColor: '#F8F4EC' }}>
                      <img
                        src={stageImage}
                        alt={stage.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div
                      className="px-7 py-4 flex items-center gap-3"
                      style={{ borderBottom: `3px solid ${style.ring}` }}
                    >
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: style.ring }} />
                      <span className="font-body text-[11px] font-semibold uppercase tracking-[0.15em]" style={{ color: 'var(--color-text)' }}>
                        {stage.n}
                      </span>
                    </div>
                  )}
                  <div className="p-7 md:p-8 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: style.ring }} />
                      <span className="font-body text-[11px] font-semibold uppercase tracking-[0.15em]" style={{ color: 'var(--color-text-muted)' }}>
                        {stage.n}
                      </span>
                    </div>
                    <h3
                      className="font-display mb-5"
                      style={{ fontSize: '24px', fontWeight: 600, color: stage.state === 'healed' ? accent.hex : 'var(--color-text-strong)', letterSpacing: '-0.01em' }}
                    >
                      {stage.title}
                    </h3>
                    <ul className="space-y-3.5">
                      {stage.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-3" style={{ borderTop: '1px solid var(--color-border)', paddingTop: '12px' }}>
                          <span
                            className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                            style={{
                              border: `1.5px solid ${style.ring}40`,
                              color: style.iconColor,
                            }}
                          >
                            {style.icon}
                          </span>
                          <span className="font-body text-[14px]" style={{ color: 'var(--color-text)', lineHeight: 1.55 }}>
                            {b}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   6. Clinical outcomes — big lead stat + 3 secondary
   ───────────────────────────────────────── */

function ClinicalOutcomes({ product, accent }: { product: Product; accent: { hex: string; soft: string; deep: string } }) {
  const data = CLINICAL_OUTCOMES[product.slug];
  if (!data) return null;

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container-main">
        <Reveal className="mb-10 md:mb-14 max-w-3xl">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-body text-[11px] font-semibold uppercase tracking-[0.15em] mb-5" style={{ color: 'var(--color-text-muted)' }}>
            <span className="inline-flex items-center gap-1.5" style={{ color: accent.hex }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent.hex }} />
              {data.eyebrow}
            </span>
            <span style={{ color: 'var(--color-text-subtle)' }}>·</span>
            <span>4 findings</span>
            <span style={{ color: 'var(--color-text-subtle)' }}>·</span>
            <span>{data.userCount}</span>
          </div>
          <h2
            className="font-display mb-5"
            style={{ fontSize: 'clamp(2rem, 4.2vw, 3.25rem)', letterSpacing: '-0.025em', lineHeight: 1.05, color: 'var(--color-text-strong)' }}
          >
            {data.headline}{' '}
            <span style={{ color: accent.hex, fontWeight: 600 }}>{data.emphasis}</span>
          </h2>
          <p className="font-body" style={{ fontSize: '16px', lineHeight: 1.65, color: 'var(--color-text-secondary)' }}>
            {data.body}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">
          {/* Lead outcome — big card */}
          <Reveal className="lg:col-span-7">
            <div
              className="rounded-2xl p-8 md:p-12 h-full flex flex-col justify-end relative overflow-hidden"
              style={{ backgroundColor: accent.deep, color: '#fff', minHeight: '420px' }}
            >
              <div
                className="absolute inset-0"
                style={{ background: `radial-gradient(ellipse at 30% 20%, ${accent.hex}55 0%, transparent 70%)` }}
              />
              <div className="relative">
                <p className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] mb-6 inline-flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#fff' }} />
                  Lead outcome
                </p>
                <p
                  className="font-display tabular mb-3"
                  style={{ fontSize: 'clamp(4rem, 9vw, 7.5rem)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 0.9, color: '#fff' }}
                >
                  <AnimatedCounter
                    value={parseFloat(data.lead.percent)}
                    suffix={data.lead.percent.replace(/[\d.]/g, '')}
                    decimals={data.lead.percent.includes('.') ? 1 : 0}
                  />
                </p>
                <h3 className="font-display mb-4" style={{ fontSize: '24px', fontWeight: 600, letterSpacing: '-0.01em', color: '#fff' }}>
                  {data.lead.label}
                </h3>
                <p className="font-body max-w-md" style={{ fontSize: '14px', lineHeight: 1.65, color: 'rgba(255,255,255,0.85)' }}>
                  {data.lead.body}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Secondary outcomes stacked */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-5 md:gap-6">
            {data.secondary.map((s, i) => (
              <Reveal key={s.n} delay={0.1 + i * 0.08}>
                <div className="p-7 rounded-xl h-full flex" style={{ backgroundColor: 'var(--color-bg-soft)', border: '1px solid var(--color-border)' }}>
                  <div className="flex-shrink-0 mr-5">
                    <p
                      className="font-display tabular"
                      style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 700, color: accent.hex, letterSpacing: '-0.02em', lineHeight: 1 }}
                    >
                      <AnimatedCounter
                        value={parseFloat(s.percent)}
                        suffix={s.percent.replace(/[\d.]/g, '')}
                        decimals={s.percent.includes('.') ? 1 : 0}
                      />
                    </p>
                  </div>
                  <div className="flex-1">
                    <p className="font-body text-[11px] font-semibold tabular-nums mb-1" style={{ color: 'var(--color-text-subtle)' }}>
                      Outcome {s.n}
                    </p>
                    <h4 className="font-display mb-2" style={{ fontSize: '17px', fontWeight: 600, color: 'var(--color-text-strong)', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                      {s.title}
                    </h4>
                    <p className="font-body text-[13px]" style={{ color: 'var(--color-text-muted)', lineHeight: 1.55 }}>
                      {s.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   7. Ingredients — supplement facts label
   ───────────────────────────────────────── */

function Ingredients({ product, accent }: { product: Product; accent: { hex: string; soft: string; deep: string } }) {
  const primary = product.ingredients[0];

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-soft)' }}>
      <div className="container-main">
        <Reveal className="mb-12">
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: accent.hex }}>
            What's inside
          </p>
          <h2
            className="font-display"
            style={{ fontSize: 'clamp(1.875rem, 3.8vw, 3rem)', letterSpacing: '-0.025em', lineHeight: 1.1, color: 'var(--color-text-strong)' }}
          >
            Nothing you didn't <span style={{ fontWeight: 600 }}>ask for.</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <Reveal>
            <div className="p-7 md:p-9 rounded-xl h-full" style={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
              <div className="h-1 w-12 mb-5" style={{ backgroundColor: accent.hex }} />
              <h3 className="font-display mb-1" style={{ fontSize: '22px', fontWeight: 600, color: 'var(--color-text-strong)', letterSpacing: '-0.01em' }}>
                {primary.name}
              </h3>
              <p className="font-body text-[13px] mb-5" style={{ color: 'var(--color-text-muted)' }}>
                {primary.amount}
              </p>
              <p className="font-body text-[15px] mb-5" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>
                {primary.description}
              </p>
              <a
                href={primary.studyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-body text-[13px] font-medium transition-opacity hover:opacity-70"
                style={{ color: accent.hex }}
              >
                Read the study — {primary.studyRef}
                <ArrowRight size={13} strokeWidth={1.75} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="p-7 md:p-8 h-full" style={{ backgroundColor: 'var(--color-bg)', border: '2px solid var(--color-text-strong)' }}>
              <h4 className="font-body font-bold mb-1" style={{ fontSize: '20px', color: 'var(--color-text-strong)', letterSpacing: '-0.01em' }}>
                Supplement Facts
              </h4>
              <p className="font-body text-[12px]" style={{ color: 'var(--color-text-secondary)' }}>
                Serving Size: {product.servingSize}
              </p>
              <p className="font-body text-[12px] mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                Servings Per Container: {product.servingsPerContainer}
              </p>
              <div style={{ borderTop: '8px solid var(--color-text-strong)' }} />
              <div className="flex justify-between py-2.5" style={{ borderBottom: '1px solid var(--color-text-strong)' }}>
                <span className="font-body text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-strong)' }}>
                  Amount per serving
                </span>
                <span className="font-body text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-strong)' }}>
                  % DV
                </span>
              </div>
              {product.ingredients.map((ing) => (
                <div key={ing.name} className="flex justify-between py-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <div>
                    <span className="font-body text-[14px] font-bold block" style={{ color: 'var(--color-text-strong)' }}>
                      {ing.name}
                    </span>
                    <span className="font-body text-[13px]" style={{ color: 'var(--color-text-strong)' }}>
                      {ing.amount}
                    </span>
                  </div>
                  <span className="font-body text-[14px]" style={{ color: 'var(--color-text-muted)' }}>*</span>
                </div>
              ))}
              <p className="font-body text-[11px] mt-3" style={{ color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                * Daily Value not established. Other ingredients: vegetable cellulose capsule, rice flour. Vegan, gluten-free.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   8. Receipts — transparency
   ───────────────────────────────────────── */

function Receipts({ product, accent }: { product: Product; accent: { hex: string; soft: string; deep: string } }) {
  const [coaOpen, setCoaOpen] = useState(false);

  // Universal process imagery (same files in both product folders).
  const baseFolder = product.slug === 'nattokinase' ? 'mehr_nattokinase_images' : 'mehr_bpc157_images';
  const items: Array<{ title: string; body: string; image: string; cta?: { label: string; onClick: () => void } }> = [
    {
      title: 'Made in USA',
      body: 'Manufactured in a cGMP-certified, FDA-registered facility in Utah. Inspected and audited annually.',
      image: `/images/${baseFolder}/hf_20260509_224610_e476b3fe-9bf5-4199-9c7b-bdc2cfc49758.webp`,
    },
    {
      title: '3rd-party tested',
      body: "Every batch independently tested for identity, potency, and contaminants. We publish the actual COA — not a marketing summary.",
      image: `/images/${baseFolder}/hf_20260509_223555_25d89c20-5077-4405-95b7-eef4b34bb859.webp`,
      cta: { label: 'View Certificate of Analysis', onClick: () => setCoaOpen(true) },
    },
    {
      title: 'Heavy metals tested',
      body: 'Lead < 0.5 ppm (limit: 10). Cadmium < 0.1 ppm (limit: 4.1). Mercury < 0.1 ppm (limit: 2). All passing, every batch.',
      image: `/images/${baseFolder}/hf_20260509_223133_fc94a788-a32c-4934-b15b-1aad571c732d.webp`,
    },
  ];

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container-main">
        <Reveal className="text-center mb-12 md:mb-16">
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: 'var(--color-text-muted)' }}>
            The receipts
          </p>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', letterSpacing: '-0.02em', lineHeight: 1.15, color: 'var(--color-text-strong)' }}>
            Nothing to <span style={{ fontWeight: 600 }}>hide.</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {items.map((item, idx) => (
            <Reveal key={item.title} delay={idx * 0.08}>
              <div className="rounded-xl h-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-soft)', border: '1px solid var(--color-border)' }}>
                <div className="w-full overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-7">
                  <div className="h-1 w-10 mb-5" style={{ backgroundColor: accent.hex }} />
                  <h3 className="font-display mb-3" style={{ fontSize: '19px', fontWeight: 600, color: 'var(--color-text-strong)', letterSpacing: '-0.01em' }}>
                    {item.title}
                  </h3>
                  <p className="font-body text-[14px]" style={{ color: 'var(--color-text-muted)', lineHeight: 1.65 }}>
                    {item.body}
                  </p>
                  {item.cta && (
                    <button
                      onClick={item.cta.onClick}
                      className="inline-flex items-center gap-1.5 font-body text-[13px] font-medium mt-4 transition-opacity hover:opacity-70"
                      style={{ color: accent.hex }}
                    >
                      {item.cta.label}
                      <ArrowRight size={13} strokeWidth={1.75} />
                    </button>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <COAModal isOpen={coaOpen} onClose={() => setCoaOpen(false)} productName={product.name} coaUrl={product.coaUrl} coaLabel={product.coaLabel} />
    </section>
  );
}

/* ─────────────────────────────────────────
   9. Directions — editorial moment
   ───────────────────────────────────────── */

function Directions({ product, accent }: { product: Product; accent: { hex: string; soft: string; deep: string } }) {
  const dosePhrase = product.servingSize.replace(/\s*capsules?\b/i, (m) => `${m}.`);

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-soft)' }}>
      <div className="container-narrow text-center">
        <Reveal>
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] mb-6" style={{ color: accent.hex }}>
            Directions
          </p>
          <h2
            className="font-display mb-8"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.025em', lineHeight: 1.1, color: 'var(--color-text-strong)' }}
          >
            {dosePhrase} With breakfast. <span style={{ fontWeight: 600 }}>Daily.</span>
          </h2>
          <p className="font-body" style={{ fontSize: '16px', lineHeight: 1.65, color: 'var(--color-text-muted)' }}>
            {product.howToUse}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   10. Comparison
   ───────────────────────────────────────── */

function Comparison({ product, accent }: { product: Product; accent: { hex: string; soft: string; deep: string } }) {
  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container-main">
        <Reveal className="text-center mb-12">
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: 'var(--color-text-muted)' }}>
            How we compare
          </p>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', letterSpacing: '-0.02em', lineHeight: 1.15, color: 'var(--color-text-strong)' }}>
            MEHR vs. <span style={{ fontWeight: 600 }}>everything else.</span>
          </h2>
        </Reveal>

        <Reveal>
          <div className="overflow-x-auto rounded-xl" style={{ backgroundColor: 'var(--color-bg-soft)', border: '1px solid var(--color-border)' }}>
            <table className="w-full font-body text-[14px] md:text-[15px]">
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-text-strong)' }}>
                  <th className="text-left py-4 px-5 md:px-7 font-medium w-[40%]" style={{ color: 'var(--color-text-muted)' }}>
                    Feature
                  </th>
                  <th className="text-left py-4 px-5 md:px-7 font-semibold" style={{ color: 'var(--color-text-strong)' }}>
                    <span style={{ color: accent.hex }}>MEHR</span>
                  </th>
                  <th className="text-left py-4 px-5 md:px-7 font-medium" style={{ color: 'var(--color-text-muted)' }}>
                    Other brands
                  </th>
                </tr>
              </thead>
              <tbody>
                {product.comparisonTable.map((row) => (
                  <tr key={row.feature} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td className="py-4 px-5 md:px-7 font-medium" style={{ color: 'var(--color-text)' }}>
                      {row.feature}
                    </td>
                    <td className="py-4 px-5 md:px-7">
                      <span className="inline-flex items-center gap-2 font-medium" style={{ color: 'var(--color-text-strong)' }}>
                        <Check size={15} strokeWidth={2.5} style={{ color: accent.hex }} />
                        {row.ourValue}
                      </span>
                    </td>
                    <td className="py-4 px-5 md:px-7" style={{ color: 'var(--color-text-muted)' }}>
                      <span className="inline-flex items-center gap-2">
                        <X size={15} strokeWidth={1.75} style={{ color: 'var(--color-text-subtle)' }} />
                        {row.theirValue}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   11. Guarantee — risk reversal
   ───────────────────────────────────────── */

function Guarantee({ accent }: { accent: { hex: string; soft: string; deep: string } }) {
  return (
    <section className="section-padding" style={{ backgroundColor: accent.deep, color: '#fff', position: 'relative', overflow: 'hidden' }}>
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(ellipse at 80% 20%, ${accent.hex}40 0%, transparent 60%)` }}
      />
      <div className="container-main relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] mb-5 inline-flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#fff' }} />
                Our promise · 60-day guarantee
              </p>
              <h2
                className="font-display mb-6"
                style={{ fontSize: 'clamp(2rem, 4.4vw, 3.5rem)', letterSpacing: '-0.025em', lineHeight: 1.1, color: '#fff' }}
              >
                Your purchase is protected by our{' '}
                <span style={{ backgroundColor: accent.hex, padding: '0.05em 0.3em', borderRadius: '4px', fontWeight: 600 }}>60-day money-back guarantee</span>.
              </h2>
              <p className="font-body mb-3" style={{ fontSize: '17px', lineHeight: 1.7, color: 'rgba(255,255,255,0.85)' }}>
                If you don't feel a measurable change in your blood pressure, your energy, or your peace of mind in 60 days — send the bottle back. <strong style={{ color: '#fff' }}>Even if it's empty.</strong>
              </p>
              <p className="font-body" style={{ fontSize: '15px', lineHeight: 1.7, color: 'rgba(255,255,255,0.7)' }}>
                We'll refund every dollar. No forms. No phone calls you don't want to make. No proving-you-tried-it questions.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="lg:col-span-5">
            <div className="grid grid-cols-1 gap-4">
              {[
                { n: '01', kicker: 'Tested', body: 'Every batch lab verified before it ships.' },
                { n: '02', kicker: 'Risk-free', body: '60 days to feel the change yourself.' },
                { n: '03', kicker: 'Refunded', body: 'Send the bottle back even if it\'s empty.' },
              ].map((c) => (
                <div
                  key={c.n}
                  className="rounded-xl p-5 md:p-6 flex items-start gap-4"
                  style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
                >
                  <span className="font-body text-[12px] font-semibold tabular-nums mt-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>{c.n}</span>
                  <div>
                    <p className="font-body text-[11px] font-semibold uppercase tracking-[0.15em] mb-1" style={{ color: '#fff' }}>
                      {c.kicker}
                    </p>
                    <p className="font-body text-[14px]" style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.55 }}>
                      {c.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   12. Reviews
   ───────────────────────────────────────── */

function Reviews({ product }: { product: Product }) {
  const avg = product.reviews.length ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length : 0;

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container-main">
        <Reveal className="mb-10">
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: 'var(--color-text-muted)' }}>
            Real customers, real results
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="font-display" style={{ fontSize: 'clamp(1.875rem, 3.8vw, 3rem)', letterSpacing: '-0.025em', lineHeight: 1.1, color: 'var(--color-text-strong)' }}>
              It helps. Hear from <span style={{ fontWeight: 600 }}>real users.</span>
            </h2>
            <div className="flex items-baseline gap-3">
              <span
                className="font-display tabular-nums"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, color: 'var(--color-text-strong)', letterSpacing: '-0.02em', lineHeight: 1 }}
              >
                {avg.toFixed(1)}
              </span>
              <div>
                <StarRating rating={avg} size={16} showValue={false} />
                <p className="font-body text-[13px] mt-1" style={{ color: 'var(--color-text-muted)' }}>
                  Based on {product.reviews.length} verified reviews
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {product.reviews.slice(0, 6).map((review, i) => (
            <Reveal key={review.id} delay={i * 0.05}>
              <ReviewCard review={review} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   13. FAQ
   ───────────────────────────────────────── */

function FAQ({ product, accent }: { product: Product; accent: { hex: string; soft: string; deep: string } }) {
  const faqs = useMemo(() => site.faqs.filter((f) => product.faqIds.includes(f.id)), [product]);
  const [open, setOpen] = useState<string | null>(null);
  if (!faqs.length) return null;

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-soft)' }}>
      <div className="container-narrow">
        <Reveal className="mb-10 text-center">
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: 'var(--color-text-muted)' }}>
            Common questions
          </p>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.875rem, 3.8vw, 3rem)', letterSpacing: '-0.025em', lineHeight: 1.1, color: 'var(--color-text-strong)' }}>
            Frequently <span style={{ fontWeight: 600 }}>asked.</span>
          </h2>
        </Reveal>

        <Reveal>
          <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
            {faqs.map((faq, i) => {
              const isOpen = open === faq.id;
              return (
                <div key={faq.id} style={{ borderBottom: i < faqs.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
                  <button
                    onClick={() => setOpen(isOpen ? null : faq.id)}
                    className="w-full flex items-center justify-between gap-6 py-5 px-6 md:px-8 text-left transition-colors hover:bg-[color:var(--color-bg-soft)] focus-ring"
                  >
                    <span className="font-body text-[15px] md:text-[16px] font-medium" style={{ color: 'var(--color-text-strong)' }}>
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={18}
                      style={{
                        color: isOpen ? accent.hex : 'var(--color-text-muted)',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                        transition: 'transform 0.25s ease',
                        flexShrink: 0,
                      }}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p className="font-body text-[14px] md:text-[15px] px-6 md:px-8 pb-5" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   14. Related
   ───────────────────────────────────────── */

function Related({ product }: { product: Product }) {
  const related = useMemo(() => site.products.find((p) => product.relatedSlugs.includes(p.slug)), [product]);
  if (!related) return null;
  const relatedAccent = accentFor(related.slug);

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container-main">
        <Reveal className="text-center mb-10">
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: 'var(--color-text-muted)' }}>
            The full ritual
          </p>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', letterSpacing: '-0.025em', lineHeight: 1.15, color: 'var(--color-text-strong)' }}>
            Complete your daily <span style={{ fontWeight: 600 }}>stack.</span>
          </h2>
        </Reveal>

        <Reveal>
          <Link
            to={`/products/${related.slug}`}
            className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-10 p-6 md:p-10 rounded-2xl items-center transition-all hover:shadow-md"
            style={{ backgroundColor: relatedAccent.soft, border: `1px solid ${relatedAccent.hex}20` }}
          >
            <div className="md:col-span-2 rounded-xl overflow-hidden" style={{ aspectRatio: '1/1', backgroundColor: 'var(--color-surface)' }}>
              <img src={related.image} alt={related.name} className="w-full h-full object-cover" />
            </div>
            <div className="md:col-span-3">
              <div className="h-1 w-12 mb-4" style={{ backgroundColor: relatedAccent.hex }} />
              <h3 className="font-display mb-2" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 600, color: 'var(--color-text-strong)', letterSpacing: '-0.01em', lineHeight: 1.15 }}>
                {related.name}
              </h3>
              <p className="font-body text-[15px] mb-5" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                {related.tagline}
              </p>
              <div className="flex items-center gap-4">
                <span className="font-display" style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-strong)' }}>
                  ${related.price}
                </span>
                <span className="inline-flex items-center gap-1.5 font-body text-[13px] font-medium" style={{ color: relatedAccent.hex }}>
                  View product
                  <ArrowRight size={13} strokeWidth={2} />
                </span>
              </div>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   15. Sticky mobile bar
   ───────────────────────────────────────── */

function StickyMobileBar({ product, onAddToCart }: { product: Product; onAddToCart: (productId: string, quantity: number, subscription: boolean) => void }) {
  const [adding, setAdding] = useState(false);
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden p-3"
      style={{ backgroundColor: 'var(--color-bg)', borderTop: '1px solid var(--color-border)', boxShadow: 'var(--shadow-lg)' }}
    >
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <p className="font-body text-[11px]" style={{ color: 'var(--color-text-muted)' }}>{product.name}</p>
          <p className="font-display" style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-strong)' }}>${product.price}</p>
        </div>
        <button
          onClick={() => {
            setAdding(true);
            onAddToCart(product.id, 1, false);
            setTimeout(() => setAdding(false), 900);
          }}
          disabled={adding}
          className="px-6 py-3.5 rounded-lg font-body text-[14px] font-medium flex items-center gap-2"
          style={{ backgroundColor: 'var(--color-text-strong)', color: 'var(--color-text-inverse)' }}
        >
          {adding ? <><Check size={16} /> Added</> : 'Add to cart'}
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Page
   ───────────────────────────────────────── */

export default function ProductDetailPage({ onAddToCart }: ProductDetailPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const product = useMemo(() => site.products.find((p) => p.slug === slug), [slug]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center pt-28">
        <div className="text-center">
          <h1 className="font-display mb-4" style={{ color: 'var(--color-text)' }}>Product Not Found</h1>
          <Link to="/shop" className="btn-secondary">Back to shop</Link>
        </div>
      </div>
    );
  }

  const accent = accentFor(product.slug);

  return (
    <div className="pb-24 lg:pb-0">
      <Hero product={product} accent={accent} onAddToCart={onAddToCart} />
      <HeroMarquee product={product} accent={accent} />
      <HeroSocialProof product={product} accent={accent} />
      <ProblemAgitation product={product} accent={accent} />
      <ClinicalEffects product={product} accent={accent} />
      <Manifesto product={product} accent={accent} />
      <Mechanism product={product} accent={accent} />
      <Transformation product={product} accent={accent} />
      <ClinicalOutcomes product={product} accent={accent} />
      <Ingredients product={product} accent={accent} />
      <Receipts product={product} accent={accent} />
      <Directions product={product} accent={accent} />
      <Comparison product={product} accent={accent} />
      <Guarantee accent={accent} />
      <Reviews product={product} />
      <FAQ product={product} accent={accent} />
      <Related product={product} />
      <Footer />
      <StickyMobileBar product={product} onAddToCart={onAddToCart} />
    </div>
  );
}
