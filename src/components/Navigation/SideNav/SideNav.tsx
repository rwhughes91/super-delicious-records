import { useState } from 'react'
import classes from './SideNav.module.scss'
import NavItems from '../NavItems/NavItems'
import NavButton from '../NavButton/NavButton'
import Backdrop from '../../UI/Backdrop/Backdrop'

const SideNav: React.FC = () => {
  const [showModal, setShowModal] = useState(false)

  const onClickHandler = () => {
    setShowModal((prevState) => !prevState)
  }

  return (
    <>
      {/* <Backdrop show={showModal} top="46.5rem" left="0" /> */}
      <div className={classes.SideNav}>
        <div className={classes.SideNavBar}>
          <NavButton onClick={onClickHandler} />
          <div className={classes.SecondaryNavBar}>
            <NavItems color="purple" icons="cart" />
          </div>
        </div>
        {showModal && (
          <div className={classes.SideNavModal}>
            <NavItems color="purple" icons={false} />
          </div>
        )}
      </div>
    </>
  )
}

export default SideNav
