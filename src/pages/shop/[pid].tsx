import { useReducer, useState, useCallback } from 'react'
import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'
import classes from '../../styles/pages/shop/ShopDetail.module.scss'
import Layout from '../../components/Layout/Layout'
import PrimaryHeader from '../../components/UI/Headers/PrimaryHeader/PrimaryHeader'
import ShopItem from '../../components/Shop/ShopItem/ShopItem'
import ShopCarousel from '../../components/Shop/ShopCarousel/ShopCarousel'
import SizeChart from '../../components/Shop/SizeChart/SizeChart'
import ProductDescription from '../../components/Shop/ProductDescription/ProductDescription'
import Dropdown from '../../components/UI/Inputs/Dropdown/Dropdown'
import FormButton from '../../components/UI/Buttons/FormButton/FormButton'
import { Props as InputProps, inputTypes } from '../../components/UI/Inputs/Input/Input'
import ContactInput from '../../components/UI/Inputs/ContactInput/ContactInput'
import { cloneDeep } from 'lodash'

interface FormControls {
  size: InputProps
  color: InputProps
  qty: InputProps
}

export interface Props {
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

interface State extends FormControls {
  formIsInvalid: boolean
  [key: string]: InputProps | boolean
}

const ShopItemDetail: React.FC<Props> = (props) => {
  const inputControls = cloneDeep(formControls)
  const initialState: State = {
    ...inputControls,
    color: {
      ...inputControls.color,
      elementConfig: {
        ...inputControls.color.elementConfig,
        options: [{ value: 'green', displayValue: 'green' }],
      },
    },
    formIsInvalid: true,
  }
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
    {
      imageUrl: props.imageUrl,
      imageSetUrl: props.imageSetUrl,
      alt: 't-shirt',
    },
  ]
  const relatedImages = [props, props, props, props]

  const [formState, formDispatch] = useReducer(reducer, initialState)
  const [showModal, setShowModal] = useState(false)

  const onInputChangeHandler = useCallback(
    (key: string, event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      formDispatch({ type: 'change', key: key, value: event.target.value })
    },
    []
  )

  const onBlurChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    // Do something
  }

  const onClickModalHandler = useCallback(() => {
    setShowModal((prevState) => !prevState)
  }, [])

  const onFormSubmitHandler = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // locally store item with name, size, color, qty, price into a list of other items stored
    // send this item to firebase --> cart via our api set up
  }, [])

  const size = 425

  return (
    <>
      <Head>
        <title>Shop | Super Delicious Records</title>
      </Head>
      <Layout pageType="main" currentPage={props.name}>
        <div className={classes.PhoneHeader}>
          <PrimaryHeader>{props.name}</PrimaryHeader>
        </div>
        <div className={classes.ShopItemDetail}>
          <ShopCarousel size={size} images={images} />
          <div
            style={{ maxWidth: size, width: '100vw' }}
            className={classes.ShopItemDescriptionContainer}
          >
            <div className={classes.ShopItemDescription}>
              <div className={classes.Title}>{props.name}</div>
              <div className={classes.Price}>{props.price}</div>
              <form onSubmit={onFormSubmitHandler}>
                <Dropdown
                  {...formState.size}
                  onChange={(event) => onInputChangeHandler('size', event)}
                ></Dropdown>
                <Dropdown
                  {...formState.color}
                  onChange={(event) => onInputChangeHandler('color', event)}
                ></Dropdown>
                <ContactInput
                  {...formState.qty}
                  styles={{ width: '100%' }}
                  onChange={(event) => onInputChangeHandler('qty', event)}
                />
                <FormButton disabled={formState.formIsInvalid}>Add to Cart</FormButton>
              </form>
              <div className={[classes.Status, classes.Available].join(' ')}>2 in stock</div>
            </div>
          </div>
        </div>
        <ProductDescription
          onClickModalHandler={onClickModalHandler}
          description="You’ve now found the staple t-shirt of your wardrobe. It’s made of a thicker, heavier
          cotton, but it’s still soft and comfy. And the double stitching on the neckline and
          sleeves add more durability to what is sure to be a favorite!"
          moreInfo="Weight: 1 pound"
        />
        <PrimaryHeader>Related Products</PrimaryHeader>
        <div className={classes.RelatedProducts}>
          {relatedImages.map((relatedImage, i) => {
            return <ShopItem key={i} {...relatedImage} size="200px" />
          })}
        </div>
        {showModal && <SizeChart onClick={onClickModalHandler} />}
      </Layout>
    </>
  )
}

export default ShopItemDetail

const formControls: FormControls = {
  size: {
    value: '',
    type: inputTypes.SELECT,
    invalid: false,
    touched: false,
    errorMessage: '',
    label: 'Category',
    elementConfig: {
      placeholder: 'Category',
      type: 'text',
      options: [
        { value: 'extraSmall', displayValue: 'X-Small' },
        { value: 'small', displayValue: 'Small' },
        { value: 'medium', displayValue: 'Medium' },
        { value: 'large', displayValue: 'Large' },
        { value: 'extraLarge', displayValue: 'X-Large' },
      ],
    },
  },
  color: {
    value: '',
    type: inputTypes.SELECT,
    invalid: false,
    touched: false,
    errorMessage: '',
    label: 'Category',
    elementConfig: {
      placeholder: 'Category',
      type: 'text',
      options: [],
    },
  },
  qty: {
    value: '',
    type: inputTypes.INPUT,
    invalid: true,
    touched: false,
    errorMessage: '',
    validation: { required: true },
    elementConfig: {
      placeholder: 'Qty',
      type: 'number',
    },
  },
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'change': {
      const newState = {
        ...state,
        [action.key]: { ...(state[action.key] as InputProps), value: action.value, touched: true },
      }
      let formIsInvalid = false
      for (const key in newState) {
        if (key === 'qty' || key === 'color' || key === 'size') {
          if (key === action.key) {
            formIsInvalid = false || formIsInvalid
          }
          formIsInvalid = !newState[key].touched || formIsInvalid
        }
      }
      return { ...newState, formIsInvalid }
    }
    default:
      return state
  }
}

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
    imageUrl: '/shop/sdr-shop-item-small.png',
    imageSetUrl:
      '/shop/sdr-shop-item-small.png 150w, /shop/sdr-shop-item-768.png 768w, /shop/sdr-shop-item.png 1000w',
    price: 14.99,
  },
  {
    pid: '2',
    name: `Super Delicious T-Shirt`,
    imageUrl: '/shop/sdr-shop-item-small.png',
    imageSetUrl:
      '/shop/sdr-shop-item-small.png 150w, /shop/sdr-shop-item-768.png 768w, /shop/sdr-shop-item.png 1000w',
    price: 14.99,
  },
  {
    pid: '3',
    name: `Super Delicious T-Shirt`,
    imageUrl: '/shop/sdr-shop-item-small.png',
    imageSetUrl:
      '/shop/sdr-shop-item-small.png 150w, /shop/sdr-shop-item-768.png 768w, /shop/sdr-shop-item.png 1000w',
    price: 14.99,
  },
  {
    pid: '4',
    name: `Super Delicious T-Shirt`,
    imageUrl: '/shop/sdr-shop-item-small.png',
    imageSetUrl:
      '/shop/sdr-shop-item-small.png 150w, /shop/sdr-shop-item-768.png 768w, /shop/sdr-shop-item.png 1000w',
    price: 14.99,
  },
  {
    pid: '5',
    name: `Super Delicious T-Shirt`,
    imageUrl: '/shop/sdr-shop-item-small.png',
    imageSetUrl:
      '/shop/sdr-shop-item-small.png 150w, /shop/sdr-shop-item-768.png 768w, /shop/sdr-shop-item.png 1000w',
    price: 14.99,
  },
  {
    pid: '6',
    name: `Super Delicious T-Shirt`,
    imageUrl: '/shop/sdr-shop-item-small.png',
    imageSetUrl:
      '/shop/sdr-shop-item-small.png 150w, /shop/sdr-shop-item-768.png 768w, /shop/sdr-shop-item.png 1000w',
    price: 14.99,
  },
]
