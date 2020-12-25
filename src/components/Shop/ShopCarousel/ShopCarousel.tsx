import React, { useState, useRef, useCallback, useEffect } from 'react'
import classes from './ShopCarousel.module.scss'
import Carousel from './Carousel'
import CarouselPreview from './CarouselPreview'
import CarouselButton from '../CarouselButton/CarouselButton'
import throttle from 'lodash.throttle'

import * as typeDefs from '@generated/graphql'

interface Props {
  images: typeDefs.ShopImage[]
  size: number
}

const ShopCarousel: React.FC<Props> = (props) => {
  const carouselRef = useRef<HTMLDivElement | null>(null)
  const images = [props.images[props.images.length - 1], ...props.images, props.images[0]]

  const divWidth = carouselRef.current?.clientWidth
  let imageWidth = props.size
  if (divWidth) {
    imageWidth = divWidth / images.length
  }

  const [transform, setTransform] = useState(`${imageWidth}px`)
  const [activeButton, setActiveButton] = useState(1)
  const [transition, setTransition] = useState('')

  const onClickHandler = useCallback(
    (i: number, cssTransition: boolean) => {
      const divWidth = carouselRef.current?.clientWidth
      let imageWidth = props.size * i
      if (divWidth) {
        imageWidth = (divWidth / images.length) * i
      }
      setTransform(`${imageWidth}px`)
      setActiveButton(i)
      if (cssTransition !== undefined) {
        if (transition && !cssTransition) {
          setTransition('')
        }
        if (!transition && cssTransition) {
          setTransition('transform .5s linear')
        }
      }
    },
    [images.length, props.size, transition]
  )

  const onChangeHandler = useCallback(
    (
      dir: 'prev' | 'next',
      activeButton: number,
      onClickHandler: (x: number, y?: boolean) => void
    ) => {
      const nextButton = activeButton + (dir === 'prev' ? -1 : 1)
      onClickHandler(nextButton, true)
    },
    []
  )

  // eslint-disable-next-line
  const moveSlide = useCallback(
    throttle(
      (dir, activeButton, onClickHandler) => onChangeHandler(dir, activeButton, onClickHandler),
      500,
      { leading: true, trailing: false }
    ),
    []
  )

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (activeButton === 0) {
      timer = setTimeout(() => {
        onClickHandler(images.length - 2, false)
      }, 500)
    } else if (activeButton === images.length - 1) {
      timer = setTimeout(() => {
        onClickHandler(1, false)
      }, 500)
    }
    return () => clearTimeout(timer)
  }, [activeButton, images.length, onClickHandler])

  const carouselMaxWidth = images.length * props.size
  const width = images.length * 100

  return (
    <div className={classes.ShopCarousel}>
      <div
        style={{ width: '100vw', maxWidth: props.size, height: '100vw', maxHeight: props.size }}
        className={classes.ImageContainer}
      >
        <Carousel
          customRef={carouselRef}
          carouselMaxWidth={carouselMaxWidth}
          width={width}
          transform={transform}
          size={props.size}
          images={images}
          transition={transition}
        />
      </div>
      <CarouselPreview
        images={props.images}
        activeButton={activeButton}
        onClickHandler={onClickHandler}
      />
      <div className={classes.Prev}>
        <CarouselButton
          dir="left"
          onClick={() => moveSlide('prev', activeButton, onClickHandler)}
        />
      </div>
      <div className={classes.Next}>
        <CarouselButton
          dir="right"
          onClick={() => moveSlide('next', activeButton, onClickHandler)}
        />
      </div>
    </div>
  )
}

export default React.memo(ShopCarousel)
