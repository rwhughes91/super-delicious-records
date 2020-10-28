import React, { useCallback } from 'react'
import ProgressiveImage from 'react-progressive-image'

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
    <ProgressiveImage
      src={props.imageUrl}
      srcSetData={{
        srcSet: props.imageSetUrl,
        sizes: props.fixed ? props.size : `(max-width: ${props.size}) 100vw, ${props.size}`,
      }}
      placeholder={props.imageSetUrl.split(' ')[0]}
    >
      {(src: string, loading: boolean, srcSetData: { srcSet: string; sizes: string }) => (
        <div
          style={{
            width: props.fixed ? props.size : '100%',
            maxWidth: props.size,
            height: loading ? props.size : '100%',
          }}
        >
          <img
            src={src}
            srcSet={srcSetData.srcSet}
            alt={props.alt}
            style={{
              ...props.styles,
              width: props.fixed ? props.size : '100%',
              maxWidth: props.size,
              height: '100%',
            }}
            sizes={srcSetData.sizes}
            onError={addDefaultSrc}
            draggable="false"
          />
          <noscript>
            <img
              src={src}
              srcSet={srcSetData.srcSet}
              alt={props.alt}
              style={{
                ...props.styles,
                width: props.fixed ? props.size : '100%',
                maxWidth: props.size,
                height: '100%',
              }}
              sizes={srcSetData.sizes}
              onError={addDefaultSrc}
              draggable="false"
            />
          </noscript>
        </div>
      )}
    </ProgressiveImage>
  )
}

export default React.memo(ShopImage)
