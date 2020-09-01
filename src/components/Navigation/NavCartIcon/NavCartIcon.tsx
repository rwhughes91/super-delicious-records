import React, { useContext } from 'react'
import CartIcon from '../../UI/Icons/CartIcon/CartIcon'
import classes from './NavCartIcon.module.scss'
import { CartContext } from '@context/CartProvider'

interface Props {
  size?: number
}

const NavCartIcon: React.FC<Props> = (props) => {
  const { cart } = useContext(CartContext)
  return (
    <div className={classes.CartIconContainer}>
      <CartIcon size={props.size} />
      {cart.qty > 0 && <div className={classes.CartNumber}>{cart.qty}</div>}
    </div>
  )
}

export default React.memo(NavCartIcon)
