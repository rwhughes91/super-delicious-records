import React, { useEffect, useCallback, useRef } from 'react'
import classes from './ShopCarousel.module.scss'
import ShopImage from '../ShopImage/ShopImage'
import * as typeDefs from '@generated/graphql'

interface Props {
  customRef: React.MutableRefObject<HTMLDivElement | null>
  carouselMaxWidth: string | number
  width: string | number
  transform: string | number
  size: number
  images: typeDefs.ShopImage[]
  transition?: string
  onChange: (dir: 'prev' | 'next', activeButton: number) => void
  activeButton: number
}

const Carousel: React.FC<Props> = (props) => {
  const { onChange, customRef, activeButton } = props
  const coords = useRef({ posX1: 0, posX2: 0, base: 0, currentTransform: 0, size: 0 })

  const dragEnd = useCallback(
    (event: MouseEvent | TouchEvent) => {
      event.preventDefault()
      if (customRef.current) {
        customRef.current.style.transition = 'transform .5s linear'
        const upperLimit = Math.round(
          (coords.current.base + coords.current.size * (activeButton - 1)) / 2
        )
        const lowerLimit = Math.round(
          (coords.current.base + coords.current.size * (activeButton + 1)) / 2
        )

        if (coords.current.currentTransform >= upperLimit) {
          onChange('prev', activeButton)
        } else if (coords.current.currentTransform <= lowerLimit) {
          onChange('next', activeButton)
        } else {
          customRef.current.style.transform = `translateX(${coords.current.base}px)`
        }
      }
      document.onmouseup = null
      document.onmousemove = null
    },
    [customRef, activeButton, onChange]
  )

  const dragAction = useCallback(
    (event: MouseEvent | TouchEvent) => {
      event.preventDefault()
      if (isTouchEvent(event)) {
        coords.current.posX2 = coords.current.posX1 - event.touches[0].clientX
        coords.current.posX1 = event.touches[0].clientX
      } else {
        coords.current.posX2 = coords.current.posX1 - event.clientX
        coords.current.posX1 = event.clientX
      }
      if (props.customRef.current) {
        const transform = props.customRef.current.style.transform.match(/(-?\d+)/)
        const base = transform ? parseFloat(transform[0]) : 0
        const newTransformValue = base - coords.current.posX2
        coords.current.currentTransform = newTransformValue
        props.customRef.current.style.transform = `translateX(${newTransformValue}px)`
        props.customRef.current.style.transition = ''
      }
    },
    [props.customRef]
  )

  const dragStart = useCallback(
    (event: MouseEvent | TouchEvent) => {
      event.preventDefault()
      if (isTouchEvent(event)) {
        coords.current.posX1 = event.touches[0].clientX
      } else {
        coords.current.posX1 = event.clientX
        document.onmouseup = dragEnd
        document.onmousemove = dragAction
      }
      if (props.customRef.current) {
        const transform = props.customRef.current.style.transform.match(/(-?\d+)/)
        const base = transform ? parseFloat(transform[0]) : 0
        coords.current.base = base
        if (!coords.current.size) {
          coords.current.size = base
        }
      }
    },
    [dragEnd, dragAction, props.customRef]
  )

  useEffect(() => {
    if (props.customRef.current) {
      props.customRef.current.onmousedown = dragStart
      props.customRef.current.ontouchstart = dragStart
      props.customRef.current.ontouchmove = dragAction
      props.customRef.current.ontouchend = dragEnd
    }
  }, [props.customRef, dragStart, dragAction, dragEnd])

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

function isTouchEvent(e: MouseEvent | TouchEvent): e is TouchEvent {
  if (e.type === 'touchstart') return true
  if (e.type === 'touchmove') return true
  return false
}
