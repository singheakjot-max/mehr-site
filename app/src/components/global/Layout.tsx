import { useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import AnnouncementBar from './AnnouncementBar';
import Header from './Header';
import CartDrawer from './CartDrawer';

interface CartContextType {
  addItem: (productId: string, quantity: number, subscription: boolean) => void;
  itemCount: number;
}

export { type CartContextType };

import { createContext, useContext } from 'react';

const CartContext = createContext<CartContextType>({
  addItem: () => {},
  itemCount: 0,
});

export function useCartContext() {
  return useContext(CartContext);
}

export default function Layout() {
  const cart = useCart();

  const handleAddToCart = useCallback(
    (productId: string, quantity: number, subscription: boolean) => {
      cart.addItem(productId, quantity, subscription);
    },
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        addItem: handleAddToCart,
        itemCount: cart.itemCount,
      }}
    >
      <AnnouncementBar />
      <Header cartCount={cart.itemCount} onOpenCart={cart.openCart} />
      <CartDrawer
        isOpen={cart.isOpen}
        onClose={cart.closeCart}
        cartProducts={cart.cartProducts}
        subtotal={cart.subtotal}
        freeShippingProgress={cart.freeShippingProgress}
        isFreeShipping={cart.isFreeShipping}
        onUpdateQuantity={cart.updateQuantity}
        onRemove={cart.removeItem}
      />
      <Outlet />
    </CartContext.Provider>
  );
}
