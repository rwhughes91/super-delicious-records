import classes from './PrimaryHeader.module.scss'

interface Props {
  styles?: React.CSSProperties
}

const PrimaryHeader: React.FC<Props> = (props) => (
  <h1 style={props.styles} className={classes.PrimaryHeader}>
    {props.children}
  </h1>
)

export default PrimaryHeader
