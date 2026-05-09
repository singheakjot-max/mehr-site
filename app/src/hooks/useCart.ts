import { useState, useCallback, useMemo } from 'react';
import type { CartItem } from '@/types';
import { site } from '@/content/site';

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback(
    (productId: string, quantity: number, subscription: boolean) => {
      setItems((prev) => {
        const existing = prev.find(
          (i) => i.productId === productId && i.subscription === subscription
        );
        if (existing) {
          return prev.map((i) =>
            i.productId === productId && i.subscription === subscription
              ? { ...i, quantity: i.quantity + quantity }
              : i
          );
        }
        return [...prev, { productId, quantity, subscription }];
      });
      setIsOpen(true);
    },
    []
  );

  const removeItem = useCallback((productId: string, subscription: boolean) => {
    setItems((prev) =>
      prev.filter(
        (i) => !(i.productId === productId && i.subscription === subscription)
      )
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: string, subscription: boolean, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId, subscription);
        return;
      }
      setItems((prev) =>
        prev.map((i) =>
          i.productId === productId && i.subscription === subscription
            ? { ...i, quantity }
            : i
        )
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => setItems([]), []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const cartProducts = useMemo(() => {
    return items.map((item) => {
      const product = site.products.find((p) => p.id === item.productId);
      return { ...item, product };
    }).filter((item) => item.product !== undefined);
  }, [items]);

  const subtotal = useMemo(() => {
    return cartProducts.reduce((sum, item) => {
      const price = item.subscription
        ? item.product!.subscriptionPrice
        : item.product!.price;
      return sum + price * item.quantity;
    }, 0);
  }, [cartProducts]);

  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const freeShippingProgress = useMemo(() => {
    return Math.min((subtotal / site.promises.freeShippingThreshold) * 100, 100);
  }, [subtotal]);

  const isFreeShipping = subtotal >= site.promises.freeShippingThreshold;

  return {
    items,
    cartProducts,
    isOpen,
    subtotal,
    itemCount,
    freeShippingProgress,
    isFreeShipping,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
  };
}
