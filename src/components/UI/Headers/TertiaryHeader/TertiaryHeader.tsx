import classes from './TertiaryHeader.module.scss'

const TertiaryHeader: React.FC = (props) => (
  <h3 className={classes.TertiaryHeader}>{props.children}</h3>
)

export default TertiaryHeader
