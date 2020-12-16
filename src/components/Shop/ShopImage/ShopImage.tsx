import React, { useCallback } from 'react'
import classes from './ShopImage.module.scss'
import ProgressiveImage from 'react-progressive-image'

export interface Props {
  size: string
  imageUrl: string
  imageSetUrl: string
  base64?: string
  alt: string
  fixed?: boolean
  styles?: React.CSSProperties
  height?: string
}

const ShopImage: React.FC<Props> = (props) => {
  const fallbackImageUrl = '/images/sdr-logo-primary.png'
  const addDefaultSrc = useCallback((event) => {
    event.target.src = fallbackImageUrl
  }, [])

  const placeholder = (
    <img
      src={props.base64 ? `data:image/png;base64, ${props.base64}` : fallbackImageUrl}
      sizes={props.fixed ? props.size : `(max-width: ${props.size}) 100vw, ${props.size}`}
      alt={props.alt}
      draggable={false}
      style={{
        ...props.styles,
        width: props.fixed ? props.size : '100%',
        maxWidth: props.size,
        height: '100%',
      }}
      onError={addDefaultSrc}
      className={classes.blur}
    />
  )

  return (
    <ProgressiveImage
      src={props.imageUrl ? props.imageUrl : fallbackImageUrl}
      srcSetData={{
        srcSet: props.imageSetUrl,
        sizes: props.fixed ? props.size : `(max-width: ${props.size}) 100vw, ${props.size}`,
      }}
      placeholder=""
    >
      {(src: string, loading: boolean, srcSetData: { srcSet: string; sizes: string }) => {
        return loading ? (
          placeholder
        ) : (
          <img
            src={src}
            srcSet={srcSetData.srcSet}
            sizes={srcSetData.sizes}
            alt={props.alt}
            draggable={false}
            style={{
              ...props.styles,
              width: props.fixed ? props.size : '100%',
              maxWidth: props.size,
              height: '100%',
            }}
            onError={addDefaultSrc}
            className={classes.main}
          />
        )
      }}
    </ProgressiveImage>
  )
}

export default React.memo(ShopImage)
