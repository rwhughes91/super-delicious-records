import {
  ObjectType,
  Field,
  Resolver,
  Query,
  Arg,
  Mutation,
  UseMiddleware,
  InputType,
} from 'type-graphql'
import { getDataArray, getDataItem, pushDataToDatabase } from '../services/firebase/admin'
import { isAdmin } from '../middleware/resolver/isAdmin'
import { shaveObject } from '../utils/helpers'

// Object Types
@ObjectType()
class Video {
  @Field()
  src!: string

  @Field()
  header!: string
}

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

  @Field((type) => [String])
  description!: string[]

  @Field()
  date!: string

  @Field((type) => [Video], { nullable: true })
  videos?: Video[]

  @Field((type) => [Link], { nullable: true })
  links?: Link[]
}

// Input Types
@InputType()
class VideoInput implements Partial<Video> {
  @Field()
  src!: string

  @Field()
  header!: string
}

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

  @Field((type) => [String])
  description!: string[]

  @Field()
  date!: string

  @Field((type) => [VideoInput], { nullable: true })
  videos?: VideoInput[]

  @Field((type) => [LinkInput], { nullable: true })
  links?: LinkInput[]
}

// Resolver
@Resolver()
export default class NewsResolver {
  @Query(() => [NewsItem])
  async getNewsItems(): Promise<NewsItem[]> {
    const newsItems = await getDataArray<NewsItem>('/news')
    return newsItems
  }

  @Query(() => NewsItem)
  async getNewsItem(@Arg('pid') pid: string): Promise<NewsItem> {
    const newsItem = await getDataItem<NewsItem>(`/news/${pid}`)
    return newsItem
  }

  @Mutation(() => String)
  // @UseMiddleware(isAdmin)
  async createNewsItem(@Arg('data') data: NewsInput): Promise<string> {
    const newsInput = shaveObject(data)
    const newPid = await pushDataToDatabase<NewsInput>('/news', newsInput)
    return newPid || ''
  }
}
