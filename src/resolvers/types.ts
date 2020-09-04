import { ObjectType, Field, InputType, registerEnumType } from 'type-graphql'

export enum Size {
  XSMALL = 'x-small',
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  XLARGE = 'x-large',
}

registerEnumType(Size, { name: 'Size' })

@ObjectType()
export class Video {
  @Field()
  src!: string

  @Field()
  title!: string
}

@InputType()
export class VideoInput implements Partial<Video> {
  @Field()
  src!: string

  @Field()
  title!: string
}

@ObjectType()
export class ShopImage {
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
export class ShopImageInput implements Partial<ShopImage> {
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
export class ShopItemTrimmed {
  @Field()
  name!: string

  @Field(() => [ShopImage])
  images!: ShopImage[]

  @Field()
  price!: number
}

@InputType()
export class ShopItemTrimmedInput implements Partial<ShopItemTrimmed> {
  @Field()
  name!: string

  @Field(() => [ShopImageInput])
  images!: ShopImageInput[]

  @Field()
  price!: number
}
