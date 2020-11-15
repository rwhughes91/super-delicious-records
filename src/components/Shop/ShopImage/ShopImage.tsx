import React, { useCallback } from 'react'

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
  const addDefaultSrc = useCallback((event) => {
    event.target.src = '/images/sdr-logo-primary.png'
  }, [])

  return (
    <img
      src={props.imageUrl}
      srcSet={props.imageSetUrl}
      sizes={props.fixed ? props.size : `(max-width: ${props.size}) 100vw, ${props.size}`}
      alt={props.alt}
      onError={addDefaultSrc}
      draggable="false"
      style={{
        ...props.styles,
        width: props.fixed ? props.size : '100%',
        maxWidth: props.size,
        height: '100%',
      }}
    />
  )
}

export default React.memo(ShopImage)
