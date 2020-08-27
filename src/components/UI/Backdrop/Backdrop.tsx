import classes from './Backdrop.module.scss'

export interface Props {
  show: boolean
  left: string
  top: string
  onClick: () => void
  styles?: React.CSSProperties
  classNames?: string
}

const Backdrop: React.FC<Props> = (props) => {
  const classNames = [classes.Backdrop]
  if (props.classNames) {
    classNames.push(props.classNames)
  }
  return props.show ? (
    <div
      style={{ ...props.styles, left: props.left, top: props.top }}
      className={classNames.join(' ')}
      role="button"
      tabIndex={0}
      onClick={props.onClick}
      onKeyPress={props.onClick}
    />
  ) : null
}

export default Backdrop
