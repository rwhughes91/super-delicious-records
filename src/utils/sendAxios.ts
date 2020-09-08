import axios, { CancelTokenSource, CancelToken } from 'axios'

const sendAxiosRequest = (
  query: string,
  user?: firebase.User,
  variables?: any
): [() => Promise<any>, CancelTokenSource] => {
  const source = axios.CancelToken.source()
  return [
    async () => {
      const headers: { cancelToken: CancelToken; headers?: { authorization: string } } = {
        cancelToken: source.token,
      }
      let idToken
      if (user) {
        idToken = await user.getIdToken()
        headers.headers = { authorization: `Bearer ${idToken}` }
      }
      const res = await axios.post('/api/graphql', { query, variables }, headers)
      return res.data.data
    },
    source,
  ]
}

export default sendAxiosRequest
