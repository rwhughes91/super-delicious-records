import { gql } from 'graphql-request'

export const GET_ME = gql`
  query GetMe {
    me {
      uid
      email
      username
      roles
    }
  }
`
