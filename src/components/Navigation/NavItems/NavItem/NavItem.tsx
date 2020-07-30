import classes from './NavItem.module.scss'
import Link from 'next/link'

interface Styles {
  width: string
}
interface Props {
  location: string
  children: JSX.Element | string
  color?: 'purple' | 'white'
  styles?: Styles
}

const NavItem: React.FC<Props> = (props) => {
  const classNames = [classes.NavItem]
  if (props.color && props.color === 'white') {
    classNames.push(classes.White)
  } else {
    classNames.push(classes.Purple)
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
