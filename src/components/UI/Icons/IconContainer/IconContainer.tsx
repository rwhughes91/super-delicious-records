import classes from './IconContainer.module.scss'

interface Props {
  children: (x: string) => JSX.Element
  size?: number
}

const IconContainer: React.FC<Props> = (props) => {
  let styles
  if (props.size) {
    styles = { height: `${props.size}rem`, width: `${props.size}rem` }
  }
  return (
    <div style={styles} className={classes.IconContainer}>
      {props.children(classes.Icon)}
    </div>
  )
}

export default IconContainer
