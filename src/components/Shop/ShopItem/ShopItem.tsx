import classes from './ShopItem.module.scss'
import Link from 'next/link'
import ShopImage from '../ShopImage/ShopImage'

interface Props {
  pid: string
  name: string
  imageUrl: string
  imageSetUrl: string
  price: number
  size?: string
}

const ShopItem: React.FC<Props> = (props) => {
  const size = props.size ?? '300px'
  return (
    <Link href="/shop/[pid]" as={`/shop/${props.pid}`}>
      <div className={classes.ShopItem}>
        <ShopImage
          imageUrl={props.imageUrl}
          imageSetUrl={props.imageSetUrl}
          size={size}
          alt={props.name}
        />
        <div className={classes.DetailsContainer}>
          <div className={classes.Title}>{props.name}</div>
          <div className={classes.Price}>{props.price}</div>
        </div>
      </div>
    </Link>
  )
}

export default ShopItem
