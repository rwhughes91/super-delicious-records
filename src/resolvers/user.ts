import { ObjectType, Field, Ctx, Resolver, Query, UseMiddleware } from 'type-graphql'
import { ResolverContext } from '../types/resolver'
import { isAuthenticated } from '../middleware/resolver/isAuthenticated'

@ObjectType()
class User {
  @Field()
  uid!: string

  @Field()
  email!: string

  @Field()
  username!: string

  @Field((type) => [String])
  roles!: string[]
}

@Resolver()
export default class UserResolver {
  @Query(() => User)
  @UseMiddleware(isAuthenticated)
  async me(@Ctx() ctx: ResolverContext): Promise<User> {
    const rolesObject = (ctx.me && ctx.me.customClaims) || {}

    const roles = Object.keys(rolesObject).filter((key) => rolesObject[key])

    return {
      uid: (ctx.me && ctx.me.uid) || '',
      email: (ctx.me && ctx.me.email) || '',
      username: (ctx.me && ctx.me.displayName) || '',
      roles,
    }
  }
}
