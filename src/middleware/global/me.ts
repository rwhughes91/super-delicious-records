import { AuthenticationError } from 'apollo-server-micro'
import firebaseAdmin from '../../services/firebase/admin'
import { ResolverContext } from '../../types/resolver'
import { User } from '../../types/user'

export default async (
  resolve: any,
  root: any,
  args: any,
  context: ResolverContext,
  info: any
): Promise<any> => {
  const authToken = context.req.headers.authorization || ''
  if (!authToken) {
    // throw new AuthenticationError('Please sign in')
  } else {
    let me: User
    try {
      const decodedToken = await firebaseAdmin.auth().verifyIdToken(authToken)
      const uid = decodedToken.uid
      me = (await firebaseAdmin.auth().getUser(uid)) as User
    } catch (error) {
      throw new AuthenticationError(error.message)
    }
    context.me = me
  }
  return await resolve(root, args, context, info)
}
