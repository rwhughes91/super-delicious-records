import classes from './NavItem.module.scss'
import Link from 'next/link'

interface Props {
  location: string
  children: JSX.Element | string
  color?: 'purple' | 'white'
}

const NavItem: React.FC<Props> = (props) => {
  return (
    <Link href={props.location}>
      <button className={classes.NavItem}>{props.children}</button>
    </Link>
  )
}

export default NavItem
