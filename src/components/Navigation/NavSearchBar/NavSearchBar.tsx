import React from 'react'
import classes from './NavSearchBar.module.scss'
import SearchIcon from '../../UI/Icons/SearchIcon/SearchIcon'
import NavSearchInput from '../../UI/Inputs/NavSearchInput/NavSearchInput'

interface Props {
  slide?: true
  toggleModal?: () => void
}

const NavSearchBar: React.FC<Props> = (props) => {
  return (
    <button className={[classes.NavSearchBar].join(' ')} onClick={props.toggleModal}>
      <SearchIcon size={2.2} styles={{ marginRight: '10px' }} />
      <div className={classes.InputContainer}>
        <NavSearchInput />
      </div>
    </button>
  )
}

export default React.memo(NavSearchBar)
