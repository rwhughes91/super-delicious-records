import { useState } from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import Layout from '../../components/Layout/Layout'
import classes from '../../styles/pages/shop/Shop.module.scss'
import PrimaryHeader from '../../components/UI/Headers/PrimaryHeader/PrimaryHeader'
import ShopItem from '../../components/Shop/ShopItem/ShopItem'
import Dropdown from '../../components/UI/Inputs/Dropdown/Dropdown'
import { Props as InputProps, inputTypes } from '../../components/UI/Inputs/Input/Input'
import { cloneDeep } from 'lodash'

interface FormControls {
  category: InputProps
  sort: InputProps
}

interface Props {
  artists: string[]
  items: Array<{ pid: string; name: string; imageUrl: string; imageSetUrl: string; price: number }>
}

const Shop: React.FC<Props> = (props) => {
  const inputControls = cloneDeep(formControls)
  const [category, setCategory] = useState('category')
  const [sort, setSort] = useState('sort')

  const onCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value)
  }
  const onSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(event.target.value)
  }

  return (
    <>
      <Head>
        <title>Shop | Super Delicious Records</title>
      </Head>
      <Layout pageType="main">
        <PrimaryHeader>Shop</PrimaryHeader>
        <div className={classes.Filters}>
          <div style={{ width: '45%', maxWidth: '25rem' }}>
            <Dropdown {...inputControls.category}></Dropdown>
          </div>
          <div style={{ width: '45%', maxWidth: '25rem' }}>
            <Dropdown {...inputControls.sort}></Dropdown>
          </div>
        </div>
        <div className={classes.Shop}>
          {props.items.map((item, i) => {
            return <ShopItem {...item} key={i} />
          })}
        </div>
      </Layout>
    </>
  )
}

export default Shop

const formControls: FormControls = {
  category: {
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
        { value: 'hats', displayValue: 'Hats' },
        { value: 'shirts', displayValue: 'Shirts' },
        { value: 'swag', displayValue: 'Swag' },
      ],
    },
  },
  sort: {
    value: '',
    type: inputTypes.SELECT,
    invalid: false,
    touched: false,
    errorMessage: '',
    label: 'Sort',
    elementConfig: {
      placeholder: 'Sort',
      type: 'text',
      options: [
        { value: 'popular', displayValue: 'Popular' },
        { value: 'latest', displayValue: 'Latest' },
        { value: 'priceHigh', displayValue: 'Price (High)' },
        { value: 'priceLow', displayValue: 'Price (Low)' },
      ],
    },
  },
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      artists: ['HYDRAFORM', 'GLASS ALICE'],
      items: [
        {
          pid: '1',
          name: `Super Delicious T-Shirt`,
          imageUrl: '/shop/sdr-shop-item.png',
          imageSetUrl:
            '/shop/sdr-shop-item-small.png 150w, /shop/sdr-shop-item-768.png 768w, /shop/sdr-shop-item.png 1000w',
          price: 14.99,
        },
        {
          pid: '2',
          name: `Super Delicious T-Shirt`,
          imageUrl: '/shop/sdr-shop-item.png',
          imageSetUrl:
            '/shop/sdr-shop-item-small.png 150w, /shop/sdr-shop-item-768.png 768w, /shop/sdr-shop-item.png 1000w',
          price: 14.99,
        },
        {
          pid: '3',
          name: `Super Delicious T-Shirt`,
          imageUrl: '/shop/sdr-shop-item.png',
          imageSetUrl:
            '/shop/sdr-shop-item-small.png 150w, /shop/sdr-shop-item-768.png 768w, /shop/sdr-shop-item.png 1000w',
          price: 14.99,
        },
        {
          pid: '4',
          name: `Super Delicious T-Shirt`,
          imageUrl: '/shop/sdr-shop-item.png',
          imageSetUrl:
            '/shop/sdr-shop-item-small.png 150w, /shop/sdr-shop-item-768.png 768w, /shop/sdr-shop-item.png 1000w',
          price: 14.99,
        },
        {
          pid: '5',
          name: `Super Delicious T-Shirt`,
          imageUrl: '/shop/sdr-shop-item.png',
          imageSetUrl:
            '/shop/sdr-shop-item-small.png 150w, /shop/sdr-shop-item-768.png 768w, /shop/sdr-shop-item.png 1000w',
          price: 14.99,
        },
        {
          pid: '6',
          name: `Super Delicious T-Shirt`,
          imageUrl: '/shop/sdr-shop-item.png',
          imageSetUrl:
            '/shop/sdr-shop-item-small.png 150w, /shop/sdr-shop-item-768.png 768w, /shop/sdr-shop-item.png 1000w',
          price: 14.99,
        },
        {
          pid: '7',
          name: `Super Delicious T-Shirt`,
          imageUrl: '/shop/sdr-shop-item.png',
          imageSetUrl:
            '/shop/sdr-shop-item-small.png 150w, /shop/sdr-shop-item-768.png 768w, /shop/sdr-shop-item.png 1000w',
          price: 14.99,
        },
        {
          pid: '8',
          name: `Super Delicious T-Shirt`,
          imageUrl: '/shop/sdr-shop-item.png',
          imageSetUrl:
            '/shop/sdr-shop-item-small.png 150w, /shop/sdr-shop-item-768.png 768w, /shop/sdr-shop-item.png 1000w',
          price: 14.99,
        },
        {
          pid: '9',
          name: `Super Delicious T-Shirt`,
          imageUrl: '/shop/sdr-shop-item.png',
          imageSetUrl:
            '/shop/sdr-shop-item-small.png 150w, /shop/sdr-shop-item-768.png 768w, /shop/sdr-shop-item.png 1000w',
          price: 14.99,
        },
        {
          pid: '10',
          name: `Super Delicious T-Shirt`,
          imageUrl: '/shop/sdr-shop-item.png',
          imageSetUrl:
            '/shop/sdr-shop-item-small.png 150w, /shop/sdr-shop-item-768.png 768w, /shop/sdr-shop-item.png 1000w',
          price: 14.99,
        },
        {
          pid: '11',
          name: `Super Delicious T-Shirt`,
          imageUrl: '/shop/sdr-shop-item.png',
          imageSetUrl:
            '/shop/sdr-shop-item-small.png 150w, /shop/sdr-shop-item-768.png 768w, /shop/sdr-shop-item.png 1000w',
          price: 14.99,
        },
        {
          pid: '12',
          name: `Super Delicious T-Shirt`,
          imageUrl: '/shop/sdr-shop-item.png',
          imageSetUrl:
            '/shop/sdr-shop-item-small.png 150w, /shop/sdr-shop-item-768.png 768w, /shop/sdr-shop-item.png 1000w',
          price: 14.99,
        },
      ],
    },
  }
}
