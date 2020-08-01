import classes from './Breadcrumb.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Triangle from '../UI/Triangle/Triangle'

interface Paths {
  [key: string]: string
}

interface Props {
  children: Array<keyof typeof paths>
}

const paths: Paths = {
  home: '/',
  'about us': '/about-us',
  news: '/news',
  artists: '/artists',
  events: '/events',
  shop: '/shop',
  'contact us': '/contact-us',
}

const Breadcrumb: React.FC<Props> = (props) => {
  const router = useRouter()
  let currentPage
  for (const path in paths) {
    if (router.pathname === paths[path]) {
      currentPage = path
    }
  }
  return (
    <div className={classes.BreadcrumbContainer}>
      {props.children.map((breadCrumb, i) => [
        <Link href={paths[breadCrumb]} key={i}>
          <button className={classes.BreadcrumbButton}>{breadCrumb}</button>
        </Link>,
        <Triangle
          key={`${i} triangle`}
          direction="right"
          size="small"
          styles={{ borderLeftColor: 'var(--light-gray-color)' }}
        />,
      ])}
      <button className={classes.Breadcrumb}>{currentPage}</button>
    </div>
  )
}

export default Breadcrumb
