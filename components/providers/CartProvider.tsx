'use client'

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'

export type Product = {
  id: string
  name: string
  price: number
  image: string
  stripePriceId: string
}

export type CartItem = Product & { quantity: number }

type CartState = {
  items: CartItem[]
  isOpen: boolean
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product }
  | { type: 'REMOVE_ITEM'; id: string }
  | { type: 'UPDATE_QTY'; id: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'HYDRATE'; items: CartItem[] }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.product.id)
      if (existing) {
        return {
          ...state,
          isOpen: true,
          items: state.items.map(i =>
            i.id === action.product.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        }
      }
      return {
        ...state,
        isOpen: true,
        items: [...state.items, { ...action.product, quantity: 1 }],
      }
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.id) }
    case 'UPDATE_QTY':
      if (action.quantity <= 0) {
        return { ...state, items: state.items.filter(i => i.id !== action.id) }
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.id ? { ...i, quantity: action.quantity } : i
        ),
      }
    case 'CLEAR_CART':
      return { ...state, items: [] }
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen }
    case 'OPEN_CART':
      return { ...state, isOpen: true }
    case 'CLOSE_CART':
      return { ...state, isOpen: false }
    case 'HYDRATE':
      return { ...state, items: action.items }
    default:
      return state
  }
}

type CartContextType = {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product) => void
  removeItem: (id: string) => void
  updateQty: (id: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  totalItems: number
  subtotal: number
  freeShipping: boolean
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false })

  // Persist cart to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('na-cart')
    if (saved) {
      try {
        dispatch({ type: 'HYDRATE', items: JSON.parse(saved) })
      } catch {}
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('na-cart', JSON.stringify(state.items))
  }, [state.items])

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const freeShipping = subtotal >= 20

  return (
    <CartContext.Provider value={{
      items: state.items,
      isOpen: state.isOpen,
      addItem: (product) => dispatch({ type: 'ADD_ITEM', product }),
      removeItem: (id) => dispatch({ type: 'REMOVE_ITEM', id }),
      updateQty: (id, quantity) => dispatch({ type: 'UPDATE_QTY', id, quantity }),
      clearCart: () => dispatch({ type: 'CLEAR_CART' }),
      toggleCart: () => dispatch({ type: 'TOGGLE_CART' }),
      openCart: () => dispatch({ type: 'OPEN_CART' }),
      closeCart: () => dispatch({ type: 'CLOSE_CART' }),
      totalItems,
      subtotal,
      freeShipping,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

// Product catalogue — update stripePriceId once you set up Stripe
export const PRODUCTS: Product[] = [
  {
    id: 'shield',
    name: 'Never Again Shield',
    price: 19.99,
    image: '/images/shield.png',
    stripePriceId: process.env.STRIPE_SHIELD_PRICE_ID || 'price_shield',
  },
  {
    id: 'rescue',
    name: 'Never Again Rescue',
    price: 19.99,
    image: '/images/rescue.png',
    stripePriceId: process.env.STRIPE_RESCUE_PRICE_ID || 'price_rescue',
  },
  {
    id: 'bundle',
    name: 'The Never Again System (Bundle)',
    price: 29.99,
    image: '/images/bundle.png',
    stripePriceId: process.env.STRIPE_BUNDLE_PRICE_ID || 'price_bundle',
  },
]
