import classes from './FooterNavItems.module.scss'
import NavItem from '../NavItems/NavItem/NavItem'

const NavItems: React.FC = () => {
  return (
    <nav className={classes.NavigationItems}>
      <NavItem location="/about-us" color="gray">
        about us
      </NavItem>
      <NavItem location="/news" color="gray">
        news
      </NavItem>
      <NavItem location="/artists" color="gray">
        artists
      </NavItem>
      <NavItem location="/events" color="gray">
        events
      </NavItem>
      <NavItem location="/shop" color="gray">
        shop
      </NavItem>
      <NavItem location="/contact-us" color="gray">
        contact us
      </NavItem>
    </nav>
  )
}

export default NavItems
