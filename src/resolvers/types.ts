import { ObjectType, Field, InputType } from 'type-graphql'

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
