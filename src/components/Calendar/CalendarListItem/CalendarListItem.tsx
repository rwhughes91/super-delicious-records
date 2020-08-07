import { useState } from 'react'
import classes from './CalendarListItem.module.scss'
import { MONTHSABB } from '../Calendar'
import CalendarModal from '../CalendarModal/CalendarModal'
import { DateTime } from 'luxon'

export interface Props {
  date: Date
  title: string
  endDate?: Date
  upcoming?: boolean
  description?: string
  location?: string
  url?: string
}

const CalendarListItem: React.FC<Props> = (props) => {
  const [showModal, setShowModal] = useState(false)

  const onClickHandler = () => {
    setShowModal((prevState) => !prevState)
  }

  let formattedStartTime = DateTime.fromISO(props.date.toISOString()).toLocaleString(
    DateTime.TIME_SIMPLE
  )

  if (formattedStartTime === '12:00 AM') {
    formattedStartTime = 'All day'
  }
  if (!formattedStartTime) {
    formattedStartTime = 'All day'
  }

  return (
    <>
      {showModal && <CalendarModal {...props} onClick={onClickHandler} />}
      <button className={classes.CalendarListItem} onClick={onClickHandler}>
        <div className={classes.DateContainer}>
          <span className={classes.Month}>{MONTHSABB[props.date.getMonth()]}</span>
          <span className={classes.Day}>{props.date.getDate()}</span>
          <span className={classes.Year}>{props.date.getFullYear()}</span>
        </div>
        <div className={classes.TitleContainer}>
          <div className={classes.Title}>{props.title}</div>
          <span className={classes.Time}>{formattedStartTime}</span>
        </div>
        <div className={classes.AddButtonContainer}>
          <div className={classes.AddListItem}>+</div>
        </div>
      </button>
    </>
  )
}

export default CalendarListItem
