import { MiddlewareFn } from 'type-graphql'
import { ForbiddenError } from 'apollo-server-micro'
import { ResolverContext } from '../../types/resolver'

export const isAuthenticated: MiddlewareFn<ResolverContext> = async ({ context }, next) => {
  if (!context.me) {
    throw new ForbiddenError('Not authenticated')
  }
  return next()
}
