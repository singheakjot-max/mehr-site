import { Link } from 'react-router-dom';
import { site } from '@/content/site';
import { X, Minus, Plus, Truck } from 'lucide-react';
import TrustStrip from '@/components/TrustStrip';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartProducts: {
    productId: string;
    quantity: number;
    subscription: boolean;
    product?: {
      name: string;
      slug: string;
      price: number;
      subscriptionPrice: number;
      image: string;
    };
  }[];
  subtotal: number;
  freeShippingProgress: number;
  isFreeShipping: boolean;
  onUpdateQuantity: (productId: string, subscription: boolean, quantity: number) => void;
  onRemove: (productId: string, subscription: boolean) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartProducts,
  subtotal,
  freeShippingProgress,
  isFreeShipping,
  onUpdateQuantity,
  onRemove,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const threshold = site.promises.freeShippingThreshold;
  const remaining = Math.max(threshold - subtotal, 0);

  return (
    <>
      <div
        className="fixed inset-0 z-[60] transition-opacity"
        style={{ backgroundColor: 'rgba(10, 10, 10, 0.3)' }}
        onClick={onClose}
      />
      <div
        className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-md overflow-y-auto"
        style={{
          backgroundColor: 'var(--color-surface)',
          boxShadow: 'var(--shadow-xl)',
        }}
      >
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--color-border)' }}>
          <h2 className="font-display" style={{ fontSize: '20px', color: 'var(--color-text)' }}>
            Your Cart
          </h2>
          <button onClick={onClose} className="p-2 -mr-2 focus-ring" aria-label="Close cart">
            <X size={20} style={{ color: 'var(--color-text)' }} />
          </button>
        </div>

        {cartProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-6">
            <ShoppingCartIcon />
            <p className="font-body mt-4 text-center" style={{ color: 'var(--color-text-muted)', fontSize: '15px' }}>
              Your cart is empty
            </p>
            <p className="font-body mt-2 text-center" style={{ color: 'var(--color-text-subtle)', fontSize: '14px' }}>
              Explore our products to find what works for you.
            </p>
            <Link
              to="/shop"
              onClick={onClose}
              className="btn-primary mt-8"
            >
              Shop All Products
            </Link>
          </div>
        ) : (
          <>
            <div className="px-6 py-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-body" style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                  {isFreeShipping ? (
                    <span className="flex items-center gap-2" style={{ color: 'var(--color-success)' }}>
                      <Truck size={14} /> Free shipping unlocked
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Truck size={14} /> ${remaining.toFixed(2)} away from free shipping
                    </span>
                  )}
                </span>
              </div>
              <div
                className="w-full h-1.5 rounded-full overflow-hidden"
                style={{ backgroundColor: 'var(--color-border-subtle)' }}
              >
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${freeShippingProgress}%`,
                    backgroundColor: isFreeShipping ? 'var(--color-success)' : 'var(--color-accent)',
                  }}
                />
              </div>
            </div>

            <div className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
              {cartProducts.map((item) => (
                <div key={`${item.productId}-${item.subscription}`} className="p-6 flex gap-4">
                  <div
                    className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden"
                    style={{ backgroundColor: 'var(--color-surface-raised)' }}
                  >
                    <img
                      src={item.product?.image || '/images/placeholder.svg'}
                      alt={item.product?.name || 'Product'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span
                          className="font-body font-medium block truncate"
                          style={{ fontSize: '14px', color: 'var(--color-text)' }}
                        >
                          {item.product?.name || 'Product'}
                        </span>
                        {item.subscription && (
                          <span
                            className="font-body inline-block mt-1 px-2 py-0.5 rounded-full"
                            style={{
                              fontSize: '11px',
                              backgroundColor: 'var(--color-success-bg)',
                              color: 'var(--color-success)',
                            }}
                          >
                            Subscribe & Save 15%
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => onRemove(item.productId, item.subscription)}
                        className="p-1 flex-shrink-0 focus-ring"
                        aria-label="Remove item"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div
                        className="flex items-center rounded-md border overflow-hidden"
                        style={{ borderColor: 'var(--color-border)' }}
                      >
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.productId, item.subscription, item.quantity - 1)
                          }
                          className="p-2 hover:bg-black/5 transition-colors focus-ring"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} style={{ color: 'var(--color-text)' }} />
                        </button>
                        <span
                          className="font-body w-8 text-center"
                          style={{ fontSize: '14px', color: 'var(--color-text)' }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.productId, item.subscription, item.quantity + 1)
                          }
                          className="p-2 hover:bg-black/5 transition-colors focus-ring"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} style={{ color: 'var(--color-text)' }} />
                        </button>
                      </div>
                      <span className="font-body font-medium" style={{ fontSize: '14px', color: 'var(--color-text)' }}>
                        ${(item.subscription ? (item.product?.subscriptionPrice || 0) : (item.product?.price || 0)) * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 border-t" style={{ borderColor: 'var(--color-border)' }}>
              <div className="flex items-center justify-between mb-6">
                <span className="font-body" style={{ fontSize: '15px', color: 'var(--color-text-muted)' }}>
                  Subtotal
                </span>
                <span className="font-display" style={{ fontSize: '20px', color: 'var(--color-text)' }}>
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <button className="btn-primary w-full py-4 text-center">
                Checkout
              </button>
              <div className="mt-4">
                <TrustStrip size="sm" />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

function ShoppingCartIcon() {
  return (
    <div
      className="w-16 h-16 rounded-full flex items-center justify-center"
      style={{ backgroundColor: 'var(--color-border-subtle)' }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
    </div>
  );
}
