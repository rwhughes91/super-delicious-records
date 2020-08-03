import classes from './Card.module.scss'
import Button from '../UI/Button/Button'
import TertiaryHeader from '../UI/Headers/TertiaryHeader/TertiaryHeader'

interface Props {
  title: string
  imageUrl: string
}

const Card: React.FC<Props> = (props) => {
  return (
    <div className={classes.Card}>
      <div className={classes.CardTitle}>
        <TertiaryHeader>{props.title}</TertiaryHeader>
      </div>
      <div className={classes.CardImage} style={{ backgroundImage: `url(${props.imageUrl})` }} />
      <Button size="medium" color="purple">
        Read More
      </Button>
    </div>
  )
}

export default Card
