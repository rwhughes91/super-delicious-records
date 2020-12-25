import React from 'react'
import classes from './ShopCarousel.module.scss'
import ShopImage from '../ShopImage/ShopImage'
import * as typeDefs from '@generated/graphql'

interface Props {
  images: typeDefs.ShopImage[]
  activeButton: number
  onClickHandler: (...args: any[]) => void
}

const CarouselPreview: React.FC<Props> = (props) => {
  const { onClickHandler } = props

  let activePreviewImage = props.activeButton - 1
  if (props.activeButton === 0) {
    activePreviewImage = props.images.length - 1
  }
  if (props.activeButton === props.images.length + 1) {
    activePreviewImage = 0
  }

  return (
    <div className={classes.ImagePreview} style={{ width: '30rem' }}>
      {props.images.map((image, i) => {
        return (
          <button
            key={i}
            className={[classes.Button, i === activePreviewImage ? classes.Active : ''].join(' ')}
            style={{
              cursor: 'pointer',
              width: '4.5rem',
            }}
            onClick={() => onClickHandler(i + 1, true)}
          >
            <ShopImage {...image} size="4rem" fixed />
          </button>
        )
      })}
    </div>
  )
}

export default React.memo(CarouselPreview)
