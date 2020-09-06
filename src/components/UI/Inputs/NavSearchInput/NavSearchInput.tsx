import React from 'react'
import classes from './NavSearchInput.module.scss'

interface Props {
  toggleModal?: () => void
}

const NavSearchInput: React.FC<Props> = (props) => {
  return (
    <div className={classes.NavContainer}>
      <button className={classes.NavSearchInput} onClick={props.toggleModal}>
        search for a band
      </button>
    </div>
  )
}

export default React.memo(NavSearchInput)
