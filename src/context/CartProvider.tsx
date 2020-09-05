import React, { useState, useRef, useCallback, useMemo, useContext, useEffect } from 'react'
import * as typeDefs from '@generated/graphql'
import { UserContext } from '@context/UserProvider'
import { sliceArray, round } from '@utils/helpers'
import { GET_CART, SET_CART } from '@queries/index'
import axios, { CancelTokenSource } from 'axios'

interface Cart {
  cart: { local: typeDefs.CartItem[]; user: typeDefs.CartItem[] }
  qty: number
  subTotal: number
  lastUpdatedUserCartItem: null | { item: typeDefs.CartItem; type: 'edit' | 'delete' }
}

interface ContextState {
  cart: Cart
  addToCartHandler: (cartItem: typeDefs.CartItem, type: 'create' | 'edit', qty?: number) => void
  removeFromCart: (pid: string) => void
  editingState: { error: null | string; loading: boolean }
}

export const CartContext = React.createContext<ContextState>({
  cart: {
    cart: { local: [], user: [] },
    qty: 0,
    subTotal: 0,
    lastUpdatedUserCartItem: null,
  },
  addToCartHandler: () => null,
  removeFromCart: () => null,
  editingState: { error: null, loading: false },
})

const CartProvider: React.FC = (props) => {
  const { user } = useContext(UserContext)
  const [cart, setCart] = useState<Cart>({
    cart: { local: [], user: [] },
    qty: 0,
    subTotal: 0,
    lastUpdatedUserCartItem: null,
  })
  const lastRequestCancelFn = useRef<CancelTokenSource | null>()
  const mounting = useRef<boolean>(true)
  const [editingState, setEditingState] = useState<{ error: null | string; loading: boolean }>({
    error: null,
    loading: false,
  })

  const addItemToStorage = useCallback((cart: typeDefs.CartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [])

  useEffect(() => {
    if (mounting.current) {
      const cart = localStorage.getItem('cart')
      if (cart) {
        const localCartItems = JSON.parse(cart) as typeDefs.CartItem[]
        let qty = 0
        let subTotal = 0
        for (const cartItem of localCartItems) {
          qty += cartItem.qty
          subTotal += round(cartItem.qty * cartItem.shopItem.price)
        }
        setCart({
          cart: { local: localCartItems, user: [] },
          qty,
          subTotal,
          lastUpdatedUserCartItem: null,
        })
      }
      mounting.current = false
    } else {
      addItemToStorage(cart.cart.local)
      if (user.user && cart.lastUpdatedUserCartItem) {
        const [request, cancelFn] = sendAxiosRequest(SET_CART, user.user, cart.cart.user)
        lastRequestCancelFn.current?.cancel()
        lastRequestCancelFn.current = cancelFn
        request()
          .then(() => {
            setEditingState({ error: null, loading: false })
            setCart((prevCart) => {
              return {
                ...prevCart,
                lastUpdatedUserCartItem: null,
              }
            })
          })
          .catch(() => {
            setEditingState({ error: 'Hmm. Please check your internet connection', loading: false })
          })
      } else {
        setEditingState({ error: null, loading: false })
      }
    }
  }, [mounting, user.user, cart, addItemToStorage])

  useEffect(() => {
    if (user.user) {
      const [request] = sendAxiosRequest(GET_CART, user.user)
      request()
        .then((result) => {
          const cartItemsToAdd = (result as { getCart: typeDefs.CartItem[] }).getCart
          let qty = 0
          let subTotal = 0
          for (const cartItem of cartItemsToAdd) {
            qty += cartItem.qty
            subTotal += round(cartItem.qty * cartItem.shopItem.price)
          }
          setCart((prevCart) => {
            let localQty = 0
            let localSubTotal = 0
            for (const localCartItem of prevCart.cart.local) {
              localQty += localCartItem.qty
              localSubTotal += round(localCartItem.qty * localCartItem.shopItem.price)
            }
            return {
              cart: { local: prevCart.cart.local, user: cartItemsToAdd },
              qty: qty + localQty,
              subTotal: subTotal + localSubTotal,
              lastUpdatedUserCartItem: null,
            }
          })
        })
        .catch(() => {
          return
        })
    } else {
      setCart((prevCart) => {
        let qtyUsers = 0
        let subTotalUsers = 0
        for (const cartItem of prevCart.cart.user) {
          qtyUsers += cartItem.qty
          subTotalUsers += round(cartItem.qty * cartItem.shopItem.price)
        }
        return {
          cart: { local: prevCart.cart.local, user: [] },
          qty: prevCart.qty - qtyUsers,
          subTotal: prevCart.subTotal - subTotalUsers,
          lastUpdatedUserCartItem: null,
        }
      })
    }
  }, [user.user])

  const editCartItemHandler = useCallback(
    (data: typeDefs.CartItem, qty: number, type: 'edit' | 'create') => {
      if (!user.user) {
        setCart((prevCart) => {
          const { cart, qtyDifference, subTotalDifference } = editOrCreateCartItem(
            prevCart.cart.local,
            data,
            qty,
            type
          )
          return {
            cart: { local: cart, user: [] },
            qty: prevCart.qty += qtyDifference,
            subTotal: prevCart.subTotal += subTotalDifference,
            lastUpdatedUserCartItem: null,
          }
        })
      } else {
        setCart((prevCart) => {
          const { filteredCart, itemFiltered } = filterCartItems(prevCart.cart.local, data, type)
          if (itemFiltered) {
            const difference = type === 'edit' ? qty - itemFiltered.qty : qty
            const userCart = [
              ...prevCart.cart.user,
              { ...itemFiltered, qty: itemFiltered.qty += difference },
            ]
            return {
              cart: {
                local: filteredCart,
                user: userCart,
              },
              qty: prevCart.qty += difference,
              subTotal: prevCart.subTotal += round(difference * itemFiltered.shopItem.price),
              lastUpdatedUserCartItem: { item: itemFiltered, type: 'edit' },
            }
          } else {
            const {
              cart: userCart,
              qtyDifference,
              subTotalDifference,
              cartItem,
            } = editOrCreateCartItem(prevCart.cart.user, data, qty, type)
            return {
              cart: { local: prevCart.cart.local, user: userCart },
              qty: prevCart.qty += qtyDifference,
              subTotal: prevCart.subTotal += subTotalDifference,
              lastUpdatedUserCartItem: { item: cartItem, type: 'edit' },
            }
          }
        })
      }
    },
    [user.user]
  )

  const addToCartHandler = useCallback(
    async (cartItem: typeDefs.CartItem, type: 'create' | 'edit', qty?: number) => {
      setEditingState({ error: null, loading: true })
      editCartItemHandler(cartItem, qty ? qty : cartItem.qty, type)
    },
    [editCartItemHandler]
  )

  const removeFromCart = useCallback(
    (pid: string) => {
      if (!user.user) {
        setCart((prevCart) => {
          const { filteredCart, itemFiltered } = filterCartItems(prevCart.cart.local, pid, 'edit')
          if (itemFiltered) {
            return {
              cart: { local: filteredCart, user: prevCart.cart.user },
              qty: prevCart.qty - itemFiltered.qty,
              subTotal: round(prevCart.subTotal - itemFiltered.qty * itemFiltered.shopItem.price),
              lastUpdatedUserCartItem: null,
            }
          }
          return prevCart
        })
      } else {
        setCart((prevCart) => {
          const { filteredCart, itemFiltered } = filterCartItems(prevCart.cart.user, pid, 'edit')
          if (itemFiltered) {
            return {
              cart: { local: prevCart.cart.local, user: filteredCart },
              qty: prevCart.qty - itemFiltered.qty,
              subTotal: round(prevCart.subTotal - itemFiltered.qty * itemFiltered.shopItem.price),
              lastUpdatedUserCartItem: { item: itemFiltered, type: 'delete' },
            }
          } else {
            const { filteredCart, itemFiltered } = filterCartItems(prevCart.cart.local, pid, 'edit')
            if (itemFiltered) {
              return {
                cart: { local: filteredCart, user: prevCart.cart.user },
                qty: prevCart.qty - itemFiltered.qty,
                subTotal: round(prevCart.subTotal - itemFiltered.qty * itemFiltered.shopItem.price),
                lastUpdatedUserCartItem: null,
              }
            }
          }
          return prevCart
        })
      }
    },
    [user.user]
  )

  const cartPackage = useMemo(() => {
    return { cart, addToCartHandler, removeFromCart, editingState }
  }, [cart, addToCartHandler, removeFromCart, editingState])

  return <CartContext.Provider value={cartPackage}>{props.children}</CartContext.Provider>
}

export default CartProvider

const editOrCreateCartItem = (
  cart: typeDefs.CartItem[],
  data: typeDefs.CartItem,
  qty: number,
  type: 'edit' | 'create'
) => {
  let itemToEdit
  if (type === 'edit') {
    itemToEdit = cart.findIndex((cartItemAdded) => cartItemAdded.pid === data.pid)
  } else {
    itemToEdit = cart.findIndex((cartItemAdded) => {
      return (
        cartItemAdded.shopPid === data.shopPid &&
        cartItemAdded.size === data.size &&
        cartItemAdded.color === data.color
      )
    })
  }
  if (itemToEdit !== -1) {
    const updatedCart = [...cart]
    const difference = type === 'edit' ? qty - updatedCart[itemToEdit].qty : qty
    updatedCart[itemToEdit].qty += difference
    return {
      cart: updatedCart,
      qtyDifference: difference,
      subTotalDifference: difference * data.shopItem.price,
      cartItem: updatedCart[itemToEdit],
    }
  }
  return {
    cart: [...cart, data],
    qtyDifference: qty,
    subTotalDifference: round(qty * data.shopItem.price),
    cartItem: data,
  }
}

const filterCartItems = (
  cart: typeDefs.CartItem[],
  data: typeDefs.CartItem | string,
  type: 'create' | 'edit'
) => {
  let itemToFilter
  if (typeof data === 'string') {
    itemToFilter = cart.findIndex((cartItem) => cartItem.pid === data)
  } else if (type === 'edit') {
    itemToFilter = cart.findIndex((cartItem) => cartItem.pid === data.pid)
  } else {
    itemToFilter = cart.findIndex((cartItemAdded) => {
      return (
        cartItemAdded.shopPid === data.shopPid &&
        cartItemAdded.size === data.size &&
        cartItemAdded.color === data.color
      )
    })
  }
  if (itemToFilter === -1) {
    return { filteredCart: cart, itemFiltered: null }
  }
  return { filteredCart: sliceArray(cart, itemToFilter), itemFiltered: cart[itemToFilter] }
}

const sendAxiosRequest = (
  query: string,
  user: firebase.User,
  variables?: typeDefs.CartItemInput[]
): [() => Promise<any>, CancelTokenSource] => {
  const source = axios.CancelToken.source()
  return [
    async () => {
      const idToken = await user.getIdToken()
      const res = await axios.post(
        '/api/graphql',
        { query, variables: { data: variables } },
        { cancelToken: source.token, headers: { authorization: `Bearer ${idToken}` } }
      )
      return res.data.data
    },
    source,
  ]
}
