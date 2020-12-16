import classes from './Image.module.scss'
import * as typeDefs from '@generated/graphql'
import ShopImage from '@components/Shop/ShopImage/ShopImage'

interface Props {
  src: string
  alt: string
  srcSet: string
  height?: string
  width?: string
  label?: string | JSX.Element[]
  labelStyles?: React.CSSProperties
  labelSide?: 'left' | 'right' | typeDefs.LabelSide | null
  styles?: React.CSSProperties
  base64?: string
}

const Image: React.FC<Props> = (props) => {
  let position = 'flex-start'
  if (props.labelSide === 'right') {
    position = 'flex-end'
  }
  return (
    <div className={classes.ImageContainer} style={{ ...props.styles, width: props.width }}>
      <span style={{ ...props.labelStyles, justifyContent: position }} className={classes.Label}>
        {props.label}
      </span>
      <div className={classes.Image}>
        <ShopImage
          size="100%"
          imageUrl={props.src}
          imageSetUrl={props.srcSet}
          alt={props.alt}
          height="100%"
          base64={props.base64}
        />
      </div>
    </div>
  )
}

export default Image
