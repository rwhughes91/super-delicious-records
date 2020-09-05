import { ServerResponse, ServerRequest } from './server'
import { User } from './user'

import AdminConnector from '@connectors/admin'

export type ResolverContext = {
  res: ServerResponse
  req: ServerRequest
  me?: User
  adminConnector: AdminConnector
}
