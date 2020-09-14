import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from './Layout'
import FourOFour from '@pages/404'
import { UserContext } from '@context/UserProvider'

type children = JSX.Element | boolean | null | undefined | string

interface Props {
  children: children | children[]
  currentPage?: string
}

const AdminLayout: React.FC<Props> = (props) => {
  const { user } = useContext(UserContext)
  const router = useRouter()

  useEffect(() => {
    router.prefetch('/')
  }, [router])

  useEffect(() => {
    if (user.user && !user.admin) {
      router.push('/')
    }
  }, [user.user, user.admin, router])

  let output = <FourOFour />
  if (user.user && user.admin) {
    output = (
      <Layout pageType="main" noFooter currentPage={props.currentPage}>
        {user.user && user.admin ? props.children : <FourOFour />}
      </Layout>
    )
  }
  return output
}

export default React.memo(AdminLayout)
