import { ObjectType, Field, Resolver, Arg, Mutation, InputType, UseMiddleware } from 'type-graphql'
import { isAdmin } from '../../middleware/resolver/isAdmin'
import { pushDataToDatabase } from '../../services/firebase/admin'
import { shaveObject } from '../../utils/helpers'
import createBaseResolver from '../baseResolver'

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

const EventBaseResolver = createBaseResolver('Event', Event, '/events')
@Resolver()
export default class EventsResolver extends EventBaseResolver {
  @Mutation(() => String)
  @UseMiddleware(isAdmin)
  async createEvent(@Arg('data') data: EventInput): Promise<string> {
    const eventInput = shaveObject(data)
    const newPid = await pushDataToDatabase<EventInput>('/events', eventInput)
    return newPid || ''
  }
}
