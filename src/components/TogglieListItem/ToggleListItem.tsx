import { useState } from 'react'
import classes from './ToggleListItem.module.scss'
import AnimateHeight from 'react-animate-height'
import SecondaryHeader from '../UI/Headers/SecondaryHeader/SecondaryHeader'

interface Props {
  title: string
  children: string | JSX.Element | JSX.Element[]
  duration?: number
  secondaryHeader?: string
  styles?: React.CSSProperties
  buttonStyles?: React.CSSProperties
}

const ToggleListItem: React.FC<Props> = (props) => {
  const [showListItem, setShowListItem] = useState(false)

  const onClickHandler = () => {
    setShowListItem((prevState) => !prevState)
  }

  return (
    <div className={classes.ToggleListItem} style={props.styles}>
      <button
        className={classes.ToggleListItemTitle}
        onClick={onClickHandler}
        style={props.buttonStyles}
      >
        <div className={classes.Title}>{props.title}</div>
        <div className={classes.SecondaryHeader}>{props.secondaryHeader}</div>
        <div className={classes.PlusIcon}>
          <div
            style={{
              color: showListItem ? 'var(--bright-red-color)' : 'var(--dark-purple-color)',
              transform: showListItem ? 'rotate(45deg)' : 'rotate(0deg)',
              display: 'inline-block',
              transition: 'transform .3s',
            }}
          >
            &#43;
          </div>
        </div>
      </button>
      <AnimateHeight
        easing="linear"
        duration={props.duration || 250}
        height={showListItem ? 'auto' : 0}
      >
        {props.children}
      </AnimateHeight>
    </div>
  )
}

export default ToggleListItem
