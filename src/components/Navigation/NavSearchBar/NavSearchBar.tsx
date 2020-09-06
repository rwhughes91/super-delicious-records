import { useState, useCallback } from 'react'
import classes from './NavSearchBar.module.scss'
import SearchIcon from '../../UI/Icons/SearchIcon/SearchIcon'
import NavSearchInput from '../../UI/Inputs/NavSearchInput/NavSearchInput'

interface Props {
  slide?: true
  toggleModal?: () => void
}

const NavSearchBar: React.FC<Props> = (props) => {
  const [showInput, setShowInput] = useState(false)

  const onClickHandler = useCallback(() => {
    setShowInput((prevState) => !prevState)
  }, [])

  const classNames = [classes.NavSearchBar]

  if (props.slide && showInput) {
    classNames.push(classes.Slide)
  }

  return (
    <div className={classNames.join(' ')}>
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
          <NavSearchInput toggleModal={props.toggleModal} />
        </div>
      )}
    </div>
  )
}

export default NavSearchBar
