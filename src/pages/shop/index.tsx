import { useState, useCallback } from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import Layout from '../../components/Layout/Layout'
import classes from '../../styles/pages/shop/Shop.module.scss'
import PrimaryHeader from '../../components/UI/Headers/PrimaryHeader/PrimaryHeader'
import ShopItem from '../../components/Shop/ShopItem/ShopItem'
import Dropdown from '../../components/UI/Inputs/Dropdown/Dropdown'
import { Props as InputProps, inputTypes } from '../../components/UI/Inputs/Input/Input'
import { cloneDeep } from 'lodash'
import { getDataArray } from '@services/firebase/admin'
import * as typeDefs from '@generated/graphql'
import Text from '@components/UI/Text/Text'

interface FormControls {
  category: InputProps
  sort: InputProps
}

type Item = Pick<typeDefs.ShopItem, 'pid' | 'name' | 'price' | 'images' | 'tag'>
interface Props {
  items: Item[]
}

const Shop: React.FC<Props> = (props) => {
  const inputControls = cloneDeep(formControls)
  const [category, setCategory] = useState<typeDefs.Tag | ''>('')
  const [sort, setSort] = useState('')

  const onCategoryChangeHandler = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value as typeDefs.Tag)
  }, [])
  const onSortChangeHandler = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(event.target.value)
  }, [])

  let items: Item[] | JSX.Element[] | JSX.Element = [...props.items]

  if (category) {
    items = items.filter((shopItem) => shopItem.tag === category)
  }

  if (sort) {
    items.sort((shopItemA, shopItemB) => {
      if (sort === 'priceLow') {
        return shopItemA.price - shopItemB.price
      } else if (sort === 'priceHigh') {
        return shopItemB.price - shopItemA.price
      }
      return 0
    })
  }

  items = items.map((item, i) => (
    <ShopItem pid={item.pid} name={item.name} price={item.price} image={item.images[0]} key={i} />
  ))

  return (
    <>
      <Head>
        <title>Shop | Super Delicious Records</title>
      </Head>
      <Layout pageType="main">
        <PrimaryHeader>Shop</PrimaryHeader>
        <div className={classes.Filters}>
          <div
            style={{
              width: '45%',
              maxWidth: '25rem',
            }}
          >
            <span
              style={{
                position: 'relative',
                top: '1rem',
                textTransform: 'uppercase',
                color: 'var(--light-purple-color)',
                fontSize: '1.2rem',
              }}
            >
              Filter
            </span>
            <Dropdown
              {...inputControls.category}
              onChange={onCategoryChangeHandler}
              value={category}
            ></Dropdown>
          </div>
          <div
            style={{
              width: '45%',
              maxWidth: '25rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}
          >
            <span
              style={{
                position: 'relative',
                top: '1rem',
                textTransform: 'uppercase',
                color: 'var(--light-purple-color)',
                fontSize: '1.2rem',
              }}
            >
              Sort
            </span>
            <Dropdown
              {...inputControls.sort}
              onChange={onSortChangeHandler}
              value={sort}
            ></Dropdown>
          </div>
        </div>
        {items.length > 0 ? (
          <div className={classes.Shop}>{items}</div>
        ) : (
          <div style={{ textAlign: 'center', margin: '3rem auto' }}>
            <Text styles={{ fontSize: '2rem', color: 'var(--light-gray-color)' }}>
              More items coming soon!
            </Text>
          </div>
        )}
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
        { value: typeDefs.Tag.Shirt, displayValue: 'Shirts' },
        { value: typeDefs.Tag.Swag, displayValue: 'Swag' },
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
        { value: 'priceHigh', displayValue: 'Price (High)' },
        { value: 'priceLow', displayValue: 'Price (Low)' },
      ],
    },
  },
}

export const getStaticProps: GetStaticProps = async () => {
  const artists = await getDataArray<typeDefs.Artist>('/artists')
  const uniqueArtists: string[] = []
  for (const artist of artists) {
    uniqueArtists.push(artist.name)
  }
  const shop = await getDataArray<typeDefs.ShopItem>('/shop')
  const shopItems = []
  for (const shopItem of shop) {
    shopItems.push({
      pid: shopItem.pid,
      name: shopItem.name,
      price: shopItem.price,
      images: [shopItem.images[0]],
      tag: shopItem.tag,
    })
  }
  return {
    props: {
      artists: uniqueArtists,
      items: shopItems,
    },
    revalidate: 1,
  }
}
