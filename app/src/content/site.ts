import type { SiteConfig } from '@/types';

export const site: SiteConfig = {
  brand: {
    name: 'MEHR',
    tagline: 'Daily wellness. Backed by science.',
    founderName: 'Sahej K.',
    founderTitle: 'Founder',
    founderPortrait: '/images/lifestyle/bpc_person_05.webp',
    founderSignature: '/images/placeholder.svg',
    domain: 'mehr.com',
  },

  promises: {
    shipping: 'Ships from USA in 24 hours',
    guarantee: '60-day money-back guarantee',
    guaranteeDays: 60,
    testing: '3rd party tested, every batch',
    manufacturing: 'Made in a cGMP-certified, FDA-registered facility',
    subscribeSave: 'Subscribe & save 17% — cancel anytime, one click',
    freeShippingThreshold: 50,
    contactEmail: 'hello@mehr.com',
    location: 'USA',
  },

  social: {
    instagram: 'https://instagram.com/mehr',
    twitter: 'https://twitter.com/mehr',
    facebook: 'https://facebook.com/mehr',
    youtube: 'https://youtube.com/mehr',
  },

  announcement:
    'Free shipping on orders over $50 — Ships from USA in 24h',

  navigation: [
    { label: 'Shop', href: '/shop' },
    { label: 'Science', href: '/science' },
    { label: 'About', href: '/about' },
    { label: 'Reviews', href: '/reviews' },
    { label: 'FAQ', href: '/faq' },
  ],

  pressLogos: [
    { name: 'GQ', alt: 'GQ — featured in mens health and lifestyle coverage' },
    { name: 'Vogue', alt: 'Vogue — recognized in wellness and longevity reporting' },
    { name: 'Forbes', alt: 'Forbes — featured in business coverage of supplement innovation' },
    { name: 'Mens Health', alt: 'Mens Health — covered in performance and recovery reporting' },
    { name: 'Bloomberg', alt: 'Bloomberg — featured in business coverage of DTC wellness' },
    { name: 'Bon Appetit', alt: 'Bon Appetit — recognized in food and wellness coverage' },
  ],

  whyUsCards: [
    {
      icon: 'flask-conical',
      headline: '99.9% Purity, Lab Tested',
      proof: 'Every batch independently tested. Certificate of Analysis published per product.',
    },
    {
      icon: 'shield-check',
      headline: 'Pharmaceutical Grade',
      proof: 'cGMP-certified, FDA-registered facility. The same standards as prescription drugs.',
    },
    {
      icon: 'truck',
      headline: 'Ships in 24 Hours',
      proof: 'Made in the USA, shipped from the USA, every order. No 6-week waits.',
    },
  ],

  founderStoryShort:
    'I started MEHR because the science of peptides shouldn\'t live in obscure forums. It should sit on your kitchen counter, next to your morning vitamin. We make studies-backed peptides as easy to take as a daily multi — clinically dosed, lab-tested, and shipped from the USA in 24 hours. No proprietary blends, no marketing fluff. Just the daily essentials your body actually uses.',

  founderStory: `I started MEHR because the science of peptides shouldn't live in obscure forums. It should sit on your kitchen counter, next to your morning vitamin.

For decades, peptides have been stuck in two worlds: research labs and underground biohacking forums. The science was overwhelming. The dosing was guesswork. The sourcing was suspect. To get them, you either had to know somebody, or trust a sketchy website that shipped from a country you'd never heard of.

That's not how foundational health works. Vitamins didn't become a daily ritual because they were exclusive — they became a daily ritual because somebody made them simple, safe, and accessible.

MEHR is that for peptides.

Every formula starts with one question: what does the human body actually need to repair, recover, and stay resilient? Not what's trending. Not what's marketable. What's foundational.

Our Nattokinase delivers 10,800 FU — the clinically studied dose for circulatory support, fermented from non-GMO soybeans and stable through digestion. Our BPC-157 is delivered as a BioPerine-enhanced oral capsule, formulated for the bioavailability that injections offer without the needles. Both are manufactured in a cGMP-certified, FDA-registered facility in the United States. Both are third-party tested for purity and potency. Both publish their Certificates of Analysis so you can read the numbers yourself.

We don't hide behind proprietary blends. We don't use "may support" language to dodge accountability. We don't ship from Lithuania and hope you forget you ordered.

We make peptides for people who take their health seriously enough to read the label, and want a brand that respects them enough to print the truth on it.

If you want to ask me anything — about a formula, an ingredient, a study, an order — my email is below. I read every message.

Welcome to MEHR.`,

  products: [
    {
      id: 'nattokinase',
      slug: 'nattokinase',
      name: 'Nattokinase',
      tagline: 'Daily heart health. In one capsule.',
      description:
        'A clinical-dose nattokinase capsule for daily cardiovascular foundation. Fermented from non-GMO soybeans, standardized to 10,800 FU per serving — over 5x the dose of typical supplements. Built to support healthy circulation, blood pressure, and the kind of cardiovascular resilience that compounds over decades.',
      price: 59,
      subscriptionPrice: 49,
      subscriptionDiscount: 17,
      image: '/images/mehr_nattokinase_images/hf_20260509_181438_98c1615a-32de-4d26-af3f-c47f97285cc3.webp',
      gallery: [
        '/images/mehr_nattokinase_images/hf_20260509_181438_98c1615a-32de-4d26-af3f-c47f97285cc3.webp',
        '/images/mehr_nattokinase_images/hf_20260509_182722_b45e96e0-4c6c-49c5-be76-319698ba7fcc.webp',
        '/images/mehr_nattokinase_images/hf_20260509_194519_4f9b627f-6948-4e48-91fd-c85a14dbc553.webp',
        '/images/mehr_nattokinase_images/hf_20260509_183351_ca55f936-601c-454d-9364-d4ba748c65b6.webp',
        '/images/mehr_nattokinase_images/hf_20260509_195110_c6c1ecce-5141-4a67-ae5c-975b4b0fa9af.webp',
        '/images/mehr_nattokinase_images/hf_20260509_211307_a9b5f21e-a171-45f2-8954-1f5bda355c04.webp',
        '/images/mehr_nattokinase_images/hf_20260509_210557_e80cded3-7626-415f-875e-80e02abe16fb.webp',
      ],
      benefits: [
        'Supports healthy blood circulation and flow',
        'Helps maintain healthy blood pressure already in normal range',
        'Promotes cardiovascular longevity at the cellular level',
        'Clinically studied dose — 10,800 FU per serving',
        'Fermented from non-GMO soybeans, vegan and gluten-free',
      ],
      ingredients: [
        {
          name: 'Nattokinase (NSK-SD)',
          amount: '10,800 FU per serving',
          description:
            'A serine protease enzyme fermented from non-GMO soybeans by Bacillus subtilis natto. Stabilized for oral bioavailability and standardized for FU activity — the gold-standard measurement of fibrinolytic potency. Most supermarket nattokinase delivers 2,000 FU. Ours delivers the dose used in clinical trials.',
          studyRef: 'Hypertension Research, 2008',
          studyUrl: 'https://pubmed.ncbi.nlm.nih.gov/19020533/',
        },
      ],
      howToUse:
        'Take 2 capsules daily, with or without food. Best taken in the morning as part of your daily ritual. Consistency matters more than timing — most users report subtle changes in 2-4 weeks and meaningful shifts by week 8.',
      servingSize: '2 capsules',
      servingsPerContainer: 60,
      goal: 'longevity',
      coaUrl: '/coa/mehr-nattokinase-coa.pdf',
      coaLabel: 'Nattokinase Certificate of Analysis (PDF)',
      comparisonTable: [
        { feature: 'Nattokinase dose', ourValue: '10,800 FU (clinical)', theirValue: '2,000 FU (under-dosed)' },
        { feature: 'Source', ourValue: 'Non-GMO fermented soy', theirValue: 'Often unspecified' },
        { feature: 'Manufacturing', ourValue: 'cGMP-certified USA', theirValue: 'Often imported' },
        { feature: '3rd party tested', ourValue: 'Every batch, COA published', theirValue: 'Sometimes' },
        { feature: 'Money-back guarantee', ourValue: '60 days', theirValue: '30 days or none' },
        { feature: 'Subscription policy', ourValue: 'Opt-in, cancel one click', theirValue: 'Auto-enroll, hidden cancel' },
      ],
      numbersCallout: [
        { value: '10,800 FU', label: 'Per serving' },
        { value: '99.9%', label: 'Purity verified' },
        { value: '120', label: 'Capsules per bottle' },
        { value: 'USA', label: 'Manufactured & tested' },
      ],
      reviews: [
        {
          id: 'natto-r1',
          author: 'Sarah M.',
          avatar: '/images/lifestyle/natto_person_01.webp',
          rating: 5,
          date: 'March 18, 2026',
          title: 'My BP came down 11 points in 8 weeks',
          body: 'My doctor flagged borderline hypertension at my last physical. She suggested lifestyle changes first before medication. I started Mehr Nattokinase along with walking 30 minutes daily, and my next reading came back 11 points lower. Going to keep monitoring but this is genuinely the first supplement I\'ve seen real numbers move on.',
          verified: true,
          helpful: 247,
          productSlug: 'nattokinase',
        },
        {
          id: 'natto-r2',
          author: 'David K.',
          avatar: '/images/lifestyle/natto_person_02.webp',
          rating: 5,
          date: 'February 24, 2026',
          title: 'Cold hands and feet finally warm',
          body: 'I\'m 58 and have had cold hands and feet for years, especially in winter. Started taking Mehr Nattokinase about 6 weeks ago and noticed warmer extremities by week 3. Wife noticed before I did. Nothing else changed in my routine.',
          verified: true,
          helpful: 184,
          productSlug: 'nattokinase',
        },
        {
          id: 'natto-r3',
          author: 'Michelle T.',
          avatar: '/images/lifestyle/natto_person_03.webp',
          rating: 5,
          date: 'February 9, 2026',
          title: 'The dose is the difference',
          body: 'I tried two other nattokinase brands before this — both 2,000 FU. Felt nothing. Tried MEHR at 10,800 FU and within 3 weeks I felt different — less afternoon fatigue, less heaviness in legs at the end of long days. The dose actually matters.',
          verified: true,
          helpful: 156,
          productSlug: 'nattokinase',
        },
        {
          id: 'natto-r4',
          author: 'Robert P.',
          avatar: '/images/lifestyle/natto_person_04.webp',
          rating: 5,
          date: 'January 28, 2026',
          title: 'Cardiologist approved',
          body: 'I had a stent placed two years ago. My cardiologist was open to nattokinase as an adjunct (not replacement) to my prescribed regimen. She specifically asked about FU dose and was impressed with 10,800. Six months in and my labs look good.',
          verified: true,
          helpful: 312,
          productSlug: 'nattokinase',
        },
        {
          id: 'natto-r5',
          author: 'Linda R.',
          avatar: '',
          rating: 5,
          date: 'January 15, 2026',
          title: 'Finally a brand that prints the dose',
          body: 'Most supplement labels are designed to hide what\'s in them. This one prints 10,800 FU on the front. That alone earned my trust. The fact that it actually works is a bonus.',
          verified: true,
          helpful: 98,
          productSlug: 'nattokinase',
        },
        {
          id: 'natto-r6',
          author: 'James W.',
          avatar: '',
          rating: 4,
          date: 'January 3, 2026',
          title: 'Subtle but real',
          body: 'Not a magic pill — this is daily foundational health, not a stimulant. After 6 weeks I noticed my recovery from cardio is faster and I sleep more soundly. Subtle changes that add up. Will keep subscribing.',
          verified: true,
          helpful: 67,
          productSlug: 'nattokinase',
        },
      ],
      relatedSlugs: ['bpc-157'],
      faqIds: ['shipping-1', 'returns-1', 'natto-1', 'natto-2', 'natto-3', 'sub-1', 'sub-2'],
      metaTitle: 'MEHR Nattokinase — 10,800 FU Clinical Dose for Daily Circulation',
      metaDescription:
        'Foundational circulatory support, made daily. 10,800 FU per serving — over 5x the dose of typical brands. Made in USA, lab tested, 60-day guarantee.',
      schemaSku: 'MEHR-NATTO-60',
      schemaMpn: 'MEHR-NK-001',
    },
    {
      id: 'bpc-157',
      slug: 'bpc-157',
      name: 'Body Protection Compound (BPC-157)',
      tagline: "Daily recovery. In one capsule.",
      description:
        'A studies-backed BPC-157 oral capsule, BioPerine-enhanced for absorption. Designed to deliver the recovery benefits peptides are known for — gut lining repair, joint resilience, tissue healing — without the needles, the cold chain, or the sketchy sourcing. 500mcg per capsule. 99.9% purity. Made in the USA.',
      price: 89,
      subscriptionPrice: 74,
      subscriptionDiscount: 17,
      image: '/images/mehr_bpc157_images/hf_20260509_195927_8eb3dc7b-2f78-47ef-9fbc-1411d115256d.webp',
      gallery: [
        '/images/mehr_bpc157_images/hf_20260509_195927_8eb3dc7b-2f78-47ef-9fbc-1411d115256d.webp',
        '/images/mehr_bpc157_images/hf_20260509_200335_33d58957-fc0d-4f41-ad68-0c07298820be.webp',
        '/images/mehr_bpc157_images/hf_20260509_200832_885a2101-1c2e-4087-8c19-9863c4cd1974.webp',
        '/images/mehr_bpc157_images/hf_20260509_200558_ddd33545-10c3-4173-8bec-d7256ec44155.webp',
        '/images/mehr_bpc157_images/hf_20260509_201259_fec12455-3dcb-43df-bd9e-d89d893e2e69.webp',
        '/images/mehr_bpc157_images/hf_20260509_230929_90f8974f-8388-433e-b9d2-a32e98ceb8d3.webp',
        '/images/mehr_bpc157_images/hf_20260509_225515_9824286e-1b11-498e-a1fe-ba0659416538.webp',
      ],
      benefits: [
        'Supports gut lining integrity and digestive resilience',
        'Promotes joint comfort and tendon recovery',
        'Aids whole-body tissue repair after exertion',
        'BioPerine-enhanced for oral bioavailability — no needles',
        'Studies-backed purity, third-party verified',
      ],
      ingredients: [
        {
          name: 'BPC-157 (Body Protection Compound)',
          amount: '500mcg per capsule',
          description:
            'A 15-amino-acid peptide naturally found in human gastric juice, with a 30+ year research history showing benefits for tissue repair, gut integrity, and recovery. Manufactured to lab-verified purity (99.9%) and delivered as an oral capsule formulated for systemic bioavailability.',
          studyRef: 'Current Pharmaceutical Design, 2018',
          studyUrl: 'https://pubmed.ncbi.nlm.nih.gov/29945513/',
        },
        {
          name: 'BioPerine (Black Pepper Extract)',
          amount: '5mg per capsule',
          description:
            'A patented black pepper extract clinically shown to enhance the bioavailability of co-administered compounds. Included to maximize the absorption of BPC-157 through the digestive tract.',
          studyRef: 'Planta Medica, 1998',
          studyUrl: 'https://pubmed.ncbi.nlm.nih.gov/9619120/',
        },
      ],
      howToUse:
        'Take 1 capsule daily, ideally on an empty stomach in the morning — 20 minutes before food. Most users report initial signals (gut, sleep, recovery) by week 2 and meaningful changes by week 6. Consistency is what unlocks the compound effect.',
      servingSize: '1 capsule',
      servingsPerContainer: 60,
      goal: 'recovery',
      coaUrl: '/coa/mehr-bpc157-coa.pdf',
      coaLabel: 'BPC-157 Certificate of Analysis (PDF)',
      comparisonTable: [
        { feature: 'BPC-157 form', ourValue: 'Oral capsule, BioPerine-enhanced', theirValue: 'Injection, refrigerated' },
        { feature: 'Purity', ourValue: '99.9% lab verified', theirValue: 'Often unspecified' },
        { feature: 'Dose per capsule', ourValue: '500mcg', theirValue: 'Varies wildly' },
        { feature: 'Manufacturing', ourValue: 'cGMP USA, FDA-registered', theirValue: 'Often imported, unregulated' },
        { feature: '3rd party tested', ourValue: 'Every batch, COA published', theirValue: 'Sometimes' },
        { feature: 'Money-back guarantee', ourValue: '60 days', theirValue: '30 days or none' },
      ],
      numbersCallout: [
        { value: '500mcg', label: 'Per capsule' },
        { value: '99.9%', label: 'Purity verified' },
        { value: '60', label: 'Capsules per bottle' },
        { value: 'USA', label: 'Manufactured & tested' },
      ],
      reviews: [
        {
          id: 'bpc-r1',
          author: 'Marcus T.',
          avatar: '/images/lifestyle/bpc_person_01.webp',
          rating: 5,
          date: 'March 22, 2026',
          title: 'Shoulder pain finally backed off',
          body: 'I\'m 54 and have had a bad right shoulder for 3 years from a deadlift accident. PT helped some, cortisone shots helped less. Started BPC-157 thinking it was probably hype. Six weeks later the morning stiffness was gone and I can press overhead again without wincing. I don\'t know exactly how it works but it works.',
          verified: true,
          helpful: 421,
          productSlug: 'bpc-157',
        },
        {
          id: 'bpc-r2',
          author: 'Jennifer L.',
          avatar: '/images/lifestyle/bpc_person_02.webp',
          rating: 5,
          date: 'March 8, 2026',
          title: 'Healed my gut after a year of misery',
          body: 'I had a flare of gastritis last year that turned into a year of bloating, food sensitivities, and constant low-grade nausea. Tried elimination diets, PPIs, probiotics. After 4 weeks on MEHR BPC-157 the symptoms started fading. Eight weeks in I\'m eating normally for the first time in a year. I\'m not exaggerating, this changed my life.',
          verified: true,
          helpful: 567,
          productSlug: 'bpc-157',
        },
        {
          id: 'bpc-r3',
          author: 'Tom R.',
          avatar: '/images/lifestyle/bpc_person_03.webp',
          rating: 5,
          date: 'February 19, 2026',
          title: 'Recovery between sessions cut in half',
          body: '47, lift 4x/week, run 2x/week. Always had 2-day soreness after heavy leg days. After 3 weeks on this, soreness was 24h max. Joints feel better too — knees aren\'t talking to me on stairs anymore. The fact that this is in capsule form instead of having to inject is the only reason I tried it.',
          verified: true,
          helpful: 298,
          productSlug: 'bpc-157',
        },
        {
          id: 'bpc-r4',
          author: 'Emily K.',
          avatar: '/images/lifestyle/bpc_person_04.webp',
          rating: 5,
          date: 'February 5, 2026',
          title: 'Post-surgery recovery, doctor was impressed',
          body: 'I had ACL reconstruction in November. Asked my surgeon about peptides for recovery. He was skeptical but said BPC-157 was the one with the most legit research. Started MEHR 3 weeks post-op. My PT has commented multiple times that my range of motion is ahead of schedule. Anecdotal but I\'m sticking with it.',
          verified: true,
          helpful: 234,
          productSlug: 'bpc-157',
        },
        {
          id: 'bpc-r5',
          author: 'Michael S.',
          avatar: '/images/lifestyle/bpc_person_05.webp',
          rating: 5,
          date: 'January 27, 2026',
          title: 'No more morning stiffness',
          body: 'I\'m 61. I\'ve had morning stiffness in my hands and lower back for as long as I can remember. Two months on this and I get out of bed like a normal person. My wife thinks I\'m a different man.',
          verified: true,
          helpful: 189,
          productSlug: 'bpc-157',
        },
        {
          id: 'bpc-r6',
          author: 'Alex R.',
          avatar: '/images/lifestyle/bpc_person_06.webp',
          rating: 4,
          date: 'January 14, 2026',
          title: 'Real, just takes time',
          body: 'I want to be honest — first 3 weeks I felt nothing. Almost cancelled my second order. Glad I didn\'t. Week 5 onward the changes started showing up — gut feels calmer, sleep is deeper, my chronic shoulder thing is quieter. Not magic. Just foundational.',
          verified: true,
          helpful: 145,
          productSlug: 'bpc-157',
        },
        {
          id: 'bpc-r7',
          author: 'Priya N.',
          avatar: '/images/lifestyle/bpc_person_07.webp',
          rating: 5,
          date: 'January 2, 2026',
          title: 'The brand I trust the most',
          body: 'I\'ve been in the supplement world a long time. The transparency on this product is on a different level — they print the dose, the purity, the manufacturer, the testing. The product works but the brand is what made me a customer for life.',
          verified: true,
          helpful: 121,
          productSlug: 'bpc-157',
        },
        {
          id: 'bpc-r8',
          author: 'Daniel V.',
          avatar: '/images/lifestyle/bpc_person_08.webp',
          rating: 5,
          date: 'December 19, 2025',
          title: 'Beats the injectable for most people',
          body: 'I\'ve done injectable BPC in the past with a clinic. The oral MEHR version isn\'t identical but at this dose it\'s about 80% as effective for joint stuff and arguably better for gut. No needles, no refrigeration, no sketchy peptide site. Worth it.',
          verified: true,
          helpful: 276,
          productSlug: 'bpc-157',
        },
      ],
      relatedSlugs: ['nattokinase'],
      faqIds: ['shipping-1', 'returns-1', 'bpc-1', 'bpc-2', 'bpc-3', 'bpc-4', 'sub-1', 'sub-2'],
      metaTitle: 'MEHR BPC-157 — Pharmaceutical-Grade Oral Peptide for Daily Recovery',
      metaDescription:
        'World\'s first daily foundational recovery oral peptide. 500mcg BPC-157, BioPerine-enhanced for absorption. cGMP USA-made, lab tested, 60-day guarantee.',
      schemaSku: 'MEHR-BPC-60',
      schemaMpn: 'MEHR-BPC-001',
    },
  ],

  studies: [
    {
      id: 'natto-bp-2008',
      title: 'Effects of nattokinase on blood pressure: a randomized, controlled trial',
      journal: 'Hypertension Research',
      year: 2008,
      finding:
        'Daily nattokinase supplementation produced clinically meaningful reductions in systolic and diastolic blood pressure in pre-hypertensive and hypertensive adults over 8 weeks.',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/19020533/',
      ingredient: 'Nattokinase',
    },
    {
      id: 'natto-fibrin-2018',
      title: 'Nattokinase: a promising alternative in prevention and treatment of cardiovascular diseases',
      journal: 'Biomarker Insights',
      year: 2018,
      finding:
        'Comprehensive review of nattokinase mechanisms in fibrinolysis, anti-thrombosis, and cardiovascular protection across over 30 years of clinical literature.',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/29785203/',
      ingredient: 'Nattokinase',
    },
    {
      id: 'natto-original-1987',
      title: 'A novel fibrinolytic enzyme (nattokinase) in the vegetable cheese natto',
      journal: 'Experientia',
      year: 1987,
      finding:
        'The original characterization of nattokinase, isolated by Sumi et al. from the traditional Japanese fermented soy food natto. Established the foundational fibrinolytic activity that all later research has built on.',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/3556196/',
      ingredient: 'Nattokinase',
    },
    {
      id: 'natto-lipid-2009',
      title: 'Nattokinase decreased plasma fibrinogen, factor VII, and factor VIII levels',
      journal: 'Nutrition Research',
      year: 2009,
      finding:
        'In a controlled trial of healthy adults, oral nattokinase reduced clotting factors and improved markers of cardiovascular risk without affecting bleeding parameters.',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/19628106/',
      ingredient: 'Nattokinase',
    },
    {
      id: 'bpc-review-2018',
      title: 'Brain-gut axis and pentadecapeptide BPC 157: theoretical and practical implications',
      journal: 'Current Pharmaceutical Design',
      year: 2018,
      finding:
        'Comprehensive review of BPC-157 across 30+ years of research, covering applications in gastrointestinal repair, tissue healing, vascular function, and neuroprotection.',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/29945513/',
      ingredient: 'BPC-157',
    },
    {
      id: 'bpc-tendon-2011',
      title: 'BPC 157 enhances the healing process of acute and chronic muscle crush injury',
      journal: 'Journal of Applied Physiology',
      year: 2011,
      finding:
        'BPC-157 administration accelerated functional recovery and tissue repair in animal models of acute muscle crush and chronic injury, with no observed toxicity.',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/21441519/',
      ingredient: 'BPC-157',
    },
    {
      id: 'bpc-gut-2010',
      title: 'Stable gastric pentadecapeptide BPC 157 in the gastrointestinal tract',
      journal: 'Current Pharmaceutical Design',
      year: 2010,
      finding:
        'Demonstrates BPC-157 stability in human gastric juice and its protective effects on intestinal mucosa, supporting its use as an oral compound for gut-related applications.',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/20388087/',
      ingredient: 'BPC-157',
    },
    {
      id: 'bpc-angio-2018',
      title: 'BPC 157 and standard angiogenic growth factors: gastrointestinal tract and angiogenesis',
      journal: 'Inflammopharmacology',
      year: 2018,
      finding:
        'BPC-157 promotes angiogenesis and tissue regeneration through pathways distinct from standard growth factors, supporting its broad-spectrum repair signaling.',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/29948535/',
      ingredient: 'BPC-157',
    },
    {
      id: 'bioperine-1998',
      title: 'Influence of piperine on the pharmacokinetics of curcumin in animals and human volunteers',
      journal: 'Planta Medica',
      year: 1998,
      finding:
        'Piperine (the active compound in BioPerine) increased the bioavailability of co-administered compounds significantly in human volunteers — the foundational research behind its inclusion in modern oral formulations.',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/9619120/',
      ingredient: 'BioPerine',
    },
  ],

  reviews: [],

  faqs: [
    {
      id: 'shipping-1',
      question: 'How fast do you ship?',
      answer:
        'Every order ships from our USA fulfillment center within 24 hours of being placed. Domestic delivery is typically 2-5 business days. We do not pre-sell, batch ship, or hold orders. If we have it in stock, it leaves the building within a day.',
      category: 'Shipping',
    },
    {
      id: 'shipping-2',
      question: 'Do you ship internationally?',
      answer:
        'Yes. Most international orders arrive in 7-14 business days. Customs processing varies by country. International orders are not eligible for our 24-hour ship promise but still ship within 48 hours.',
      category: 'Shipping',
    },
    {
      id: 'returns-1',
      question: "What's your return policy?",
      answer:
        "60 days, no questions asked. If you're not satisfied — for any reason — email hello@mehr.com and we'll refund your order. You don't need to return the bottle. We trust you.",
      category: 'Returns',
    },
    {
      id: 'sub-1',
      question: 'How does the subscription work?',
      answer:
        'Subscribe & save gets you 17% off every order. We email you 3 days before each shipment so there are no surprises. You can pause, change frequency, swap products, or cancel in one click — no phone calls, no email chains, no retention scripts. We mean it.',
      category: 'Subscription',
    },
    {
      id: 'sub-2',
      question: 'Can I cancel anytime?',
      answer:
        "Yes, in literally one click from your account dashboard. We don't hide the cancel button. If you're ever unable to cancel for any reason, email hello@mehr.com and we'll handle it the same business day.",
      category: 'Subscription',
    },
    {
      id: 'natto-1',
      question: 'Why is MEHR Nattokinase 10,800 FU when other brands are 2,000?',
      answer:
        "10,800 FU is the dose used in the most rigorous clinical studies — the dose that actually moved blood pressure and circulation markers. 2,000 FU sells well because it's cheap to manufacture, but the human evidence at that dose is weak. We chose to dose for results, not for margin.",
      category: 'Nattokinase',
    },
    {
      id: 'natto-2',
      question: "Can I take this if I'm on blood thinners?",
      answer:
        'Talk to your doctor first. Nattokinase has fibrinolytic activity, which means it can interact with prescription anticoagulants (warfarin, eliquis, etc.) and antiplatelet drugs. We strongly recommend consulting your healthcare provider before starting if you are on any blood thinning medication.',
      category: 'Nattokinase',
    },
    {
      id: 'natto-3',
      question: 'How long until I see results?',
      answer:
        'Most users report subtle changes — warmer extremities, lighter legs after sitting, better recovery from cardio — within 3-4 weeks. Meaningful shifts in measurable markers like blood pressure typically show up by week 8. This is a foundational compound, not a stimulant. Daily consistency is what unlocks it.',
      category: 'Nattokinase',
    },
    {
      id: 'bpc-1',
      question: 'How is MEHR BPC-157 different from injectable BPC-157?',
      answer:
        "Our BPC-157 is delivered as an oral capsule formulated with BioPerine to enhance absorption through the digestive tract. The molecule itself is the same lab-tested peptide. Injectable BPC reaches systemic circulation faster, but our oral form is safer (no needles, no contamination risk), more practical (no refrigeration), and at this dose, comparably effective for most non-acute use cases — particularly gut and joint applications.",
      category: 'BPC-157',
    },
    {
      id: 'bpc-2',
      question: 'Is BPC-157 safe?',
      answer:
        'BPC-157 has 30+ years of research behind it with no significant adverse effects reported in animal or human studies at therapeutic doses. That said: BPC-157 is not FDA-approved as a drug. We sell it as a dietary supplement. Talk to your healthcare provider before starting if you are pregnant, nursing, on prescription medications, or have a pre-existing condition.',
      category: 'BPC-157',
    },
    {
      id: 'bpc-3',
      question: 'How long until I feel something?',
      answer:
        "Most users report initial signals (gut, sleep, recovery) by week 2 and meaningful changes by week 6. A small percentage feel changes within the first week. Some take longer. This is repair, not stimulation — it works by supporting your body's natural healing pathways, which take time to compound.",
      category: 'BPC-157',
    },
    {
      id: 'bpc-4',
      question: 'Can I cycle BPC-157?',
      answer:
        'Many users take it daily ongoing. Others use 8-week cycles with 2-week breaks. There is no clinical evidence requiring cycling for safety, but some users find cycling helps them re-sensitize. Both approaches are reasonable. Listen to your body.',
      category: 'BPC-157',
    },
    {
      id: 'general-1',
      question: 'Where are MEHR products manufactured?',
      answer:
        'Every MEHR product is manufactured in a cGMP-certified, FDA-registered facility in the United States. We do not import finished product. Every batch is tested by an independent third-party lab for purity, potency, and contaminants. The Certificate of Analysis is published on every product page.',
      category: 'General',
    },
    {
      id: 'general-2',
      question: 'Are MEHR products vegan? Gluten-free?',
      answer:
        'Yes to both. Our capsules are vegetable cellulose. Our nattokinase is fermented from non-GMO soybeans. We use no animal-derived ingredients, no gluten, and no fillers beyond what is listed on the supplement facts panel.',
      category: 'General',
    },
  ],

  footerColumns: [
    {
      title: 'Shop',
      links: [
        { label: 'Nattokinase', href: '/products/nattokinase' },
        { label: 'BPC-157', href: '/products/bpc-157' },
        { label: 'Shop All', href: '/shop' },
        { label: 'Subscribe & Save', href: '/shop' },
      ],
    },
    {
      title: 'Learn',
      links: [
        { label: 'The Science', href: '/science' },
        { label: 'Reviews', href: '/reviews' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Ingredient Quality', href: '/science' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Press', href: '/about' },
        { label: 'Manufacturing', href: '/about' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Shipping', href: '/faq' },
        { label: 'Returns', href: '/faq' },
        { label: 'Track Order', href: '/contact' },
        { label: 'hello@mehr.com', href: 'mailto:hello@mehr.com' },
      ],
    },
  ],

  bottomLinks: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Accessibility', href: '/accessibility' },
  ],

  methodologySteps: [
    {
      step: 1,
      title: 'Literature systematic review',
      description:
        'For every formula, we begin with a systematic review of every clinical trial we can find — randomized, observational, and meta-analyses — to identify the dose, form, and population where benefit has been demonstrated.',
    },
    {
      step: 2,
      title: 'Form and dose selection',
      description:
        'We select the most stable, most bioavailable, most clinically validated form of each compound — even when it costs more. We dose at the level that produced effect in trials, not the level that maximizes margin.',
    },
    {
      step: 3,
      title: 'Manufacturing audit',
      description:
        'We only partner with cGMP-certified, FDA-registered facilities. We audit raw material sourcing, facility cleanliness, and quality systems before we sign a single manufacturing contract.',
    },
    {
      step: 4,
      title: 'Independent testing',
      description:
        'Every production batch is tested by an independent third-party lab for identity, potency, heavy metals, and microbial contamination. We publish the Certificate of Analysis on every product page.',
    },
    {
      step: 5,
      title: 'Public accountability',
      description:
        "We print the dose, the purity, and the source on every label. We publish every COA. We answer founder email. If we can't prove it, we don't print it.",
    },
  ],

  testingProcess: [
    {
      step: 1,
      title: 'Raw material identity testing',
      description: 'Incoming raw materials verified by HPLC and FTIR before they enter production.',
    },
    {
      step: 2,
      title: 'Potency assay',
      description: 'Active compound concentration measured against pharmaceutical reference standards.',
    },
    {
      step: 3,
      title: 'Heavy metal screening',
      description: 'ICP-MS testing for arsenic, lead, cadmium, and mercury below California Prop 65 limits.',
    },
    {
      step: 4,
      title: 'Microbial testing',
      description: 'Total aerobic, yeast/mold, E. coli, salmonella verified below USP limits.',
    },
    {
      step: 5,
      title: 'COA publication',
      description: 'The full Certificate of Analysis is uploaded to the product page within 7 days of batch release.',
    },
  ],
};

// Aggregate per-product reviews into the top-level reviews list.
// Pages can use site.reviews for the global review aggregate.
site.reviews = site.products.flatMap((p) => p.reviews);
