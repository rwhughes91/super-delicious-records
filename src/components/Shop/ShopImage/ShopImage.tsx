import React, { useCallback } from 'react'
import ProgressiveImage from 'react-progressive-image'

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
    <ProgressiveImage
      src={props.imageUrl}
      srcSetData={{
        srcSet: props.imageSetUrl,
        sizes: props.fixed ? props.size : `(max-width: ${props.size}) 100vw, ${props.size}`,
      }}
      placeholder={props.imageSetUrl.split(', ')[0].split(' ')[0]}
    >
      {(src: string, _: boolean, srcSetData: { srcSet: string; sizes: string }) => {
        return (
          <img
            src={src}
            srcSet={srcSetData.srcSet}
            sizes={srcSetData.sizes}
            alt={props.alt}
            onError={addDefaultSrc}
            draggable="false"
            style={{
              ...props.styles,
              width: props.fixed ? props.size : '100%',
              maxWidth: props.size,
            }}
          />
        )
      }}
    </ProgressiveImage>
  )
}

export default React.memo(ShopImage)
