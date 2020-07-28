import classes from './Button.module.scss'
import Link from 'next/link'
import Triangle from '../Triangle/Triangle'

interface Props {
  color: 'purple' | 'white'
  href?: string
}

const Button: React.FC<Props> = (props) => {
  const classNames = [classes.Button]
  if (props.color === 'purple') {
    classNames.push(classes.Purple)
  } else {
    classNames.push(classes.White)
  }
  let childButton = <button className={classNames.join(' ')}>{props.children}</button>
  if (props.href) {
    childButton = (
      <Link href={props.href}>
        <button className={classNames.join(' ')}>{props.children}</button>
      </Link>
    )
  }
  return (
    <div className={classes.ButtonGroup}>
      <Triangle direction="LEFT" />
      {childButton}
      <Triangle direction="RIGHT" />
    </div>
  )
}

export default Button
