import {
  ObjectType,
  Field,
  Int,
  Resolver,
  Query,
  Arg,
  Ctx,
  UseMiddleware,
  Mutation,
  InputType,
  FieldResolver,
  Root,
} from 'type-graphql'
import { isAuthenticated } from '../../middleware/resolver/isAuthenticated'
import { ResolverContext } from '../../types/resolver'
import { getDataArray, getDataItem, createDataItem } from '../../services/firebase/admin'
import { AuthenticationError } from 'apollo-server-micro'
import { isAdmin } from '../../middleware/resolver/isAdmin'
import { ShopItem } from './shop'

@ObjectType()
class OrderShopItem {
  @Field()
  shopPid!: string

  @Field(() => Int)
  qty!: number

  @Field()
  purchasePrice!: number
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

@InputType()
class OrderShopItemInput {
  @Field()
  shopPid!: string

  @Field(() => Int)
  qty!: number

  @Field()
  purchasePrice!: number
}

@InputType()
class OrderInput {
  @Field(() => [OrderShopItemInput])
  items!: OrderShopItemInput[]

  @Field()
  amount!: number

  @Field()
  currency!: string

  @Field()
  date!: string
}

@Resolver(() => OrderShopItem)
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

  @Mutation(() => String)
  @UseMiddleware(isAdmin)
  async createOrder(@Arg('data') data: OrderInput, @Ctx() ctx: ResolverContext): Promise<string> {
    const uid = ctx.me && ctx.me.uid
    if (!uid) {
      throw new AuthenticationError('No UID with user')
    }
    return createDataItem(`/users/${uid}/orders`, data)
  }

  @FieldResolver(() => ShopItem)
  async shopItem(@Root() parent: OrderShopItem): Promise<ShopItem> {
    return getDataItem<ShopItem>(`/shop/${parent.shopPid}`)
  }
}
