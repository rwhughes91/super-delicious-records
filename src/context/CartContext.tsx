import React, { useState, useCallback, useMemo } from 'react'
import * as typeDefs from '@generated/graphql'

interface Cart {
  cart: typeDefs.CartItem[]
  qty: number
  subTotal: number
}

interface ContextState {
  cart: Cart
  addToCartHandler: (cartItem: typeDefs.CartItem) => void
  removeFromCart: (pid: string) => void
}

export const CartContext = React.createContext<ContextState>({
  cart: {
    cart: [],
    qty: 0,
    subTotal: 0,
  },
  addToCartHandler: () => null,
  removeFromCart: () => null,
})

const CartProvider: React.FC = (props) => {
  const [cart, setCart] = useState<Cart>({
    cart: [],
    qty: 0,
    subTotal: 0,
  })

  const addToCartHandler = useCallback((cartItem: typeDefs.CartItem) => {
    setCart((prevCart) => {
      const itemToAppendTo = prevCart.cart.findIndex(
        (cartItemAded) => cartItem.pid === cartItemAded.pid
      )
      if (itemToAppendTo !== -1) {
        const updatedCart = [...prevCart.cart]
        updatedCart[itemToAppendTo].qty += cartItem.qty
        return {
          cart: updatedCart,
          qty: prevCart.qty + 1,
          subTotal: prevCart.subTotal + cartItem.shopItem.price * cartItem.qty,
        }
      }
      return {
        cart: [...prevCart.cart, cartItem],
        qty: prevCart.qty + 1,
        subTotal: prevCart.subTotal + cartItem.shopItem.price * cartItem.qty,
      }
    })
  }, [])

  const removeFromCart = useCallback((pid: string) => {
    setCart((prevCart) => {
      const itemToRemove = prevCart.cart.find((cartItem) => pid === cartItem.pid)
      return {
        cart: prevCart.cart.filter((cartItem) => cartItem.pid !== pid),
        qty: prevCart.qty - (itemToRemove ? 1 : 0),
        subTotal:
          prevCart.subTotal - (itemToRemove ? itemToRemove.shopItem.price * itemToRemove.qty : 0),
      }
    })
  }, [])

  const cartPackage = useMemo(() => {
    return { cart, addToCartHandler, removeFromCart }
  }, [cart, addToCartHandler, removeFromCart])

  return <CartContext.Provider value={cartPackage}>{props.children}</CartContext.Provider>
}

export default CartProvider
