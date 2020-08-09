export interface Props {
  size: string
  imageUrl: string
  imageSetUrl: string
  alt: string
}

const ShopImage: React.FC<Props> = (props) => {
  return (
    <img
      src={props.imageUrl}
      srcSet={props.imageSetUrl}
      alt={props.alt}
      sizes={`(max-width: ${props.size}) 100vw, ${props.size}`}
    />
  )
}

export default ShopImage
