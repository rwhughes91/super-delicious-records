import classes from './IconContainer.module.scss'

interface Props {
  children: (x: string) => JSX.Element
  size?: number
  styles?: React.CSSProperties
  onClick?: () => void
}

const IconContainer: React.FC<Props> = (props) => {
  let styles = { ...props.styles }
  if (props.size) {
    styles = { ...props.styles, height: `${props.size * 10}px`, width: `${props.size * 10}px` }
  }
  return (
    <div
      style={styles}
      className={classes.IconContainer}
      onClick={props.onClick}
      role="button"
      onKeyDown={props.onClick}
      tabIndex={0}
    >
      {props.children(classes.Icon)}
    </div>
  )
}

export default IconContainer
