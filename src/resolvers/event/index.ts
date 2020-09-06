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
import { isAuthenticated } from '@middleware/resolver/isAuthenticated'
import { isAdmin } from '@middleware/resolver/isAdmin'
import {
  getDataArray,
  getDataItem,
  createDataItem,
  createDataItemWithPid,
} from '../../services/firebase/admin'

@ObjectType()
class Event {
  @Field()
  pid!: string

  @Field()
  date!: string

  @Field()
  title!: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  url?: string

  @Field({ nullable: true })
  endDate?: string

  @Field({ nullable: true })
  location?: string
}

@InputType()
class EventInput implements Partial<Event> {
  @Field()
  date!: string

  @Field()
  title!: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  url?: string

  @Field({ nullable: true })
  endDate?: string

  @Field({ nullable: true })
  location?: string
}

@Resolver()
export default class EventsResolver {
  @Query(() => [Event])
  @UseMiddleware(isAuthenticated)
  async getEvents(): Promise<Event[]> {
    return getDataArray<Event>('/events')
  }

  @Query(() => Event)
  @UseMiddleware(isAuthenticated)
  async getEvent(@Arg('pid') pid: string): Promise<Event> {
    return getDataItem<Event>(`/events/${pid}`)
  }

  @Mutation(() => String)
  @UseMiddleware(isAdmin)
  async createEvent(@Arg('data') data: EventInput): Promise<string> {
    return createDataItem('/events', data)
  }

  @Mutation(() => String)
  @UseMiddleware(isAdmin)
  async mutateEvent(
    @Arg('data') data: EventInput,
    @Arg('pid') pid: string
  ): Promise<true | string> {
    return createDataItemWithPid<Event>('events', { ...data, pid })
  }
}
