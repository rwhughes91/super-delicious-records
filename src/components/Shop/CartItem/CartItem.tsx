import React from 'react'
import classes from './CartItem.module.scss'
import ShopImage from '../ShopImage/ShopImage'
import * as genTypes from '@generated/graphql'

type ShopItem = Pick<genTypes.ShopItem, 'name' | 'images'>

interface Props extends Pick<genTypes.OrderShopItem, 'qty' | 'purchasePrice'> {
  shopItem: ShopItem
  styles?: React.CSSProperties
  order?: boolean
}

const CartItem: React.FC<Props> = (props) => {
  return (
    <div className={classes.CartItem} style={props.styles}>
      <div className={classes.Title}>{props.shopItem.name}</div>
      <div className={classes.Image}>
        <ShopImage
          size="100%"
          imageUrl={props.shopItem.images[0].imageUrl}
          imageSetUrl={props.shopItem.images[0].imageSetUrl}
          alt={props.shopItem.images[0].alt}
          styles={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className={classes.DetailsContainer}>
        <div className={classes.TitleLarge}>{props.shopItem.name}</div>
        <div className={classes.QtyContainer}>
          <span className={classes.QtyTitle}>Qty</span>
          {props.order ? (
            <span
              className={classes.Qty}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
              }}
            >
              {props.qty}
            </span>
          ) : (
            <input
              className={classes.Qty}
              type="number"
              inputMode="numeric"
              step="1"
              min="1"
              max="99"
              value={props.qty}
            />
          )}
        </div>
        <div className={classes.PriceContainer}>
          <div className={classes.Price}>{props.purchasePrice * props.qty}</div>
          {!props.order && <button className={classes.RemoveButton}>Remove</button>}
        </div>
      </div>
    </div>
  )
}

export default React.memo(CartItem)
