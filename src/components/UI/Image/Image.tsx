import classes from './Image.module.scss'
import * as typeDefs from '@generated/graphql'

interface Props {
  src: string
  alt: string
  height?: string
  width?: string
  label?: string | JSX.Element[]
  labelStyles?: React.CSSProperties
  labelSide?: 'left' | 'right' | typeDefs.LabelSide | null
  styles?: React.CSSProperties
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
      <img src={props.src} alt={props.alt} className={classes.Image} />
    </div>
  )
}

export default Image
