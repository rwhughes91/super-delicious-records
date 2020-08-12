import CartIcon from '../../UI/Icons/CartIcon/CartIcon'
import classes from './NavCartIcon.module.scss'

interface Props {
  size?: number
}

const NavCartIcon: React.FC<Props> = (props) => {
  return (
    <div className={classes.CartIconContainer}>
      <CartIcon size={props.size} />
      <div className={classes.CartNumber}>1</div>
    </div>
  )
}

export default NavCartIcon
