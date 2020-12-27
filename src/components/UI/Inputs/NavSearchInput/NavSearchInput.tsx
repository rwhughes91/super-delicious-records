import React from 'react'
import classes from './NavSearchInput.module.scss'

const NavSearchInput: React.FC<Props> = () => {
  return (
    <div className={classes.NavContainer}>
      <span className={classes.NavSearchInput}>search for a band</span>
    </div>
  )
}

export default React.memo(NavSearchInput)
