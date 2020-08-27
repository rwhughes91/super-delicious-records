import classes from './Modal.module.scss'
import Backdrop, { Props as BackdropProps } from '../Backdrop/Backdrop'

export interface Props extends BackdropProps {
  children: JSX.Element
  modalStyles?: React.CSSProperties
}

const Modal: React.FC<Props> = (props) => {
  return (
    <>
      <Backdrop {...props} />
      <div className={classes.Modal} style={props.modalStyles}>
        {props.children}
      </div>
    </>
  )
}

export default Modal
