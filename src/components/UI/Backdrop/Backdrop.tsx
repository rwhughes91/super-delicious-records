import classes from './Backdrop.module.scss'

interface Props {
  show: boolean
  left: string
  top: string
}

const Backdrop: React.FC<Props> = (props) => {
  return (
    <div>
      {props.show ? (
        <div style={{ left: props.left, top: props.top }} className={classes.Backdrop}></div>
      ) : null}
    </div>
  )
}

export default Backdrop
