import { gql } from 'graphql-request'

export const GET_NEWS_ITEM = gql`
  query GetNewsItem($pid: String!) {
    getNewsItem(pid: $pid) {
      pid
      title
      shortTitle
      imageUrl
      description
      date
      videos {
        src
        title
      }
      links {
        header
        src
        buttonText
      }
    }
  }
`

export const GET_NEWS_ITEMS = gql`
  query GetNewsItems {
    getNewsItems {
      pid
      title
      shortTitle
      imageUrl
      description
      date
      videos {
        src
        title
      }
      links {
        header
        src
        buttonText
      }
    }
  }
`
export const CREATE_NEWS_ITEM = gql`
  mutation CreateNewsItem($data: NewsInput!) {
    createNewsItem(data: $data)
  }
`
