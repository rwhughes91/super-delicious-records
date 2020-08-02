import classes from './PrimaryHeader.module.scss'

const PrimaryHeader: React.FC = (props) => (
  <h1 className={classes.PrimaryHeader}>{props.children}</h1>
)

export default PrimaryHeader
