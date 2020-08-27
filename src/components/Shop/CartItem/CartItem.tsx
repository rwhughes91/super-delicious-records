import classes from './CartItem.module.scss'
import ShopImage from '../ShopImage/ShopImage'
import { ShopItem as CartItemProps } from '../../../pages/shop/cart'

interface Props extends CartItemProps {
  styles?: React.CSSProperties
}

const CartItem: React.FC<Props> = (props) => {
  return (
    <div className={classes.CartItem} style={props.styles}>
      <div className={classes.Title}>{props.item.name}</div>
      <div className={classes.Image}>
        <ShopImage
          size="100%"
          imageUrl={props.item.imageUrl}
          imageSetUrl={props.item.imageSetUrl}
          alt={props.item.name}
          styles={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className={classes.DetailsContainer}>
        <div className={classes.TitleLarge}>{props.item.name}</div>
        <div className={classes.QtyContainer}>
          <span className={classes.QtyTitle}>Qty</span>
          <input
            className={classes.Qty}
            type="number"
            inputMode="numeric"
            step="1"
            min="1"
            max="99"
            value={props.qty}
          />
        </div>
        <div className={classes.PriceContainer}>
          <div className={classes.Price}>{props.item.price * props.qty}</div>
          <button className={classes.RemoveButton}>Remove</button>
        </div>
      </div>
    </div>
  )
}

export default CartItem
