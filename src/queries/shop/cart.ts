import { gql } from 'graphql-request'

export const GET_CART = gql`
  query GetCart {
    getCart {
      pid
      qty
      shopItem {
        pid
        name
        price
        images {
          imageUrl
          imageSetUrl
          alt
          color
        }
        description
        qtyAvailable
        tag
      }
    }
  }
`

export const ADD_TO_CART = gql`
  mutation AddToCart($data: CartItemInput!) {
    addToCart(data: $data)
  }
`
