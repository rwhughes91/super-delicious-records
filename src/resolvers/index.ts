import { NonEmptyArray } from 'type-graphql'
import UserResolvers from './user/'
import NewsResolvers from './news'
import ArtistResolvers from './artist/'
import EventResolvers from './event/'
import { ShopResolvers, OrderResolvers, CartResolvers } from './shop/'
import StripeResolvers from './stripe/'

export default [
  UserResolvers,
  NewsResolvers,
  ArtistResolvers,
  EventResolvers,
  ShopResolvers,
  OrderResolvers,
  CartResolvers,
  StripeResolvers,
] as NonEmptyArray<any>
