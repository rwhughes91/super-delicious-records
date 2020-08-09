import classes from './Breadcrumb.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Triangle from '../UI/Triangle/Triangle'

interface Paths {
  [key: string]: string
}

interface Props {
  currentPage?: string
}

const pathNames: Paths = {
  home: 'home',
  'about-us': 'about us',
  news: 'news',
  artists: 'artists',
  events: 'events',
  shop: 'shop',
  'contact-us': 'contact us',
}

const Breadcrumb: React.FC<Props> = (props) => {
  const router = useRouter()

  const breadCrumb: JSX.Element[] = []
  const paths = router.pathname.split('/')
  paths.map((path, i) => {
    if (path === '') {
      breadCrumb.push(
        <Link href="/" key={i}>
          <button className={classes.BreadcrumbButton}>Home</button>
        </Link>
      )
    } else if (path === paths[paths.length - 1]) {
      breadCrumb.push(
        <Triangle
          key={`${i} triangle`}
          direction="right"
          size="small"
          styles={{ borderLeftColor: 'var(--light-gray-color)' }}
        />,
        <button key={i} className={classes.Breadcrumb}>
          {props.currentPage || path}
        </button>
      )
    } else {
      breadCrumb.push(
        <Triangle
          key={`${i} triangle`}
          direction="right"
          size="small"
          styles={{ borderLeftColor: 'var(--light-gray-color)' }}
        />,
        <Link href={`/${path}`} key={i}>
          <button className={classes.BreadcrumbButton}>{pathNames[path]}</button>
        </Link>
      )
    }
  })

  return <div className={classes.BreadcrumbContainer}>{breadCrumb}</div>
}

export default Breadcrumb
