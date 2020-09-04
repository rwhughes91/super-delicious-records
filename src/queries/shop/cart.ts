import { gql } from 'graphql-request'

export const GET_CART = gql`
  query GetCart {
    getCart {
      pid
      shopPid
      size
      color
      qty
      shopItem {
        name
        price
        images {
          imageUrl
          imageSetUrl
          alt
          color
        }
      }
    }
  }
`

export const ADD_TO_CART = gql`
  mutation AddToCart($data: CartItemInput!) {
    addToCart(data: $data)
  }
`

export const SET_CART = gql`
  mutation SetCart($data: [CartItemInput!]!) {
    setCart(data: $data)
  }
`

export const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($data: String!) {
    removeFromCart(pid: $data)
  }
`
