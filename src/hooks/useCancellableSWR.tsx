import useSWR, { responseInterface } from 'swr'
import axios, { Canceler } from 'axios'

export default function useCancellableSWR<T>(
  query: string,
  idToken: string | null,
  user: firebase.User | null
): [responseInterface<T, Error>, Canceler] {
  const source = axios.CancelToken.source()
  async function fetcher(query: string, user: firebase.User) {
    const idToken = await user.getIdToken()
    return axios
      .post(
        '/api/graphql',
        { query },
        {
          headers: { authorization: `Bearer ${idToken}` },
          cancelToken: source.token,
        }
      )
      .then((res) => res.data.data)
  }
  return [useSWR(idToken ? [query, user] : null, fetcher), source.cancel]
}
