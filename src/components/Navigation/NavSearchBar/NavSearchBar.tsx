import { useState } from 'react'
import classes from './NavSearchBar.module.scss'
import SearchIcon from '../../UI/Icons/SearchIcon/SearchIcon'
import Input from '../../UI/Input/Input'

const NavSearchBar: React.FC = () => {
  const [showInput, setShowInput] = useState(false)

  const onClickHandler = () => {
    setShowInput((prevState) => !prevState)
  }

  return (
    <div className={classes.NavSearchBar}>
      <span
        onClick={onClickHandler}
        onKeyPress={onClickHandler}
        role="button"
        tabIndex={0}
        className={classes.Button}
      >
        <SearchIcon />
      </span>
      {showInput && (
        <div className={classes.InputContainer}>
          <Input defaultValue="search for a band" />
        </div>
      )}
    </div>
  )
}

export default NavSearchBar
