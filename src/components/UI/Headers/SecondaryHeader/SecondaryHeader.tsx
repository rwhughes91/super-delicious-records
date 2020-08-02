import classes from './SecondaryHeader.module.scss'

const SecondaryHeader: React.FC = (props) => (
  <h2 className={classes.SecondaryHeader}>{props.children}</h2>
)

export default SecondaryHeader
