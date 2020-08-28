import { ObjectType, Field, Int, Resolver, Query, Arg, Ctx, UseMiddleware } from 'type-graphql'
import { isAuthenticated } from '../../middleware/resolver/isAuthenticated'
import { ResolverContext } from '../../types/resolver'
import { getDataArray } from '../../services/firebase/admin'
import { AuthenticationError } from 'apollo-server-micro'

@ObjectType()
class OrderShopItem {
  @Field()
  shopPid!: string

  @Field(() => Int)
  qty!: number

  @Field()
  price!: number
}

@ObjectType()
class Order {
  @Field()
  pid!: string

  @Field(() => [OrderShopItem])
  items!: OrderShopItem[]

  @Field()
  amount!: number

  @Field()
  currency!: string

  @Field()
  date!: string
}

@Resolver()
export default class OrdersResolver {
  @Query(() => [Order])
  @UseMiddleware(isAuthenticated)
  async getOrders(@Ctx() ctx: ResolverContext): Promise<Order[]> {
    const uid = ctx.me && ctx.me.uid
    if (!uid) {
      throw new AuthenticationError('No UID with user')
    }
    return getDataArray(`/users/${uid}/orders`)
  }
}
