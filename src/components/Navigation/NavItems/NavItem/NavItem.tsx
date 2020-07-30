import classes from './NavItem.module.scss'
import Link from 'next/link'

interface Props {
  location: string
  children: JSX.Element | string
  color?: 'purple' | 'white'
}

const NavItem: React.FC<Props> = (props) => {
  const classNames = [classes.NavItem]
  if (props.color && props.color === 'white') {
    classNames.push(classes.White)
  } else {
    classNames.push(classes.Purple)
  }
  return (
    <Link href={props.location}>
      <button className={classNames.join(' ')}>{props.children}</button>
    </Link>
  )
}

export default NavItem
