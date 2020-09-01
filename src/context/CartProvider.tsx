import React, { useState, useCallback, useMemo } from 'react'
import * as typeDefs from '@generated/graphql'

type ShopItem = Pick<typeDefs.ShopItem, 'name' | 'images' | 'price'>

interface CartItem extends Omit<typeDefs.CartItem, 'pid' | 'shopItem'> {
  shopItem: ShopItem
}

interface Cart {
  cart: CartItem[]
  qty: number
  subTotal: number
}

interface ContextState {
  cart: Cart
  addToCartHandler: (cartItem: CartItem) => void
  removeFromCart: (pid: string) => void
  editCartItemHandler: (data: any, qty: number) => void
}

export const CartContext = React.createContext<ContextState>({
  cart: {
    cart: [],
    qty: 0,
    subTotal: 0,
  },
  addToCartHandler: () => null,
  removeFromCart: () => null,
  editCartItemHandler: () => null,
})

const CartProvider: React.FC = (props) => {
  const [cart, setCart] = useState<Cart>({
    cart: [],
    qty: 0,
    subTotal: 0,
  })

  const editCartItemHandler = useCallback((data: CartItem, qty: number) => {
    setCart((prevCart) => {
      const itemToEdit = prevCart.cart.findIndex(
        (cartItemAdded) =>
          data.shopPid === cartItemAdded.shopPid &&
          data.color === cartItemAdded.color &&
          data.size === cartItemAdded.size
      )
      console.log(itemToEdit)
      if (itemToEdit !== -1) {
        const updatedCart = [...prevCart.cart]
        const difference = qty - updatedCart[itemToEdit].qty
        updatedCart[itemToEdit].qty += difference
        return {
          cart: updatedCart,
          qty: prevCart.qty += difference,
          subTotal: prevCart.subTotal += difference * data.shopItem.price,
        }
      }
      return prevCart
    })
  }, [])

  const addToCartHandler = useCallback((cartItem: CartItem) => {
    setCart((prevCart) => {
      const itemToAppendTo = prevCart.cart.findIndex(
        (cartItemAdded) =>
          cartItem.shopPid === cartItemAdded.shopPid &&
          cartItem.color === cartItemAdded.color &&
          cartItem.size === cartItemAdded.size
      )
      if (itemToAppendTo !== -1) {
        const updatedCart = [...prevCart.cart]
        let updatedQty = prevCart.qty
        let subTotal = prevCart.subTotal
        updatedCart[itemToAppendTo].qty += cartItem.qty
        updatedQty += cartItem.qty
        subTotal += cartItem.shopItem.price * cartItem.qty
        return {
          cart: updatedCart,
          qty: updatedQty,
          subTotal: subTotal,
        }
      }
      return {
        cart: [...prevCart.cart, cartItem],
        qty: prevCart.qty += cartItem.qty,
        subTotal: prevCart.subTotal + cartItem.shopItem.price * cartItem.qty,
      }
    })
  }, [])

  const removeFromCart = useCallback((pid: string) => {
    setCart((prevCart) => {
      const itemToRemove = prevCart.cart.find((cartItem) => pid === cartItem.shopPid)
      return {
        cart: prevCart.cart.filter((cartItem) => cartItem.shopPid !== pid),
        qty: prevCart.qty - (itemToRemove ? itemToRemove.qty : 0),
        subTotal:
          prevCart.subTotal - (itemToRemove ? itemToRemove.shopItem.price * itemToRemove.qty : 0),
      }
    })
  }, [])

  const cartPackage = useMemo(() => {
    return { cart, addToCartHandler, removeFromCart, editCartItemHandler }
  }, [cart, addToCartHandler, removeFromCart, editCartItemHandler])

  console.log(cart)

  return <CartContext.Provider value={cartPackage}>{props.children}</CartContext.Provider>
}

export default CartProvider
