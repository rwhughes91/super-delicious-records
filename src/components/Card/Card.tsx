import classes from './Card.module.scss'
import Button from '../UI/Button/Button'
import TertiaryHeader from '../UI/Headers/TertiaryHeader/TertiaryHeader'

interface Props {
  title: string
  imageUrl: string
  href?: string
  as?: string
  icons?: JSX.Element[]
  date?: string | number
}

const Card: React.FC<Props> = (props) => {
  return (
    <div className={classes.Card}>
      <div className={classes.CardTitle}>
        <TertiaryHeader>{props.title}</TertiaryHeader>
        <span className={classes.Date}>{props.date}</span>
      </div>
      <div
        className={classes.CardImage}
        style={{
          backgroundImage: `url(${props.imageUrl})`,
        }}
      />
      {props.icons ? (
        <div className={classes.Icons}>{props.icons}</div>
      ) : (
        <Button size="large" color="purple" href={props.href} as={props.as}>
          Read More
        </Button>
      )}
    </div>
  )
}

export default Card
