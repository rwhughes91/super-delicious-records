import { useRouter } from 'next/router'
import classes from './NavItem.module.scss'
import Link from 'next/link'

interface Styles {
  width: string
}
interface Props {
  location: string
  children: JSX.Element | string
  color?: 'purple' | 'white' | 'gray'
  ripple?: boolean
  styles?: React.CSSProperties
}

const NavItem: React.FC<Props> = (props) => {
  const router = useRouter()

  const classNames = [classes.NavItem]
  if (
    props.location !== '/' &&
    !router.pathname.includes('/admin') &&
    router.pathname.includes(props.location)
  ) {
    classNames.push(classes.Active)
  } else if (props.location === router.pathname) {
    classNames.push(classes.Active)
  }
  if (props.color) {
    if (props.color === 'white') {
      classNames.push(classes.White)
    } else if (props.color === 'gray') {
      classNames.push(classes.Gray)
    } else {
      classNames.push(classes.Purple)
    }
  }
  if (props.ripple) {
    classNames.push(classes.Ripple)
  }
  let styles = {}
  if (props.styles) {
    styles = { ...props.styles }
  }
  return (
    <Link href={props.location}>
      <button style={styles} className={classNames.join(' ')}>
        {props.children}
      </button>
    </Link>
  )
}

export default NavItem
