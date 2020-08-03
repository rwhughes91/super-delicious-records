import classes from './TertiaryHeader.module.scss'

interface Props {
  color?: string
  styles?: React.CSSProperties
}

const TertiaryHeader: React.FC<Props> = (props) => (
  <h3 className={classes.TertiaryHeader} style={props.styles}>
    {props.children}
  </h3>
)

export default TertiaryHeader
