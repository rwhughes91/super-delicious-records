import { useState, useCallback, useContext, useEffect } from 'react'
import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'
import { cloneDeep } from 'lodash'
import classes from '@styles/pages/shop/ShopDetail.module.scss'
import Layout from '@components/Layout/Layout'
import PrimaryHeader from '@components/UI/Headers/PrimaryHeader/PrimaryHeader'
import ShopItem from '@components/Shop/ShopItem/ShopItem'
import ShopCarousel from '@components/Shop/ShopCarousel/ShopCarousel'
import SizeChart from '@components/Shop/SizeChart/SizeChart'
import ProductDescription from '@components/Shop/ProductDescription/ProductDescription'
import Dropdown from '@components/UI/Inputs/Dropdown/Dropdown'
import FormButton from '@components/UI/Buttons/FormButton/FormButton'
import { Props as InputProps, inputTypes } from '@components/UI/Inputs/Input/Input'
import { getDataItem, getDataArray, getChildrenEqualTo } from '@services/firebase/admin'
import * as typeDefs from '@generated/graphql'
import { convertFieldsToParams } from '@utils/helpers'
import { CartContext } from '@context/CartProvider'
import useForm from '@hooks/useForm'
import { v4 } from 'uuid'

interface FormControls {
  size: InputProps
  color: InputProps
  qty: InputProps
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
  const { addToCartHandler, editingState } = useContext(CartContext)
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
    qty: {
      ...inputControls.qty,
      elementConfig: {
        ...inputControls.qty.elementConfig,
        options: generateQtyOptions(),
      },
    },
    formIsInvalid: true,
  }

  const [formState, formDispatch] = useForm(initialState)
  const [showModal, setShowModal] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        setSubmitted(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [submitted])

  const onInputChangeHandler = useCallback(
    (key: string, event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      formDispatch({ type: 'change', key: key, value: event.target.value })
    },
    [formDispatch]
  )

  const onClickModalHandler = useCallback(() => {
    setShowModal((prevState) => !prevState)
  }, [])

  const onFormSubmitHandler = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      setSubmitted(true)
      formDispatch({ type: 'reset', key: '', value: '' })
      let image = props.item.images.find(
        (image) => image.color?.toLowerCase() === formState.color.value.toString().toLowerCase()
      )
      if (!image) {
        image = props.item.images[0]
      }
      const cartItem = {
        pid: v4(),
        shopPid: props.item.pid,
        qty: parseInt(formState.qty.value.toString()),
        size: formState.size.value.toString() as typeDefs.Size,
        color: formState.color.value.toString(),
        shopItem: {
          name: props.item.name,
          price: props.item.price,
          images: [image],
        },
      }
      addToCartHandler(cartItem, 'create')
    },
    [addToCartHandler, formState.qty, formState.size, formState.color, props.item, formDispatch]
  )

  const size = 425

  return (
    <>
      <Head>
        <title>Shop | Super Delicious Records</title>
      </Head>
      <Layout pageType="main" currentPage={props.item.name}>
        <div className={classes.PhoneHeader}>
          <PrimaryHeader styles={{ fontSize: '2rem' }}>{props.item.name}</PrimaryHeader>
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
                  onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
                    onInputChangeHandler('size', event)
                  }
                ></Dropdown>
                <Dropdown
                  {...formState.color}
                  onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
                    onInputChangeHandler('color', event)
                  }
                ></Dropdown>
                <Dropdown
                  {...formState.qty}
                  styles={{ width: '100%' }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
                    onInputChangeHandler('qty', event)
                  }
                />
                <FormButton
                  disabled={formState.formIsInvalid || editingState.loading}
                  loading={editingState.loading}
                  successOnClick={submitted && !editingState.loading}
                >
                  Add to Cart
                </FormButton>
              </form>
              <div
                className={[
                  classes.Status,
                  props.item.qtyAvailable > 0 ? classes.Available : classes.NotAvailable,
                ].join(' ')}
              >
                {props.item.qtyAvailable > 0 ? `In stock` : 'Not in stock'}
              </div>
            </div>
          </div>
        </div>
        <ProductDescription
          onClickModalHandler={onClickModalHandler}
          description={props.item.description}
          moreInfo={props.item.moreInfo || props.item.weight || 'None'}
        />
        <PrimaryHeader>Related Products</PrimaryHeader>
        <div
          className={[
            classes.RelatedProducts,
            props.relatedProducts.length < 3 ? classes.Center : '',
          ].join(' ')}
        >
          {props.relatedProducts.map((relatedImage, i) => {
            return (
              <ShopItem
                key={i}
                pid={relatedImage.pid}
                name={relatedImage.name}
                price={relatedImage.price}
                image={relatedImage.images[0]}
                size="200px"
                fixed
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
    invalid: true,
    touched: false,
    errorMessage: '',
    label: 'Category',
    validation: { required: true },
    elementConfig: {
      placeholder: 'Category',
      type: 'text',
      options: [
        { value: typeDefs.Size.Xsmall, displayValue: 'X-Small' },
        { value: typeDefs.Size.Small, displayValue: 'Small' },
        { value: typeDefs.Size.Medium, displayValue: 'Medium' },
        { value: typeDefs.Size.Large, displayValue: 'Large' },
        { value: typeDefs.Size.Xlarge, displayValue: 'X-Large' },
      ],
    },
  },
  color: {
    value: '',
    type: inputTypes.SELECT,
    invalid: true,
    touched: false,
    errorMessage: '',
    label: 'Category',
    validation: { required: true },
    elementConfig: {
      placeholder: 'Category',
      type: 'text',
      options: [],
    },
  },
  qty: {
    value: '1',
    type: inputTypes.SELECT,
    invalid: false,
    touched: true,
    errorMessage: '',
    validation: { required: true },
    elementConfig: {
      placeholder: 'Qty',
      type: 'text',
      options: [],
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

function generateQtyOptions() {
  const options = []
  for (let x = 1; x < 31; x++) {
    options.push({ value: x.toString(), displayValue: x.toString() })
  }
  return options
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
      relatedProducts: relatedProductsTrimmed.slice(0, 3),
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
