export interface Props {
  size: string
  imageUrl: string
  imageSetUrl: string
  alt: string
  fixed?: boolean
}

const ShopImage: React.FC<Props> = (props) => {
  return (
    <img
      src={props.imageUrl}
      srcSet={props.imageSetUrl}
      alt={props.alt}
      sizes={props.fixed ? props.size : `(max-width: ${props.size}) 100vw, ${props.size}`}
    />
  )
}

export default ShopImage
