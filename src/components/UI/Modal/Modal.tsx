import classes from './Modal.module.scss'
import Backdrop, { Props as BackdropProps } from '../Backdrop/Backdrop'

export interface Props extends BackdropProps {
  children: JSX.Element
}

const Modal: React.FC<Props> = (props) => {
  return (
    <>
      <Backdrop {...props} />
      <div className={classes.Modal}>{props.children}</div>
    </>
  )
}

export default Modal
