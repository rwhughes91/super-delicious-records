import React, { useCallback } from 'react'

export interface Props {
  size: string
  imageUrl: string
  imageSetUrl: string
  alt: string
  fixed?: boolean
  styles?: React.CSSProperties
}

const ShopImage: React.FC<Props> = (props) => {
  const addDefaultSrc = useCallback((event) => {
    event.target.src = '/images/sdr-logo-primary.png'
  }, [])
  return (
    <img
      src={props.imageUrl}
      srcSet={props.imageSetUrl}
      alt={props.alt}
      style={props.styles}
      sizes={props.fixed ? props.size : `(max-width: ${props.size}) 100vw, ${props.size}`}
      onError={addDefaultSrc}
    />
  )
}

export default React.memo(ShopImage)
