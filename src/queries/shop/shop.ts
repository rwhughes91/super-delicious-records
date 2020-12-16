import { gql } from 'graphql-request'

export const GET_SHOP_ITEM = gql`
  query GetShopItem($pid: String!) {
    getShopItem(pid: $pid) {
      pid
      name
      price
      images {
        imageUrl
        imageSetUrl
        base64
        alt
        color
      }
      description
      qtyAvailable
      tag
      moreInfo
      weight
      colors
    }
  }
`

export const GET_SHOP = gql`
  query GetShop {
    getShop {
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
      moreInfo
      weight
      colors
    }
  }
`

export const CREATE_SHOP_ITEM = gql`
  mutation CreateShopItem($data: ShopItemInput!) {
    createShopItem(data: $data)
  }
`
export const MUTATE_SHOP_ITEM = gql`
  mutation MutateShopItem($data: ShopItemInput!, $pid: String!) {
    mutateShopItem(data: $data, pid: $pid)
  }
`
