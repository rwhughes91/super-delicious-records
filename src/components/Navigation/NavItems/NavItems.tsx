import classes from './NavItems.module.scss'
import NavItem from './NavItem/NavItem'
import CartIcon from '../../UI/Icons/CartIcon/CartIcon'
import NavSearchBar from '../NavSearchBar/NavSearchBar'

interface Props {
  color: 'purple' | 'white'
  icons: boolean | 'only' | 'cart'
}

const NavItems: React.FC<Props> = (props) => {
  let navItems
  if (props.icons === 'only') {
    navItems = (
      <>
        <NavSearchBar slide />
        <NavItem location="/">
          <CartIcon />
        </NavItem>
      </>
    )
  } else if (props.icons === 'cart') {
    navItems = (
      <NavItem location="/" styles={{ width: '105%' }}>
        <CartIcon size={3} />
      </NavItem>
    )
  } else {
    navItems = (
      <>
        <NavItem location="/" color={props.color}>
          about us
        </NavItem>
        <NavItem location="/" color={props.color}>
          news
        </NavItem>
        <NavItem location="/" color={props.color}>
          artists
        </NavItem>
        <NavItem location="/" color={props.color}>
          events
        </NavItem>
        <NavItem location="/" color={props.color}>
          shop
        </NavItem>
        <NavItem location="/test" color={props.color}>
          contact us
        </NavItem>
        {props.icons && (
          <>
            <NavItem location="/">
              <CartIcon />
            </NavItem>
            <NavSearchBar />
          </>
        )}
      </>
    )
  }
  return <nav className={classes.NavigationItems}>{navItems}</nav>
}

export default NavItems
