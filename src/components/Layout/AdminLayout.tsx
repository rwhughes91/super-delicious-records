import React, { useContext } from 'react'
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
