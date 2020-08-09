import { useState } from 'react'
import classes from './ShopCarousel.module.scss'
import ShopImage from '../ShopImage/ShopImage'

interface Props {
  images: Array<{ imageUrl: string; imageSetUrl: string; alt: string }>
  size: number
}

const ShopCarousel: React.FC<Props> = (props) => {
  const [transform, setTransform] = useState(0)
  const [activeButton, setActiveButton] = useState(0)

  const onClickHandler = (i: number) => {
    setTransform(i * props.size)
    setActiveButton(i)
  }

  const previewSize = props.size / props.images.length
  const carouselWidth = props.images.length * props.size
  return (
    <div className={classes.ShopCarousel}>
      <div style={{ width: props.size, height: props.size }} className={classes.ImageContainer}>
        <div
          className={classes.Carousel}
          style={{ width: carouselWidth, transform: `translateX(-${transform}px)` }}
        >
          {props.images.map((image, i) => {
            return <ShopImage key={i} {...image} size={`${props.size}px`} />
          })}
        </div>
      </div>
      <div className={classes.ImagePreview}>
        {props.images.map((image, i) => {
          return (
            <button
              key={i}
              className={[classes.Button, i === activeButton ? classes.Active : ''].join(' ')}
              style={{
                cursor: 'pointer',
              }}
              onClick={() => onClickHandler(i)}
            >
              <ShopImage {...image} size={`${previewSize}px`} />
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default ShopCarousel
