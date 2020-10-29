import React, { useCallback, useState, useRef, useEffect } from 'react'
import classes from './ShopImage.module.scss'

export interface Props {
  size: string
  imageUrl: string
  imageSetUrl: string
  alt: string
  fixed?: boolean
  styles?: React.CSSProperties
  height?: string
}

const ShopImage: React.FC<Props> = (props) => {
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement | null>(null)

  const addDefaultSrc = useCallback((event) => {
    event.target.src = '/images/sdr-logo-primary.png'
  }, [])

  const onLoadHandler = useCallback(() => {
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      if (!loaded) {
        setLoaded(true)
      }
    }
  }, [loaded])

  return (
    <div
      className={classes.ImageContainer}
      style={{ height: props.height ? props.height : 'auto' }}
    >
      <img
        className={classes.Image}
        onLoad={onLoadHandler}
        onError={addDefaultSrc}
        src={props.imageUrl}
        srcSet={props.imageSetUrl}
        alt={props.alt}
        sizes={props.fixed ? props.size : `(max-width: ${props.size}) 100vw, ${props.size}`}
        draggable="false"
        style={{
          ...props.styles,
          width: props.fixed ? props.size : '100%',
          maxWidth: props.size,
          opacity: loaded ? 1 : 0,
        }}
        ref={imgRef}
      />
      <div
        className={[classes.ImageTrace, classes.Relative].join(' ')}
        style={{ opacity: loaded ? 0 : 1 }}
      />
      <img
        className={[classes.BlurredImage, classes.Relative].join(' ')}
        src={props.imageSetUrl.split(', ')[0].split(' ')[0]}
        alt={`Blurred ${props.alt}`}
        sizes={props.fixed ? props.size : `(max-width: ${props.size}) 100vw, ${props.size}`}
        onError={addDefaultSrc}
        draggable="false"
        style={{
          ...props.styles,
          width: props.fixed ? props.size : '100%',
          maxWidth: props.size,
          height: '100%',
          opacity: loaded ? 0 : 1,
        }}
      />
    </div>
  )
}

export default React.memo(ShopImage)
