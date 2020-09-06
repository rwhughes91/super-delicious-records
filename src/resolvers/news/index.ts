import {
  ObjectType,
  Field,
  Resolver,
  Arg,
  Mutation,
  InputType,
  UseMiddleware,
  Query,
} from 'type-graphql'
import { isAdmin } from '@middleware/resolver/isAdmin'
import { Video, VideoInput } from '../types'
import {
  getDataArray,
  getDataItem,
  createDataItem,
  createDataItemWithPid,
} from '@services/firebase/admin'

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
export class LinkInput implements Partial<Link> {
  @Field()
  header!: string

  @Field()
  src!: string

  @Field()
  buttonText!: string
}

@InputType()
export class NewsInput implements Partial<NewsItem> {
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

// Resolver
@Resolver(() => NewsItem)
export default class NewsResolver {
  @Query(() => [NewsItem])
  async getNews(): Promise<NewsItem[]> {
    return getDataArray<NewsItem>('/news')
  }

  @Query(() => NewsItem)
  async getNewsItem(@Arg('pid') pid: string): Promise<NewsItem> {
    return getDataItem<NewsItem>(`/news/${pid}`)
  }

  @Mutation(() => String)
  @UseMiddleware(isAdmin)
  async createNewsItem(@Arg('data') data: NewsInput): Promise<string> {
    return createDataItem('news', data)
  }
  @Mutation(() => String)
  @UseMiddleware(isAdmin)
  async mutateNewsItem(
    @Arg('data') data: NewsInput,
    @Arg('pid') pid: string
  ): Promise<true | string> {
    return createDataItemWithPid<NewsItem>('news', { ...data, pid })
  }
}
