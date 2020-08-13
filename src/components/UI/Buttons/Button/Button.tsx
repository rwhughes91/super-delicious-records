import classes from './Button.module.scss'
import Link from 'next/link'
import Triangle from '../../Triangle/Triangle'

interface Props {
  color: 'purple' | 'white'
  size: 'small' | 'medium' | 'large'
  href?: string
  as?: string
  onClick?: (e?: React.SyntheticEvent) => void
  styles?: React.CSSProperties
}

const Button: React.FC<Props> = (props) => {
  const classNames = [classes.Button]
  if (props.color === 'purple') {
    classNames.push(classes.Purple)
  } else {
    classNames.push(classes.White)
  }
  let size: 'small' | 'medium' | 'large' = 'large'
  switch (props.size) {
    case 'small':
      classNames.push(classes.Small)
      size = 'small'
      break
    case 'medium':
      classNames.push(classes.Medium)
      size = 'medium'
      break
    case 'large':
      classNames.push(classes.Large)
      size = 'large'
      break
    default:
      break
  }
  let childButton = <button className={classNames.join(' ')}>{props.children}</button>
  if (props.href) {
    childButton = (
      <Link href={props.href} as={props.as}>
        <button className={classNames.join(' ')}>{props.children}</button>
      </Link>
    )
  }
  return (
    <div className={classes.ButtonGroup} style={props.styles}>
      <Triangle direction="left" size={size} />
      {childButton}
      <Triangle direction="right" size={size} />
    </div>
  )
}

export default Button
