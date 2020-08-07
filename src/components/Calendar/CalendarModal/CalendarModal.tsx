import classes from './CalendarModal.module.scss'
import { Props as CalendarListItemProps } from '../CalendarListItem/CalendarListItem'
import Backdrop from '../../UI/Backdrop/Backdrop'
import AddToCalendarButton, { Event } from '../AddToCalendarButton/AddToCalendarButton'
import { DateTime } from 'luxon'

interface Props extends CalendarListItemProps {
  onClick: () => void
}

const CalendarModal: React.FC<Props> = (props) => {
  const startDate = DateTime.fromISO(props.date.toISOString())
  const endDate = props.endDate
    ? DateTime.fromISO(props.endDate.toISOString())
    : startDate.plus({ hours: 1 })
  const duration = endDate.diff(startDate).as('hours')

  let formattedStartTime = DateTime.fromISO(props.date.toISOString()).toLocaleString(
    DateTime.TIME_SIMPLE
  )
  if (formattedStartTime === '12:00 AM') {
    formattedStartTime = 'All day'
  }
  if (!formattedStartTime) {
    formattedStartTime = 'All day'
  }

  const event: Event = {
    description: props.description ?? '',
    location: props.location ?? '',
    title: props.title,
    startDatetime: startDate.toFormat('YYYYMMDDTHHmmss'),
    endDatetime: endDate.toFormat('YYYYMMDDTHHmmss'),
    duration: duration,
    timezone: 'America/Denver',
  }
  return (
    <>
      <Backdrop
        show
        left="0"
        top="0"
        onClick={props.onClick}
        styles={{ backgroundColor: 'rgba(0, 0, 0, .6)' }}
      />
      <div className={classes.CalendarModal}>
        <button className={classes.Exit} onClick={props.onClick}>
          X
        </button>
        <div className={classes.Title}>{props.title}</div>
        {props.description && <div className={classes.Description}>{props.description}</div>}
        {props.url && <button className={classes.Link}>Read More</button>}
        <div className={classes.DateHeader}>
          <div className={classes.SmallHeader}>Date:</div>
          {props.date.toLocaleDateString()}
          <div className={classes.SmallHeader}>Time:</div>
          {formattedStartTime}
          {props.location && (
            <>
              <div className={classes.SmallHeader}>Location:</div>
              {props.location}
            </>
          )}
        </div>
        {props.upcoming && (
          <div className={classes.AddToCalendarContainer}>
            <div className={classes.AddToCalendar}>Add to Your Calendar</div>
            <div className={classes.CalendarButtons}>
              <AddToCalendarButton type="google" event={event} />
              <AddToCalendarButton type="apple" event={event} />
              <AddToCalendarButton type="outlook" event={event} />
              <AddToCalendarButton type="yahoo" event={event} />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default CalendarModal
