import React, { useEffect, useCallback, useRef } from 'react'
import classes from './ShopCarousel.module.scss'
import ShopImage from '../ShopImage/ShopImage'
import * as typeDefs from '@generated/graphql'
import { length } from 'class-validator'

interface Props {
  customRef: React.MutableRefObject<HTMLDivElement | null>
  carouselMaxWidth: string | number
  width: string | number
  transform: string | number
  size: number
  images: typeDefs.ShopImage[]
  transition?: string
}

const Carousel: React.FC<Props> = (props) => {
  const coords = useRef({ posX1: 0, posX2: 0 })

  const dragEnd = useCallback((event: MouseEvent) => {
    event.preventDefault()
    document.onmouseup = null
    document.onmousemove = null
  }, [])

  const dragAction = useCallback(
    (event: MouseEvent) => {
      event.preventDefault()
      coords.current.posX2 = coords.current.posX1 - event.clientX
      coords.current.posX1 = event.clientX
      if (props.customRef.current) {
        const transform = props.customRef.current.style.transform.match(/(-?\d+)/)
        const base = transform ? parseFloat(transform[0]) : 0
        const newTransformValue = `translateX(${base - coords.current.posX2}px)`
        props.customRef.current.style.transform = newTransformValue
      }
    },
    [props.customRef]
  )

  const dragStart = useCallback(
    (event: MouseEvent) => {
      event.preventDefault()
      coords.current.posX1 = event.clientX
      document.onmouseup = dragEnd
      document.onmousemove = dragAction
    },
    [dragEnd, dragAction]
  )

  useEffect(() => {
    if (props.customRef.current) {
      props.customRef.current.onmousedown = dragStart
    }
  }, [props.customRef, dragStart])

  return (
    <div
      ref={props.customRef}
      className={classes.Carousel}
      style={{
        maxWidth: props.carouselMaxWidth,
        width: `${props.width}vw`,
        transform: `translateX(-${props.transform})`,
        transition: props.transition,
      }}
      role="listbox"
      tabIndex={0}
    >
      {props.images.map((image, i) => {
        return <ShopImage key={i} {...image} size={`${props.size}px`} />
      })}
    </div>
  )
}

export default React.memo(Carousel)
