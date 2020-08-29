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
  FieldResolver,
  Root,
} from 'type-graphql'
import { isAuthenticated } from '../../middleware/resolver/isAuthenticated'
import { isAdmin } from '../../middleware/resolver/isAdmin'
import { ResolverContext } from '../../types/resolver'
import { getDataArray, getDataItem, createDataItem } from '../../services/firebase/admin'
import { AuthenticationError } from 'apollo-server-micro'
import { ShopItem } from './shop'

@ObjectType()
class CartItem {
  @Field()
  pid!: string

  @Field()
  shopPid!: string

  @Field(() => Int)
  qty!: number

  @Field(() => ShopItem)
  shopItem!: ShopItem
}

@InputType()
class CartItemInput {
  @Field()
  shopPid!: string

  @Field(() => Int)
  qty!: number
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
  @UseMiddleware(isAdmin)
  async addToCart(@Arg('data') data: CartItemInput, @Ctx() ctx: ResolverContext): Promise<string> {
    const uid = ctx.me && ctx.me.uid
    if (!uid) {
      throw new AuthenticationError('No UID with user')
    }
    return createDataItem(`/users/${uid}/cart`, data)
  }

  @FieldResolver(() => ShopItem)
  async shopItem(@Root() parent: CartItem): Promise<ShopItem> {
    return getDataItem<ShopItem>(`/shop/${parent.shopPid}`)
  }
}
