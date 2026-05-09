import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/global/Layout';
import { useCartContext } from '@/components/global/Layout';
import HomePage from '@/pages/HomePage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import ShopPage from '@/pages/ShopPage';
import AboutPage from '@/pages/AboutPage';
import SciencePage from '@/pages/SciencePage';
import ReviewsPage from '@/pages/ReviewsPage';
import FAQPage from '@/pages/FAQPage';
import ContactPage from '@/pages/ContactPage';

function ProductPageWrapper() {
  const { addItem, itemCount } = useCartContext();
  return <ProductDetailPage onAddToCart={addItem} cartCount={itemCount} />;
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:slug" element={<ProductPageWrapper />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/science" element={<SciencePage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>
    </Routes>
  );
}
