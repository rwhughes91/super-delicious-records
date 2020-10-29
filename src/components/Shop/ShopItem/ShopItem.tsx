import React from 'react'
import classes from './ShopItem.module.scss'
import Link from 'next/link'
import ShopImage from '../ShopImage/ShopImage'
import * as typeDefs from '@generated/graphql'

interface Props extends Pick<typeDefs.ShopItem, 'pid' | 'name' | 'price'> {
  image: typeDefs.ShopImage
  size?: string
  fixed?: boolean
  related?: boolean
}

const ShopItem: React.FC<Props> = (props) => {
  const size = props.size ?? '300px'

  const output = (
    <div className={classes.ShopItem} style={{ minHeight: size }}>
      <ShopImage
        imageUrl={props.image.imageUrl}
        imageSetUrl={props.image.imageSetUrl}
        size={size}
        alt={props.image.alt}
        fixed={props.fixed}
      />
      <div className={classes.DetailsContainer}>
        <div className={classes.Title}>{props.name}</div>
        <div className={classes.Price}>{props.price}</div>
      </div>
    </div>
  )
  return !props.related ? (
    <Link href="/shop/[pid]" as={`/shop/${props.pid}`}>
      {output}
    </Link>
  ) : (
    <a className={classes.ShopItemLink} href={`/shop/${props.pid}`}>
      {output}
    </a>
  )
}

export default React.memo(ShopItem)
