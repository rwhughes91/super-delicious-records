export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Query = {
  __typename?: 'Query'
  me: User
}

export type User = {
  __typename?: 'User'
  uid: Scalars['String']
  email: Scalars['String']
  username: Scalars['String']
  roles: Array<Scalars['String']>
}

export type GetMeQueryVariables = Exact<{ [key: string]: never }>

export type GetMeQuery = { __typename?: 'Query' } & {
  me: { __typename?: 'User' } & Pick<User, 'uid' | 'email' | 'username' | 'roles'>
}
