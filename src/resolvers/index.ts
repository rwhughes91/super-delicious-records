import { NonEmptyArray } from 'type-graphql'
import UserResolvers from './user'
import NewsResolvers from './news'
import ArtistResolvers from './artist'

export default [UserResolvers, NewsResolvers] as NonEmptyArray<Function>
