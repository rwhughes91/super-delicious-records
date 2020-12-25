import React from 'react'
import classes from './CarouselButton.module.scss'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { MdKeyboardArrowLeft } from 'react-icons/md'

interface Props {
  dir: 'left' | 'right'
  onClick: () => void
}

const CarouselButton: React.FC<Props> = (props) => {
  return (
    <button className={classes.CarouselButton} onClick={props.onClick}>
      {props.dir === 'right' ? (
        <MdKeyboardArrowRight size={24} />
      ) : (
        <MdKeyboardArrowLeft size={24} />
      )}
    </button>
  )
}

export default React.memo(CarouselButton)
