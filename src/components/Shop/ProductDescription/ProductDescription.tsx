import classes from './ProductDescription.module.scss'
import ToggleListItem from '../../TogglieListItem/ToggleListItem'
import Text from '@components/UI/Text/Text'

interface Props {
  description: string
  moreInfo: string
  onClickModalHandler: () => void
}

const ProductDescription: React.FC<Props> = (props) => {
  return (
    <ToggleListItem title="Product Information">
      <div className={classes.ProductDescriptionSection}>
        <div className={classes.ProductDescriptionTitle}>Overview</div>
        <p className={classes.ProductDescriptionText}>
          <Text>
            {props.description}
            <button className={classes.SizeChart} onClick={props.onClickModalHandler}>
              Size Chart
            </button>
          </Text>
        </p>
      </div>
      <div className={classes.ProductDescriptionSection}>
        <div className={classes.ProductDescriptionTitle}>More Information</div>
        <p className={classes.ProductDescriptionText}>
          <Text>{props.moreInfo}</Text>
        </p>
      </div>
    </ToggleListItem>
  )
}

export default ProductDescription
