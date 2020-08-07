import { useState } from 'react'
import classes from './SideNav.module.scss'
import NavItems from '../NavItems/NavItems'
import NavButton from '../NavButton/NavButton'
import { CSSTransition } from 'react-transition-group'
import Backdrop from '../../UI/Backdrop/Backdrop'

interface Props {
  home?: boolean
}

const SideNav: React.FC<Props> = (props) => {
  const [showModal, setShowModal] = useState(false)

  const onClickHandler = () => {
    setShowModal((prevState) => !prevState)
  }

  const classNames = {
    enter: classes.Enter,
    enterActive: classes.EnterActive,
    exit: classes.Exit,
    exitActive: classes.ExitActive,
  }

  return (
    <>
      <div className={classes.SideNav}>
        <div className={classes.SideNavBar}>
          <NavButton checked={showModal} onClick={onClickHandler} />
          {props.home || (
            <div className={classes.SecondaryNavBar}>
              <NavItems color="purple" icons="cart" />
            </div>
          )}
        </div>
        <CSSTransition
          in={showModal}
          timeout={250}
          classNames={classNames}
          mountOnEnter
          unmountOnExit
        >
          <div className={classes.SideNavModal}>
            <NavItems home color="purple" icons={false} ripple />
          </div>
        </CSSTransition>
      </div>
      <Backdrop
        show={showModal}
        onClick={onClickHandler}
        top="46rem"
        left="0"
        styles={{ zIndex: 900 }}
      />
    </>
  )
}

export default SideNav
