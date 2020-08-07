import classes from './CalendarItem.module.scss'
import { Props as CalendarListItemProps } from '../CalendarListItem/CalendarListItem'
import CalendarEventItem from '../CalendarEventItem/CalendarEventItem'

type Event = CalendarListItemProps

interface Props {
  day: number
  disabled?: boolean
  currentDay?: boolean
  events?: Event[]
}

const CalendarItem: React.FC<Props> = (props) => {
  const classNames = [classes.CalendarItemDay]

  if (props.currentDay) {
    classNames.push(classes.CurrentDay)
  }
  const calendarItemClassNames = [classes.CalendarItem]
  if (props.disabled) {
    calendarItemClassNames.push(classes.Disabled)
  }
  return (
    <td className={calendarItemClassNames.join(' ')}>
      <div className={classNames.join(' ')}>{props.day}</div>
      <div className={classes.CalendarItemData}>
        {props.events?.map((event, i) => {
          return <CalendarEventItem key={i} {...event} />
        })}
      </div>
    </td>
  )
}

export default CalendarItem
