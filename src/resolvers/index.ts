import { NonEmptyArray } from 'type-graphql'
import UserResolvers from './user/'
import NewsResolvers from './news'
import ArtistResolvers from './artist/'
import EventResolvers from './event/'
import { ShopResolvers, OrderResolvers, CartResolvers } from './shop/'

export default [
  UserResolvers,
  NewsResolvers,
  ArtistResolvers,
  EventResolvers,
  ShopResolvers,
  OrderResolvers,
  CartResolvers,
] as NonEmptyArray<any>
