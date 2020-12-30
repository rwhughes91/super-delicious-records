import React from 'react'
import classes from './Card.module.scss'
import Button from '../UI/Buttons/Button/Button'
import ShopImage from '@components/Shop/ShopImage/ShopImage'

interface Props {
  title: string
  imageUrl: string
  imageSetUrl: string
  base64?: string
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
      <div className={classes.CardImage}>
        <div
          style={{
            width: '100%',
            height: '400px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <ShopImage
            size="400px"
            imageUrl={props.imageUrl}
            imageSetUrl={props.imageSetUrl}
            base64={props.base64}
            alt={props.title}
            styles={{ height: 'auto' }}
          />
        </div>
      </div>
      <div className={[classes.Date].join(' ')}>
        {props.date.length > 4 ? new Date(props.date).toLocaleDateString() : props.date}
      </div>
      <div className={[classes.Container, classes.noFlicker].join(' ')}>
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
