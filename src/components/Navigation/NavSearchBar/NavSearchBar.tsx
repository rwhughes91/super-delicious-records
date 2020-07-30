import { useState } from 'react'
import classes from './NavSearchBar.module.scss'
import SearchIcon from '../../UI/Icons/SearchIcon/SearchIcon'
import Input from '../../UI/Input/Input'

interface Props {
  slide?: true
}

const NavSearchBar: React.FC<Props> = (props) => {
  const [showInput, setShowInput] = useState(false)

  const onClickHandler = () => {
    setShowInput((prevState) => !prevState)
  }

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
          <Input defaultValue="search for a band" />
        </div>
      )}
    </div>
  )
}

export default NavSearchBar
