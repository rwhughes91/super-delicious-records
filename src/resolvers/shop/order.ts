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
} from 'type-graphql'
import { AuthenticationError } from 'apollo-server-micro'
import { isAuthenticated } from '@middleware/resolver/isAuthenticated'
import { isAdmin } from '@middleware/resolver/isAdmin'
import { createDataItem, getUsersDataWithShopItem } from '@services/firebase/admin'
import { ShopItem } from './shop'
import { ResolverContext } from '../../types/resolver'

@ObjectType()
class OrderShopItem {
  @Field()
  shopPid!: string

  @Field(() => Int)
  qty!: number

  @Field()
  purchasePrice!: number

  @Field(() => ShopItem)
  shopItem!: ShopItem
}

@ObjectType()
export class Order {
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
    return await getUsersDataWithShopItem(uid)
  }

  @Mutation(() => String)
  @UseMiddleware(isAdmin)
  async createOrder(@Arg('data') data: OrderInput, @Ctx() ctx: ResolverContext): Promise<string> {
    const uid = ctx.me && ctx.me.uid
    if (!uid) {
      throw new AuthenticationError('No UID with user')
    }
    const inputData = { ...data, uid }
    return createDataItem(`/orders`, inputData)
  }
}
