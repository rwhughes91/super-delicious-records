import classes from './Backdrop.module.scss'

export interface Props {
  show: boolean
  left: string
  top: string
  onClick: () => void
  styles?: React.CSSProperties
}

const Backdrop: React.FC<Props> = (props) => {
  return props.show ? (
    <div
      style={{ ...props.styles, left: props.left, top: props.top }}
      className={classes.Backdrop}
      role="button"
      tabIndex={0}
      onClick={props.onClick}
      onKeyPress={props.onClick}
    />
  ) : null
}

export default Backdrop
