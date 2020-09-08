import {
  ObjectType,
  Field,
  Int,
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  UseMiddleware,
  InputType,
} from 'type-graphql'
import { isAuthenticated } from '@middleware/resolver/isAuthenticated'
import { ResolverContext } from '../../types/resolver'
import {
  getDataArray,
  createDataItemWithPid,
  removeDataItemFromList,
  setListOfData,
} from '@services/firebase/admin'
import { AuthenticationError } from 'apollo-server-micro'
import { ShopItemTrimmed, ShopItemTrimmedInput, Size } from '@resolvers/types'

@ObjectType()
export class CartItem {
  @Field()
  pid!: string

  @Field()
  shopPid!: string

  @Field(() => Size, { nullable: true })
  size?: Size

  @Field({ nullable: true })
  color?: string

  @Field(() => Int)
  qty!: number

  @Field(() => ShopItemTrimmed)
  shopItem!: ShopItemTrimmed
}

@InputType()
export class CartItemInput {
  @Field()
  pid!: string

  @Field()
  shopPid!: string

  @Field(() => Int)
  qty!: number

  @Field(() => Size, { nullable: true })
  size?: Size

  @Field({ nullable: true })
  color?: string

  @Field(() => ShopItemTrimmedInput)
  shopItem!: ShopItemTrimmedInput
}

@Resolver(() => CartItem)
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

  @Mutation(() => String)
  @UseMiddleware(isAuthenticated)
  async addToCart(
    @Arg('data') data: CartItemInput,
    @Ctx() ctx: ResolverContext
  ): Promise<true | string> {
    const uid = ctx.me && ctx.me.uid
    if (!uid) {
      throw new AuthenticationError('No UID with user')
    }
    return createDataItemWithPid<CartItemInput>(`/users/${uid}/cart`, data)
  }

  @Mutation(() => String)
  @UseMiddleware(isAuthenticated)
  async setCart(
    @Arg('data', () => [CartItemInput]) data: CartItemInput[],
    @Ctx() ctx: ResolverContext
  ): Promise<true | string> {
    const uid = ctx.me && ctx.me.uid
    if (!uid) {
      throw new AuthenticationError('No UID with user')
    }
    return setListOfData<CartItemInput>(`/users/${uid}/cart`, data)
  }

  @Mutation(() => String)
  @UseMiddleware(isAuthenticated)
  async removeFromCart(
    @Arg('pid') pid: string,
    @Ctx() ctx: ResolverContext
  ): Promise<true | string> {
    const uid = ctx.me && ctx.me.uid
    if (!uid) {
      throw new AuthenticationError('No UID with user')
    }
    return removeDataItemFromList(`/users/${uid}/cart/${pid}`)
  }
}
