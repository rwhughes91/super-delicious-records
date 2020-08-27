import { MiddlewareFn } from 'type-graphql'
import { ForbiddenError } from 'apollo-server-micro'
import { ResolverContext } from '../../types/resolver'

export const isAdmin: MiddlewareFn<ResolverContext> = async ({ context }, next) => {
  if (!context.me) {
    throw new ForbiddenError('Not authenticated')
  }
  const hasAdminRole = context.me && context.me.customClaims && context.me.customClaims['admin']
  if (!hasAdminRole) {
    throw new ForbiddenError('Not admin user')
  }

  return next()
}
