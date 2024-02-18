import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { Product } from './typings/productTypings';

interface CartState {
  cart: Product[];
  addToCart : (product: Product) => void;
  removeFromCart : (product: Product) => void;
}

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set,get) => ({
        cart: [],
        addToCart: (product) => {
            set((state) => ({
                cart: [...state.cart, product],
            }));
        },
        removeFromCart: (product) => { 
            const producToRemove = get().cart.findIndex(
                (p) => p.meta.sku === product.meta.sku
            );

            set((state) => {
                const newCart = [...state.cart];

                newCart.splice(producToRemove,1);
                return {cart: newCart}
            })
        }
    }),
            {
                name: "shopping-cart-storage",
        }
    ),
  ),
)