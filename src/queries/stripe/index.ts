import { gql } from 'graphql-request'

export const STRIPE_CREATE_ORDER = gql`
  mutation StripeCreateOrder($data: [CartItemInput!]!) {
    stripeCreateOrder(data: $data) {
      id
    }
  }
`
