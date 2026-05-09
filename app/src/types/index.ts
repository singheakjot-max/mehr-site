export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  subscriptionPrice: number;
  subscriptionDiscount: number;
  image: string;
  gallery: string[];
  benefits: string[];
  ingredients: Ingredient[];
  howToUse: string;
  servingSize: string;
  servingsPerContainer: number;
  goal: GoalCategory;
  coaUrl: string;
  coaLabel: string;
  comparisonTable: ComparisonRow[];
  numbersCallout: NumbersCallout[];
  reviews: Review[];
  relatedSlugs: string[];
  faqIds: string[];
  metaTitle: string;
  metaDescription: string;
  schemaSku: string;
  schemaMpn: string;
}

export interface Ingredient {
  name: string;
  amount: string;
  description: string;
  studyRef: string;
  studyUrl: string;
}

export interface ComparisonRow {
  feature: string;
  ourValue: string;
  theirValue: string;
}

export interface NumbersCallout {
  value: string;
  label: string;
}

export type GoalCategory = 'energy' | 'sleep' | 'recovery' | 'longevity' | 'gut' | 'cognition' | 'all';

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
  helpful: number;
  productSlug?: string;
  image?: string;
}

export interface Study {
  id: string;
  title: string;
  journal: string;
  year: number;
  finding: string;
  sourceUrl: string;
  ingredient: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface PressLogo {
  name: string;
  alt: string;
}

export interface WhyUsCard {
  icon: string;
  headline: string;
  proof: string;
}

export interface BrandConfig {
  name: string;
  tagline: string;
  founderName: string;
  founderTitle: string;
  founderPortrait: string;
  founderSignature: string;
  domain: string;
}

export interface PromiseConfig {
  shipping: string;
  guarantee: string;
  guaranteeDays: number;
  testing: string;
  manufacturing: string;
  subscribeSave: string;
  freeShippingThreshold: number;
  contactEmail: string;
  location: string;
}

export interface SocialLinks {
  instagram: string;
  twitter: string;
  facebook: string;
  youtube: string;
}

export interface SiteConfig {
  brand: BrandConfig;
  promises: PromiseConfig;
  social: SocialLinks;
  announcement: string;
  pressLogos: PressLogo[];
  whyUsCards: WhyUsCard[];
  products: Product[];
  studies: Study[];
  reviews: Review[];
  faqs: FAQ[];
  navigation: NavLink[];
  footerColumns: FooterColumn[];
  bottomLinks: { label: string; href: string }[];
  founderStory: string;
  founderStoryShort: string;
  methodologySteps: MethodologyStep[];
  testingProcess: TestingStep[];
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface MethodologyStep {
  step: number;
  title: string;
  description: string;
}

export interface TestingStep {
  step: number;
  title: string;
  description: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  subscription: boolean;
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'rating';
