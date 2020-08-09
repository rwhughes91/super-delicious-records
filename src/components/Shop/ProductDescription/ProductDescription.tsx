import { useState } from 'react'
import classes from './ProductDescription.module.scss'

interface Props {
  description: string
  moreInfo: string
  onClickModalHandler: () => void
}

const ProductDescription: React.FC<Props> = (props) => {
  const [showProductDescription, setShowProductDescription] = useState(false)
  const onClickHandler = () => {
    setShowProductDescription((prevState) => !prevState)
  }
  return (
    <div
      style={{
        maxHeight: showProductDescription ? '500px' : '7rem',
      }}
      className={classes.ProductInformation}
    >
      <button className={classes.ProductInformationTitle} onClick={onClickHandler}>
        <div>Product Information</div>
        <div
          style={{
            transition: 'transform .2s',
            fontSize: '2.2rem',
            color: showProductDescription ? 'var(--bright-red-color)' : 'var(--dark-purple-color)',
            transform: showProductDescription ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          &#43;
        </div>
      </button>
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
    </div>
  )
}

export default ProductDescription
