import React, { useState, useCallback } from 'react'
import classes from './MainNav.module.scss'
import NavItems from '../NavItems/NavItems'
import SideNav from '../SideNav/SideNav'
import NavSearchModal from '@components/NavSearchModal/NavSearchModal'

const Navigation: React.FC = () => {
  const [showModal, setShowModal] = useState(false)

  const toggleShowModal = useCallback(() => {
    setShowModal((prevState) => !prevState)
  }, [])

  return (
    <>
      <div className={classes.MainNav}>
        <div className={classes.SecondaryNavBarContainer}>
          <div className={classes.SecondaryNavBar}>
            <NavItems color="purple" icons="only" toggleModal={toggleShowModal} />
          </div>
        </div>
        <div className={classes.MainNavBarContainer}>
          <div className={classes.MainNavBar}>
            <NavItems color="white" icons={false} toggleModal={toggleShowModal} />
          </div>
        </div>
      </div>
      <SideNav />
      {showModal && <NavSearchModal show={showModal} onClick={toggleShowModal} />}
    </>
  )
}

export default React.memo(Navigation)
