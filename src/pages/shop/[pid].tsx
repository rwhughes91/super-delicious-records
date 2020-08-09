import { useReducer, useState } from 'react'
import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'
import classes from '../../styles/pages/shop/ShopDetail.module.scss'
import Layout from '../../components/Layout/Layout'
import PrimaryHeader from '../../components/UI/Headers/PrimaryHeader/PrimaryHeader'
import ShopItem from '../../components/Shop/ShopItem/ShopItem'
import ShopCarousel from '../../components/Shop/ShopCarousel/ShopCarousel'
import SizeChart from '../../components/Shop/SizeChart/SizeChart'
import ProductDescription from '../../components/Shop/ProductDescription/ProductDescription'

interface Props {
  pid: string
  name: string
  imageUrl: string
  imageSetUrl: string
  price: number
}

interface Action {
  type: string
  key: string
  value: string
}

interface InputState {
  value: string
  valid: boolean
}

interface State {
  size: InputState
  color: InputState
  qty: InputState
  formIsValid: boolean
  [key: string]: InputState | boolean
}

const initialState: State = {
  size: { value: 'size', valid: false },
  color: { value: 'color', valid: false },
  qty: { value: '1', valid: true },
  formIsValid: false,
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'change': {
      const newState: State = {
        ...state,
        [action.key]: { value: action.value, valid: true },
      }
      let formIsValid = true
      for (const key in newState) {
        if (key === 'size' || key === 'color' || key === 'qty') {
          formIsValid = newState[key].valid && formIsValid
        }
      }
      return {
        ...newState,
        formIsValid,
      }
    }
    default:
      return state
  }
}

const ShopItemDetail: React.FC<Props> = (props) => {
  const images = [
    {
      imageUrl: props.imageUrl,
      imageSetUrl: props.imageSetUrl,
      alt: 't-shirt',
    },
    {
      imageUrl: props.imageUrl,
      imageSetUrl: props.imageSetUrl,
      alt: 't-shirt',
    },
    {
      imageUrl: props.imageUrl,
      imageSetUrl: props.imageSetUrl,
      alt: 't-shirt',
    },
    {
      imageUrl: props.imageUrl,
      imageSetUrl: props.imageSetUrl,
      alt: 't-shirt',
    },
    {
      imageUrl: props.imageUrl,
      imageSetUrl: props.imageSetUrl,
      alt: 't-shirt',
    },
  ]

  const [formState, formDispatch] = useReducer(reducer, initialState)
  const [showModal, setShowModal] = useState(false)

  const onInputChangeHandler = (
    key: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    formDispatch({ type: 'change', key: key, value: event.target.value })
  }

  const onClickModalHandler = () => {
    setShowModal((prevState) => !prevState)
  }

  const size = 300
  return (
    <>
      <Head>
        <title>Shop | Super Delicious Records</title>
      </Head>
      <Layout pageType="main" currentPage={props.name}>
        <PrimaryHeader>{props.name}</PrimaryHeader>
        <div className={classes.ShopItemDetail}>
          <ShopCarousel size={size} images={images} />
          <div style={{ height: size }} className={classes.ShopItemDescription}>
            <div className={classes.Price}>{props.price}</div>
            <form>
              <select
                className={classes.Dropdown}
                name="size"
                id="size"
                value={formState.size.value}
                onBlur={(event) => onInputChangeHandler('size', event)}
                onChange={(event) => onInputChangeHandler('size', event)}
              >
                <option disabled value="size">
                  Select a size
                </option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
              <select
                className={classes.Dropdown}
                name="color"
                id="color"
                value={formState.color.value}
                onBlur={(event) => onInputChangeHandler('color', event)}
                onChange={(event) => onInputChangeHandler('color', event)}
              >
                <option disabled value="color">
                  Select a color
                </option>
                <option value="green">green</option>
                <option value="red">red</option>
                <option value="blue">blue</option>
              </select>
              <input
                type="number"
                step="1"
                min="1"
                max="99"
                inputMode="numeric"
                className={classes.Input}
                placeholder="Qty"
                value={formState.qty.value}
                onChange={(event) => onInputChangeHandler('qty', event)}
              />
              <button className={classes.Button} disabled={!formState.formIsValid}>
                Add to Cart
              </button>
            </form>
            <div className={[classes.Status, classes.Available].join(' ')}>2 in stock</div>
          </div>
        </div>
        <ProductDescription
          onClickModalHandler={onClickModalHandler}
          description="You’ve now found the staple t-shirt of your wardrobe. It’s made of a thicker, heavier
          cotton, but it’s still soft and comfy. And the double stitching on the neckline and
          sleeves add more durability to what is sure to be a favorite!"
          moreInfo="Weight: 1 pound"
        />
        <div>
          <PrimaryHeader>Related Products</PrimaryHeader>
          <div className={classes.RelatedProducts}>
            <ShopItem {...props} size="200px" />
            <ShopItem {...props} size="200px" />
            <ShopItem {...props} size="200px" />
          </div>
        </div>
        {showModal && <SizeChart onClick={onClickModalHandler} />}
      </Layout>
    </>
  )
}

export default ShopItemDetail

export const getStaticProps: GetStaticProps = async (context) => {
  const pid = context.params?.pid
  const item = items.find((item) => item.pid === pid)
  return {
    props: {
      ...item,
    },
    revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { pid: '1' } },
      { params: { pid: '2' } },
      { params: { pid: '3' } },
      { params: { pid: '4' } },
      { params: { pid: '5' } },
      { params: { pid: '6' } },
    ],
    fallback: false,
  }
}

const items = [
  {
    pid: '1',
    name: `Super Delicious T-Shirt`,
    imageUrl: '/shop/sdr-shop-item-small.jpg',
    imageSetUrl:
      '/shop/sdr-shop-item-small.jpg 150w, /shop/sdr-shop-item-768.jpg 768w, /shop/sdr-shop-item.jpg 1000w',
    price: 14.99,
  },
  {
    pid: '2',
    name: `Super Delicious T-Shirt`,
    imageUrl: '/shop/sdr-shop-item-small.jpg',
    imageSetUrl:
      '/shop/sdr-shop-item-small.jpg 150w, /shop/sdr-shop-item-768.jpg 768w, /shop/sdr-shop-item.jpg 1000w',
    price: 14.99,
  },
  {
    pid: '3',
    name: `Super Delicious T-Shirt`,
    imageUrl: '/shop/sdr-shop-item-small.jpg',
    imageSetUrl:
      '/shop/sdr-shop-item-small.jpg 150w, /shop/sdr-shop-item-768.jpg 768w, /shop/sdr-shop-item.jpg 1000w',
    price: 14.99,
  },
  {
    pid: '4',
    name: `Super Delicious T-Shirt`,
    imageUrl: '/shop/sdr-shop-item-small.jpg',
    imageSetUrl:
      '/shop/sdr-shop-item-small.jpg 150w, /shop/sdr-shop-item-768.jpg 768w, /shop/sdr-shop-item.jpg 1000w',
    price: 14.99,
  },
  {
    pid: '5',
    name: `Super Delicious T-Shirt`,
    imageUrl: '/shop/sdr-shop-item-small.jpg',
    imageSetUrl:
      '/shop/sdr-shop-item-small.jpg 150w, /shop/sdr-shop-item-768.jpg 768w, /shop/sdr-shop-item.jpg 1000w',
    price: 14.99,
  },
  {
    pid: '6',
    name: `Super Delicious T-Shirt`,
    imageUrl: '/shop/sdr-shop-item-small.jpg',
    imageSetUrl:
      '/shop/sdr-shop-item-small.jpg 150w, /shop/sdr-shop-item-768.jpg 768w, /shop/sdr-shop-item.jpg 1000w',
    price: 14.99,
  },
]
