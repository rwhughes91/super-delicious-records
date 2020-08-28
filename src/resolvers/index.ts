import { NonEmptyArray } from 'type-graphql'
import UserResolvers from './user/user'
import NewsResolvers from './news/news'
import ArtistResolvers from './artist/artist'
import EventResolvers from './event/event'
import { ShopResolvers } from './shop/index'

export default [
  UserResolvers,
  NewsResolvers,
  ArtistResolvers,
  EventResolvers,
  ShopResolvers,
] as NonEmptyArray<any>
