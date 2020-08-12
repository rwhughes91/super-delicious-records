import classes from './NavItems.module.scss'
import NavItem from './NavItem/NavItem'
import NavCartIcon from '../NavCartIcon/NavCartIcon'
import NavSearchBar from '../NavSearchBar/NavSearchBar'

interface Props {
  color: 'purple' | 'white'
  icons: boolean | 'only' | 'cart'
  home?: boolean
  ripple?: true
  styles?: React.CSSProperties
}

const NavItems: React.FC<Props> = (props) => {
  let navItems
  if (props.icons === 'only') {
    navItems = (
      <>
        <NavSearchBar slide />
        <NavItem location="/cart">
          <NavCartIcon />
        </NavItem>
      </>
    )
  } else if (props.icons === 'cart') {
    navItems = (
      <NavItem location="/cart" styles={{ width: '105%' }}>
        <NavCartIcon size={3} />
      </NavItem>
    )
  } else {
    navItems = (
      <>
        {props.home && (
          <NavItem location="/" color={props.color} ripple={props.ripple ? true : false}>
            home
          </NavItem>
        )}
        <NavItem location="/about-us" color={props.color} ripple={props.ripple ? true : false}>
          about us
        </NavItem>
        <NavItem location="/news" color={props.color} ripple={props.ripple ? true : false}>
          news
        </NavItem>
        <NavItem location="/artists" color={props.color} ripple={props.ripple ? true : false}>
          artists
        </NavItem>
        <NavItem location="/events" color={props.color} ripple={props.ripple ? true : false}>
          events
        </NavItem>
        <NavItem location="/shop" color={props.color} ripple={props.ripple ? true : false}>
          shop
        </NavItem>
        <NavItem location="/contact-us" color={props.color} ripple={props.ripple ? true : false}>
          contact us
        </NavItem>
        {props.icons && (
          <>
            <NavItem location="/cart">
              <NavCartIcon />
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
