import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-micro'
import { buildSchema } from 'type-graphql'
import { applyMiddleware } from 'graphql-middleware'
import { ResolverContext } from '../../types/resolver'
import { ServerRequest, ServerResponse } from '../../types/server'
import AdminConnector from '../../connectors/admin'
import meMiddleware from '../../middleware/global/me'
import firebaseAdmin from '../../services/firebase/admin'
import resolvers from '../../resolvers/index'
import cors from 'micro-cors'

if (process.env.FIREBASE_ADMIN_UID) {
  firebaseAdmin
    .auth()
    .getUser(process.env.FIREBASE_ADMIN_UID)
    .then((user) => {
      if (process.env.FIREBASE_ADMIN_UID) {
        firebaseAdmin.auth().setCustomUserClaims(process.env.FIREBASE_ADMIN_UID, {
          ...user.customClaims,
          admin: true,
        })
      }
    })
}

export const config = {
  api: {
    bodyParser: false,
  },
}

const withCors = cors({
  origin: '*',
})

export default async (req: ServerRequest, res: ServerResponse): Promise<void> => {
  const schema = await buildSchema({
    resolvers,
    dateScalarMode: 'isoDate',
    validate: false,
  })

  const apolloServer = new ApolloServer({
    schema: applyMiddleware(schema, meMiddleware),
    context: async ({ req, res }): Promise<ResolverContext> => {
      const adminConnector = new AdminConnector()
      return {
        req,
        res,
        adminConnector,
      }
    },
  })

  const handler = withCors(apolloServer.createHandler({ path: '/api/graphql' }))

  return handler(req, res)
}
