import React from 'react'
import classes from './Card.module.scss'
import Button from '../UI/Buttons/Button/Button'

interface Props {
  title: string
  imageUrl: string
  href?: string
  as?: string
  icons?: JSX.Element[]
  date: string
  large?: boolean
  styles?: React.CSSProperties
}

const Card: React.FC<Props> = (props) => {
  return (
    <div className={classes.Card} style={props.styles}>
      <div
        className={classes.CardImage}
        style={{
          backgroundImage: `url(${props.imageUrl})`,
          backgroundSize: 'cover',
        }}
      />
      <div className={classes.Date}>
        {props.date.length > 4 ? new Date(props.date).toLocaleDateString() : props.date}
      </div>
      <div className={classes.Container}>
        <div className={classes.CardTitle}>
          <span>{props.title}</span>
        </div>

        {props.icons ? (
          <div className={classes.Icons}>{props.icons}</div>
        ) : (
          <Button size="large" color="purple" href={props.href} as={props.as}>
            Read More
          </Button>
        )}
      </div>
    </div>
  )
}

export default React.memo(Card)
