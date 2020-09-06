import {
  ObjectType,
  Field,
  Resolver,
  Mutation,
  Arg,
  InputType,
  Int,
  UseMiddleware,
  registerEnumType,
  Query,
} from 'type-graphql'
import { isAdmin } from '@middleware/resolver/isAdmin'
import {
  getDataArray,
  getDataItem,
  createDataItem,
  createDataItemWithPid,
} from '@services/firebase/admin'
import { ShopImage, ShopImageInput } from '@resolvers/types'
import { isAuthenticated } from '@middleware/resolver/isAuthenticated'

enum Tag {
  SHIRT = 'SHIRT',
  HAT = 'HAT',
  SWAG = 'SWAG',
}

registerEnumType(Tag, { name: 'Tag' })

// Object Types

@ObjectType()
export class ShopItem {
  @Field()
  pid!: string

  @Field()
  name!: string

  @Field()
  price!: number

  @Field(() => [ShopImage])
  images!: ShopImage[]

  @Field()
  description!: string

  @Field({ nullable: true })
  moreInfo?: string

  @Field()
  weight!: string

  @Field(() => Int)
  qtyAvailable!: number

  @Field(() => Tag)
  tag!: Tag

  @Field(() => [String])
  colors!: string[]
}

// Input Types
@InputType()
class ShopItemInput implements Partial<ShopItem> {
  @Field()
  name!: string

  @Field()
  price!: number

  @Field(() => [ShopImageInput])
  images!: ShopImageInput[]

  @Field()
  description!: string

  @Field(() => Int)
  qtyAvailable!: number

  @Field(() => Tag)
  tag!: Tag

  @Field({ nullable: true })
  moreInfo?: string

  @Field({ nullable: true, defaultValue: 'No weight information available' })
  weight!: string

  @Field(() => [String])
  colors!: string[]
}

// Resolver
@Resolver(() => ShopItem)
export default class ShopItemResolver {
  @Query(() => [ShopItem])
  @UseMiddleware(isAuthenticated)
  async getShop(): Promise<ShopItem[]> {
    return getDataArray<ShopItem>('/shop')
  }

  @Query(() => ShopItem)
  @UseMiddleware(isAuthenticated)
  async getShopItem(@Arg('pid') pid: string): Promise<ShopItem> {
    return getDataItem<ShopItem>(`/shop/${pid}`)
  }

  @Mutation(() => String)
  @UseMiddleware(isAdmin)
  async createShopItem(@Arg('data') data: ShopItemInput): Promise<string> {
    return createDataItem('/shop', data)
  }

  @Mutation(() => String)
  @UseMiddleware(isAdmin)
  async mutateShopItem(
    @Arg('data') data: ShopItemInput,
    @Arg('pid') pid: string
  ): Promise<true | string> {
    return createDataItemWithPid<ShopItem>('shop', { ...data, pid })
  }
}
