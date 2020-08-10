import { useState, useRef } from 'react'
import classes from './ShopCarousel.module.scss'
import ShopImage from '../ShopImage/ShopImage'

interface Props {
  images: Array<{ imageUrl: string; imageSetUrl: string; alt: string }>
  size: number
}

const ShopCarousel: React.FC<Props> = (props) => {
  const [transform, setTransform] = useState('')
  const [activeButton, setActiveButton] = useState(0)
  const carouselRef = useRef<HTMLDivElement | null>(null)

  const onClickHandler = (i: number) => {
    const divWidth = carouselRef.current?.clientWidth
    let imageWidth = props.size * i
    if (divWidth) {
      imageWidth = (divWidth / props.images.length) * i
    }
    setTransform(`${imageWidth}px`)
    setActiveButton(i)
  }

  const carouselMaxWidth = props.images.length * props.size
  const width = props.images.length * 100

  return (
    <div className={classes.ShopCarousel}>
      <div
        style={{ width: '100vw', maxWidth: props.size, height: '100vw', maxHeight: props.size }}
        className={classes.ImageContainer}
      >
        <div
          ref={carouselRef}
          className={classes.Carousel}
          style={{
            maxWidth: carouselMaxWidth,
            width: `${width}vw`,
            transform: `translateX(-${transform})`,
          }}
        >
          {props.images.map((image, i) => {
            return <ShopImage key={i} {...image} size={`${props.size}px`} />
          })}
        </div>
      </div>
      <div className={classes.ImagePreview} style={{ width: '80vw', maxWidth: `${props.size}px` }}>
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
              <ShopImage {...image} size="3rem" />
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default ShopCarousel
