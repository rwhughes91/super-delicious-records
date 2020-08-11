import classes from './SecondaryHeader.module.scss'

interface Props {
  styles?: React.CSSProperties
}

const SecondaryHeader: React.FC<Props> = (props) => (
  <h2 style={props.styles} className={classes.SecondaryHeader}>
    {props.children}
  </h2>
)

export default SecondaryHeader
