import { ObjectType, Field, Resolver, Arg, Mutation, InputType, UseMiddleware } from 'type-graphql'
import { isAdmin } from '../../middleware/resolver/isAdmin'
import { Video, VideoInput } from '../types'
import { pushDataToDatabase } from '../../services/firebase/admin'
import { shaveObject } from '../../utils/helpers'
import createBaseResolver from '../baseResolver'

// Object Types
@ObjectType()
class Link {
  @Field()
  header!: string

  @Field()
  src!: string

  @Field()
  buttonText!: string
}

@ObjectType()
class NewsItem {
  @Field()
  pid!: string

  @Field()
  title!: string

  @Field()
  shortTitle!: string

  @Field()
  imageUrl!: string

  @Field(() => [String])
  description!: string[]

  @Field()
  date!: string

  @Field(() => [Video], { nullable: true })
  videos?: Video[]

  @Field(() => [Link], { nullable: true })
  links?: Link[]
}

// Input Types
@InputType()
class LinkInput implements Partial<Link> {
  @Field()
  header!: string

  @Field()
  src!: string

  @Field()
  buttonText!: string
}

@InputType()
class NewsInput implements Partial<NewsItem> {
  @Field()
  title!: string

  @Field()
  shortTitle!: string

  @Field()
  imageUrl!: string

  @Field(() => [String])
  description!: string[]

  @Field()
  date!: string

  @Field(() => [VideoInput], { nullable: true })
  videos?: VideoInput[]

  @Field(() => [LinkInput], { nullable: true })
  links?: LinkInput[]
}

// Creating base resolver
const NewsBaseResolver = createBaseResolver('News', NewsItem, '/news')
// Resolver
@Resolver(() => NewsItem)
export default class NewsResolver extends NewsBaseResolver {
  @Mutation(() => String)
  @UseMiddleware(isAdmin)
  async createNewsItem(@Arg('data') data: NewsInput): Promise<string> {
    const newsInput = shaveObject(data)
    const newPid = await pushDataToDatabase<NewsInput>('/news', newsInput)
    return newPid || ''
  }
}
