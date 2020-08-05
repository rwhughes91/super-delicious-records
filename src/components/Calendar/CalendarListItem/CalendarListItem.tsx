import classes from './CalendarListItem.module.scss'

interface Props {
  month: string
  day: string | number
  year: string | number
  title: string
  time?: string
}

const CalendarListItem: React.FC<Props> = (props) => {
  return (
    <div className={classes.CalendarListItem}>
      <div className={classes.DateContainer}>
        <span className={classes.Month}>{props.month}</span>
        <span className={classes.Day}>{props.day}</span>
        <span className={classes.Year}>{props.year}</span>
      </div>
      <div className={classes.TitleContainer}>
        <div className={classes.Title}>{props.title}</div>
        <span className={classes.Time}>{props.time || 'All day'}</span>
      </div>
    </div>
  )
}

export default CalendarListItem
