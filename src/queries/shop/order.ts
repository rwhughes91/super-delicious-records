import { gql } from 'graphql-request'

export const GET_ORDERS = gql`
  query GetOrders {
    getOrders {
      pid
      items {
        qty
        purchasePrice
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
      amount
      currency
      date
    }
  }
`

export const CREATE_ORDER = gql`
  mutation CreateOrder($data: OrderInput!) {
    createOrder(data: $data)
  }
`
