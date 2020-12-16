import React, { useContext, useCallback, ChangeEvent } from 'react'
import classes from './CartItem.module.scss'
import ShopImage from '../ShopImage/ShopImage'
import * as genTypes from '@generated/graphql'
import { Props as InputProps, inputTypes } from '@components/UI/Inputs/Input/Input'
import DropDown from '@components/UI/Inputs/Dropdown/Dropdown'
import useForm from '@hooks/useForm'
import { cloneDeep } from 'lodash'
import { CartContext } from '@context/CartProvider'

interface FormControls {
  qty: InputProps
}

interface State extends FormControls {
  formIsInvalid: boolean
  qty: InputProps
  [key: string]: InputProps | boolean
}

type ShopItem = Pick<genTypes.ShopItem, 'name' | 'images'>

interface Props extends Pick<genTypes.OrderShopItem, 'qty' | 'purchasePrice' | 'color' | 'size'> {
  pid?: string
  shopItem: ShopItem
  styles?: React.CSSProperties
  order?: boolean
  shopPid?: string
}

const CartItem: React.FC<Props> = (props) => {
  const { cart, addToCartHandler, removeFromCart } = useContext(CartContext)
  const inputControls = cloneDeep(formControls)
  const initialState: State = {
    qty: {
      ...inputControls.qty,
      value: props.qty,
      elementConfig: {
        ...inputControls.qty.elementConfig,
        options: generateQtyOptions(),
      },
    },
    formIsInvalid: true,
  }

  const [qtyState, dispatchFormData] = useForm(initialState)

  const onChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatchFormData({ type: 'change', key: 'qty', value: event?.target.value })
      const fullCartItems = cart.cart.local.concat(cart.cart.user)
      if (event?.target.value !== qtyState.qty.value) {
        const itemToUpdate = fullCartItems.find((cartItem) => cartItem.pid === props.pid)
        if (itemToUpdate) {
          addToCartHandler(itemToUpdate, 'edit', parseInt(event?.target.value))
        }
      }
    },
    [dispatchFormData, cart.cart, addToCartHandler, qtyState.qty.value, props.pid]
  )

  const removeCartItemHandler = useCallback(() => {
    if (props.pid) {
      removeFromCart(props.pid)
    }
  }, [props.pid, removeFromCart])

  const sizeAndColor = (
    <div className={classes.Row}>
      {props.color && (
        <div>
          <span className={classes.SubTextHeader}>Color: </span>
          <span className={classes.SubText}>{props.color}</span>
        </div>
      )}
      {props.size && (
        <div>
          <span className={classes.SubTextHeader}>Size: </span>
          <span className={classes.SubText}>
            {props.size[0] + props.size.slice(1).toLowerCase()}
          </span>
        </div>
      )}
    </div>
  )

  return (
    <div className={classes.CartItem} style={props.styles}>
      <div className={classes.Title}>{props.shopItem.name}</div>
      <div className={classes.Image}>
        <ShopImage
          size="100%"
          imageUrl={props.shopItem.images[0].imageUrl}
          imageSetUrl={props.shopItem.images[0].imageSetUrl}
          base64={props.shopItem.images[0].base64}
          alt={props.shopItem.images[0].alt}
          styles={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className={classes.DetailsContainer}>
        <div
          className={[classes.TitleContainer, props.size || props.color ? classes.Static : ''].join(
            ' '
          )}
        >
          <div className={classes.TitleLarge}>{props.shopItem.name}</div>
          {props.size || props.color ? sizeAndColor : null}
        </div>
        <div className={classes.QtyContainer}>
          <span style={{ top: props.order ? '-2rem' : '-1.25rem' }} className={classes.QtyTitle}>
            Qty
          </span>
          {props.order ? (
            <span
              className={classes.Qty}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {props.qty}
            </span>
          ) : (
            <DropDown
              styles={{ width: '4.5rem', textTransform: 'capitalize' }}
              {...qtyState.qty}
              value={qtyState.qty.value}
              onChange={onChangeHandler}
            />
          )}
        </div>
        <div className={classes.PriceContainer}>
          <div className={classes.Price}>{(props.purchasePrice * props.qty).toFixed(2)}</div>
          {!props.order && (
            <button className={classes.RemoveButton} onClick={removeCartItemHandler}>
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default React.memo(CartItem)

const formControls: FormControls = {
  qty: {
    value: '',
    type: inputTypes.SELECT,
    invalid: false,
    touched: false,
    errorMessage: '',
    validation: { required: true },
    elementConfig: {
      placeholder: 'Qty',
      type: 'text',
      options: [],
    },
  },
}

function generateQtyOptions() {
  const options = []
  for (let x = 1; x < 31; x++) {
    options.push({ value: x.toString(), displayValue: x.toString() })
  }
  return options
}
