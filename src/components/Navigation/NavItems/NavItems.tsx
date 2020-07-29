import classes from './NavItems.module.scss'
import NavItem from './NavItem/NavItem'
import CartIcon from '../../UI/Icons/CartIcon/CartIcon'
import NavSearchBar from '../NavSearchBar/NavSearchBar'

interface Props {
  color: 'purple' | 'white'
  icons: boolean
}

const NavItems: React.FC<Props> = (props) => {
  return (
    <nav className={classes.NavigationItems}>
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
      <NavItem location="/error" color={props.color}>
        contact us
      </NavItem>
      {props.icons && (
        <>
          <NavItem location="/iconTest">
            <CartIcon />
          </NavItem>
          <NavSearchBar />
        </>
      )}
    </nav>
  )
}

export default NavItems
