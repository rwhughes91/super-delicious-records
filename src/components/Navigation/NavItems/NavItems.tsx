import React from 'react'
import classes from './NavItems.module.scss'
import NavItem from './NavItem/NavItem'
import NavCartIcon from '../NavCartIcon/NavCartIcon'
import NavSearchBar from '../NavSearchBar/NavSearchBar'
import ProfileIcon from '../../UI/Icons/ProfileIcon/ProfileIcon'

interface Props {
  color: 'purple' | 'white'
  icons: boolean | 'only' | 'cart'
  home?: boolean
  ripple?: true
  styles?: React.CSSProperties
  toggleModal?: () => void
}

const NavItems: React.FC<Props> = (props) => {
  let navItems
  if (props.icons === 'only') {
    navItems = (
      <>
        <NavSearchBar slide toggleModal={props.toggleModal} />
        <NavItem location="/shop/orders">
          <ProfileIcon size={2.4} />
        </NavItem>
        <NavItem location="/shop/cart">
          <NavCartIcon size={2.2} />
        </NavItem>
      </>
    )
  } else if (props.icons === 'cart') {
    navItems = (
      <div style={{ display: 'flex' }}>
        <NavItem location="/shop/orders" styles={{ marginRight: '2.5rem' }}>
          <ProfileIcon size={2.6} />
        </NavItem>
        <NavItem location="/shop/cart" styles={{ width: '105%' }}>
          <NavCartIcon size={2.2} />
        </NavItem>
      </div>
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
            <NavItem location="/shop/cart">
              <NavCartIcon size={2} />
            </NavItem>
            <NavItem location="/shop/orders">
              <ProfileIcon size={2.2} />
            </NavItem>
          </>
        )}
      </>
    )
  }
  return <nav className={classes.NavigationItems}>{navItems}</nav>
}

export default React.memo(NavItems)
