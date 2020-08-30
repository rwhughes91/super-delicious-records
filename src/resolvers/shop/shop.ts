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
import { isAdmin } from '../../middleware/resolver/isAdmin'
import { getDataArray, getDataItem, createDataItem } from '../../services/firebase/admin'

enum Tag {
  SHIRT = 'SHIRT',
  HAT = 'HAT',
  SWAG = 'SWAG',
}

registerEnumType(Tag, { name: 'Tag' })

// Object Types
@ObjectType()
class ShopImage {
  @Field()
  imageUrl!: string

  @Field()
  imageSetUrl!: string

  @Field()
  alt!: string

  @Field({ nullable: true })
  color?: string
}

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
class ShopImageInput implements Partial<ShopImage> {
  @Field()
  imageUrl!: string

  @Field()
  imageSetUrl!: string

  @Field()
  alt!: string

  @Field({ nullable: true })
  color?: string
}

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
  async getShop(): Promise<ShopItem[]> {
    return getDataArray<ShopItem>('/shop')
  }

  @Query(() => ShopItem)
  async getShopItem(@Arg('pid') pid: string): Promise<ShopItem> {
    return getDataItem<ShopItem>(`/shop/${pid}`)
  }

  @Mutation(() => String)
  @UseMiddleware(isAdmin)
  async createShopItem(@Arg('data') data: ShopItemInput): Promise<string> {
    return createDataItem('/shop', data)
  }
}
