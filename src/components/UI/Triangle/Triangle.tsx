import classes from './Triangle.module.scss'

interface Props {
  direction: 'LEFT' | 'RIGHT'
}

const Triangle: React.FC<Props> = ({ direction }) => {
  let className = classes.ArrowRight
  if (direction === 'LEFT') {
    className = classes.ArrowLeft
  }
  return <div className={className}></div>
}

export default Triangle
