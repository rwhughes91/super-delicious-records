import { gql } from 'graphql-request'

export const GET_ORDERS = gql`
  query GetOrders {
    getOrders {
      pid
      amount
      date
      items {
        shopPid
        qty
        purchasePrice
        color
        size
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
    }
  }
`

export const CREATE_ORDER = gql`
  mutation CreateOrder($data: OrderInput!) {
    createOrder(data: $data)
  }
`
