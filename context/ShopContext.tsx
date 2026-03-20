'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Product, CartItem } from '@/types';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ShopContextType {
  /* Data */
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  /* Async state */
  isLoading: boolean;
  error: string | null;
  /* Cart actions */
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateCartQuantity: (productId: string, size: string, delta: number) => void;
  clearCart: () => void;
  /* Wishlist actions */
  toggleWishlist: (productId: string) => void;
  /* Derived */
  totalItems: number;
  totalPrice: number;
  wishlistedProducts: Product[];
}

// ─── Context ──────────────────────────────────────────────────────────────────

const ShopContext = createContext<ShopContextType | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────

export const ShopProvider: React.FC<{ 
  children: React.ReactNode;
  initialProducts?: Product[];
}> = ({
  children,
  initialProducts = [],
}) => {
  const [products, setProducts]   = useState<Product[]>(initialProducts);
  const [cart, setCart]           = useState<CartItem[]>([]);
  const [wishlist, setWishlist]   = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError]         = useState<string | null>(null);

  // ── Hydrate cart & wishlist from localStorage (client-only) ────────────────
  useEffect(() => {
    try {
      const savedCart     = localStorage.getItem('ananya_cart');
      const savedWishlist = localStorage.getItem('ananya_wishlist');
      if (savedCart)     setCart(JSON.parse(savedCart));
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch {
      // Ignore corrupt storage
    }
  }, []);

  // ── Persist cart ───────────────────────────────────────────────────────────
  useEffect(() => {
    localStorage.setItem('ananya_cart', JSON.stringify(cart));
  }, [cart]);

  // ── Persist wishlist ───────────────────────────────────────────────────────
  useEffect(() => {
    localStorage.setItem('ananya_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // ── Fetch products from Next.js API route ──────────────────────────────────
  useEffect(() => {
    // Optimization: Don't re-fetch if we already have products
    if (products.length > 0) {
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/products', { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error('[ShopContext] fetchProducts:', err);
          setError('Failed to load products. Please refresh the page.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
    return () => controller.abort();
  }, [products.length]);

  // ── Cart helpers ───────────────────────────────────────────────────────────

  const addToCart = useCallback((product: Product, size: string) => {
    // BUG FIX: guard against missing sizes array
    const safeSize = size || product.sizes?.[0] || 'Free Size';

    setCart((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.selectedSize === safeSize
      );
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.selectedSize === safeSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedSize: safeSize }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string, size: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.id === productId && item.selectedSize === size))
    );
  }, []);

  const updateCartQuantity = useCallback(
    (productId: string, size: string, delta: number) => {
      setCart((prev) =>
        prev.map((item) => {
          if (item.id === productId && item.selectedSize === size) {
            const newQty = Math.max(1, item.quantity + delta);
            return { ...item, quantity: newQty };
          }
          return item;
        })
      );
    },
    []
  );

  const clearCart = useCallback(() => setCart([]), []);

  // ── Wishlist helpers ───────────────────────────────────────────────────────

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }, []);

  // ── Derived values ─────────────────────────────────────────────────────────

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  // BUG FIX: wishlist page was using the static empty PRODUCTS array.
  // Now resolved using context products so wishlist always works correctly.
  const wishlistedProducts = useMemo(
    () => products.filter((p) => wishlist.includes(p.id)),
    [products, wishlist]
  );

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        wishlist,
        isLoading,
        error,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        totalItems,
        totalPrice,
        wishlistedProducts,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

// ─── Hook ──────────────────────────────────────────────────────────────────────

export const useShop = (): ShopContextType => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within a ShopProvider');
  return context;
};
