import { gql } from 'graphql-request'

export const GET_ORDERS = gql`
  query GetOrders {
    getOrders {
      pid
      items {
        qty
        purchasePrice
        shopItem {
          name
          images {
            imageUrl
            imageSetUrl
            alt
            color
          }
        }
      }
      amount
      date
    }
  }
`

export const CREATE_ORDER = gql`
  mutation CreateOrder($data: OrderInput!) {
    createOrder(data: $data)
  }
`
