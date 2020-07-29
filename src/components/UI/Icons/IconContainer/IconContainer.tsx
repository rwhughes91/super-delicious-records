import classes from './IconContainer.module.scss'

interface Props {
  children: (x: string) => JSX.Element
}

const IconContainer: React.FC<Props> = (props) => {
  return <div className={classes.IconContainer}>{props.children(classes.Icon)}</div>
}

export default IconContainer
