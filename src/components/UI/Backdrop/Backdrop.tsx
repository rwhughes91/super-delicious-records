import classes from './Backdrop.module.scss'

interface Props {
  show: boolean
  left: string
  top: string
  onClick: () => void
}

const Backdrop: React.FC<Props> = (props) => {
  return (
    <div>
      {props.show ? (
        <div
          style={{ left: props.left, top: props.top }}
          className={classes.Backdrop}
          role="button"
          tabIndex={0}
          onClick={props.onClick}
          onKeyPress={props.onClick}
        />
      ) : null}
    </div>
  )
}

export default Backdrop
