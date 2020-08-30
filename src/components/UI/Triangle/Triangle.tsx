import React from 'react'
import classes from './Triangle.module.scss'

interface Props {
  direction: 'left' | 'right' | 'down'
  size: 'small' | 'medium' | 'large'
  styles?: React.CSSProperties
}

const Triangle: React.FC<Props> = (props) => {
  const classNames = []
  if (props.direction === 'left') {
    classNames.push(classes.ArrowLeft)
  } else if (props.direction === 'down') {
    classNames.push(classes.ArrowDown)
  } else {
    classNames.push(classes.ArrowRight)
  }
  switch (props.size) {
    case 'small':
      classNames.push(classes.Small)
      break
    case 'medium':
      classNames.push(classes.Medium)
      break
    case 'large':
      classNames.push(classes.Large)
      break
    default:
      break
  }
  return <div style={props.styles} className={classNames.join(' ')}></div>
}

export default React.memo(Triangle)
