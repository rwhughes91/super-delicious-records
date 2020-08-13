import { useState } from 'react'
import classes from './ProductDescription.module.scss'
import ToggleListItem from '../../TogglieListItem/ToggleListItem'

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
          {props.description}
          <button className={classes.SizeChart} onClick={props.onClickModalHandler}>
            Size Chart
          </button>
        </p>
      </div>
      <div className={classes.ProductDescriptionSection}>
        <div className={classes.ProductDescriptionTitle}>More Information</div>
        <p className={classes.ProductDescriptionText}>{props.moreInfo}</p>
      </div>
    </ToggleListItem>
  )
}

export default ProductDescription
