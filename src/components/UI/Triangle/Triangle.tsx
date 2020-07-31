import classes from './Triangle.module.scss'

interface Props {
  direction: 'left' | 'right'
  size: 'small' | 'medium' | 'large'
}

const Triangle: React.FC<Props> = (props) => {
  const classNames = []
  if (props.direction === 'left') {
    classNames.push(classes.ArrowLeft)
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
  return <div className={classNames.join(' ')}></div>
}

export default Triangle
