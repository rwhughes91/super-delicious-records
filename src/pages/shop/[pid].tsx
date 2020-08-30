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
import { getDataItem, getDataArray, getChildrenEqualTo } from '@services/firebase/admin'
import * as typeDefs from '@generated/graphql'
import { convertFieldsToParams } from '@utils/helpers'

interface FormControls {
  size: InputProps
  color: InputProps
  qty: InputProps
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

interface Props {
  item: typeDefs.ShopItem
  relatedProducts: typeDefs.ShopItem[]
}

const ShopItemDetail: React.FC<Props> = (props) => {
  const inputControls = cloneDeep(formControls)
  const initialState: State = {
    ...inputControls,
    color: {
      ...inputControls.color,
      elementConfig: {
        ...inputControls.color.elementConfig,
        options: createColorOptions(props.item.colors),
      },
    },
    formIsInvalid: true,
  }

  const [formState, formDispatch] = useReducer(reducer, initialState)
  const [showModal, setShowModal] = useState(false)

  const onInputChangeHandler = useCallback(
    (key: string, event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      formDispatch({ type: 'change', key: key, value: event.target.value })
    },
    []
  )

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
      <Layout pageType="main" currentPage={props.item.name}>
        <div className={classes.PhoneHeader}>
          <PrimaryHeader>{props.item.name}</PrimaryHeader>
        </div>
        <div className={classes.ShopItemDetail}>
          <ShopCarousel size={size} images={props.item.images} />
          <div
            style={{ maxWidth: size, width: '100vw' }}
            className={classes.ShopItemDescriptionContainer}
          >
            <div className={classes.ShopItemDescription}>
              <div className={classes.Title}>{props.item.name}</div>
              <div className={classes.Price}>{props.item.price}</div>
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
              <div
                className={[
                  classes.Status,
                  props.item.qtyAvailable > 0 ? classes.Available : classes.NotAvailable,
                ].join(' ')}
              >
                {props.item.qtyAvailable > 0
                  ? `${props.item.qtyAvailable} in stock`
                  : 'Not in stock'}
              </div>
            </div>
          </div>
        </div>
        <ProductDescription
          onClickModalHandler={onClickModalHandler}
          description={props.item.description}
          moreInfo={props.item.weight}
        />
        <PrimaryHeader>Related Products</PrimaryHeader>
        <div className={classes.RelatedProducts}>
          {props.relatedProducts.map((relatedImage, i) => {
            return (
              <ShopItem
                key={i}
                pid={relatedImage.pid}
                name={relatedImage.name}
                price={relatedImage.price}
                image={relatedImage.images[0]}
                size="200px"
              />
            )
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

function createColorOptions(colors: string[]) {
  const colorOptions = []
  for (const color of colors) {
    colorOptions.push({ value: color, displayValue: color })
  }
  return colorOptions
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
  const shopItem = await getDataItem<typeDefs.ShopItem>(`/shop/${pid}`)
  const relatedProducts = await getChildrenEqualTo<typeDefs.ShopItem>('/shop', 'tag', shopItem.tag)
  const relatedProductsTrimmed = []
  for (const relatedProduct of relatedProducts) {
    if (relatedProduct.pid !== shopItem.pid) {
      relatedProductsTrimmed.push({
        pid: relatedProduct.pid,
        name: relatedProduct.name,
        price: relatedProduct.price,
        images: [relatedProduct.images[0]],
      })
    }
  }
  return {
    props: {
      item: shopItem,
      relatedProducts: relatedProductsTrimmed,
    },
    revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const shop = await getDataArray<typeDefs.ShopItem>('/shop')
  return {
    paths: convertFieldsToParams(['pid'], shop),
    fallback: false,
  }
}
