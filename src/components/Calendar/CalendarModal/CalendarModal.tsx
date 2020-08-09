import { DateTime } from 'luxon'
import classes from './CalendarModal.module.scss'
import { Props as CalendarListItemProps } from '../CalendarListItem/CalendarListItem'
import AddToCalendarButton, { Event } from '../AddToCalendarButton/AddToCalendarButton'
import CalendarIcon from '../../UI/Icons/CalendarIcon/CalendarIcon'
import TimeIcon from '../../UI/Icons/TimeIcon/TimeIcon'
import LocationIcon from '../../UI/Icons/LocationIcon/LocationIcon'
import Modal from '../../UI/Modal/Modal'

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
    <Modal
      show
      left="0"
      top="0"
      onClick={props.onClick}
      styles={{ backgroundColor: 'rgba(0, 0, 0, .6)' }}
    >
      <>
        <button className={classes.Exit} onClick={props.onClick}>
          X
        </button>
        <div className={classes.Title}>{props.title}</div>
        {props.description && <div className={classes.Description}>{props.description}</div>}
        {props.url && <button className={classes.Link}>Read More</button>}
        <div className={classes.DateHeader}>
          <div className={classes.SmallHeader}>
            <CalendarIcon size={2.5} styles={{ color: 'var(--light-gray-color' }} />
            <span>{props.date.toLocaleDateString()}</span>
          </div>
          <div className={classes.SmallHeader}>
            <TimeIcon size={2.5} styles={{ color: 'var(--light-gray-color)' }} />
            <span>{formattedStartTime}</span>
          </div>
          {props.location && (
            <>
              <div className={classes.SmallHeader}>
                <LocationIcon size={2.5} styles={{ color: 'var(--light-gray-color)' }} />
                <span>{props.location}</span>
              </div>
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
      </>
    </Modal>
  )
}

export default CalendarModal
