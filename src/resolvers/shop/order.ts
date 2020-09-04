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
import { createDataItem, getChildrenEqualTo } from '@services/firebase/admin'
import { ResolverContext } from '../../types/resolver'
import { ShopItemTrimmed, ShopItemTrimmedInput, Size } from '@resolvers/types'

@ObjectType()
class OrderShopItem {
  @Field()
  shopPid!: string

  @Field(() => Int)
  qty!: number

  @Field()
  purchasePrice!: number

  @Field({ nullable: true })
  color?: string

  @Field(() => Size, { nullable: true })
  size?: Size

  @Field(() => ShopItemTrimmed)
  shopItem!: ShopItemTrimmed
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

  @Field(() => ShopItemTrimmedInput)
  shopItem!: ShopItemTrimmedInput

  @Field(() => Int)
  qty!: number

  @Field()
  purchasePrice!: number

  @Field({ nullable: true })
  color?: string

  @Field(() => Size, { nullable: true })
  size?: Size
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
    return await getChildrenEqualTo('/orders', 'uid', uid)
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
