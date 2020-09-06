import axios, { CancelTokenSource } from 'axios'

const sendAxiosRequest = (
  query: string,
  user: firebase.User,
  variables?: any
): [() => Promise<any>, CancelTokenSource] => {
  const source = axios.CancelToken.source()
  return [
    async () => {
      const idToken = await user.getIdToken()
      const res = await axios.post(
        '/api/graphql',
        { query, variables },
        { cancelToken: source.token, headers: { authorization: `Bearer ${idToken}` } }
      )
      return res.data.data
    },
    source,
  ]
}

export default sendAxiosRequest
