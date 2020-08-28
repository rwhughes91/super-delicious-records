import { ObjectType, Field, Int, Resolver, Query, Arg, Ctx, UseMiddleware } from 'type-graphql'
import { isAuthenticated } from '../../middleware/resolver/isAuthenticated'
import { ResolverContext } from '../../types/resolver'
import { getDataArray } from '../../services/firebase/admin'
import { AuthenticationError } from 'apollo-server-micro'

@ObjectType()
class CartItem {
  @Field()
  pid!: string

  @Field()
  shopPid!: string

  @Field(() => Int)
  qty!: number
}

@Resolver()
export default class CartResolver {
  @Query(() => [CartItem])
  @UseMiddleware(isAuthenticated)
  async getCart(@Ctx() ctx: ResolverContext): Promise<CartItem[]> {
    const uid = ctx.me && ctx.me.uid
    if (!uid) {
      throw new AuthenticationError('No UID with user')
    }
    return getDataArray(`/users/${uid}/cart`)
  }
}
