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
} from 'type-graphql'
import { isAdmin } from '../../middleware/resolver/isAdmin'
import { pushDataToDatabase } from '../../services/firebase/admin'
import { shaveObject } from '../../utils/helpers'
import createBaseResolver from '../baseResolver'

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
class ShopItem {
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

  @Field(() => Int)
  qty!: number

  @Field(() => Tag)
  tag!: Tag
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
  qty!: number
}

const ShopItemBaseResolver = createBaseResolver('Shop', ShopItem, '/shop')
// Resolver
@Resolver(() => ShopItem)
export default class ShopItemResolver extends ShopItemBaseResolver {
  @Mutation(() => String)
  @UseMiddleware(isAdmin)
  async createShopItem(@Arg('data') data: ShopItemInput): Promise<string> {
    const shopInput = shaveObject(data)
    const newPid = await pushDataToDatabase<ShopItemInput>('/shop', shopInput)
    return newPid || ''
  }
}
