import React, { useState, useMemo, useCallback } from 'react'
import classes from './Calendar.module.scss'
import CalendarListItem from './CalendarListItem/CalendarListItem'
import Triangle from '../UI/Triangle/Triangle'
import CalendarIcon from '../UI/Icons/CalendarIcon/CalendarIcon'
import ListIcon from '../UI/Icons/ListIcon/ListIcon'
import CalendarItem from './CalendarItem/CalendarItem'
import Media from 'react-media'

const EventsCalendar: React.FC = () => {
  const [view, setView] = useState<'listView' | 'detailView'>('detailView')
  const [startingDate, setStartingDate] = useState(new Date())
  const [events] = useState([
    {
      date: new Date('7/31/2020'),
      title: 'Glass Alice Signing',
      description: 'Glass Alice signs with Super Delicious Records',
    },
    {
      date: new Date('8/3/2020'),
      title: 'Glass Alice Signing',
      description: 'Glass Alice signs with Super Delicious Records',
    },
    {
      date: new Date('8/3/2020'),
      title: 'Glass Alice Signing',
      description: 'Glass Alice signs with Super Delicious Records',
    },
    {
      date: new Date('8/4/2020'),
      title: 'Glass Alice Signing',
      description: 'Glass Alice signs with Super Delicious Records',
    },
    {
      date: new Date('8/18/2020'),
      title: 'Dark Adder Re-Press',
      description: `HYDRAFORM'S debut Dark Adder CD to be re-pressed`,
    },
    {
      date: new Date('8/29/2020'),
      title: 'Tour Starts',
      description: 'HYDRAFORM tour begins',
      time: '4:00PM',
    },
  ])

  const dates = useMemo(() => getDates(startingDate.getFullYear(), startingDate.getMonth()), [
    startingDate,
  ])

  const eventMonthsYear = useMemo(() => {
    const months: number[] = []
    for (const event of events) {
      const month = event.date.getMonth()
      if (months.indexOf(month) === -1) {
        months.push(month)
      }
    }
  }, [events])

  const onChangeMonthHandler = useCallback((direction: 'prev' | 'next') => {
    let newDate: Date
    setStartingDate((prevState) => {
      let monthChange = 1
      if (direction === 'prev') {
        monthChange = -1
      }
      newDate = new Date(
        prevState.getFullYear(),
        prevState.getMonth() + monthChange,
        prevState.getDate()
      )
      return newDate
    })
  }, [])

  const onChangeViewHandler = useCallback((view: 'listView' | 'detailView') => {
    setView(view)
  }, [])

  const genListEvents = (type: 'gt' | 'lt') => {
    return events.map((event, i) => {
      if (type === 'gt') {
        return event.date >= new Date(new Date().toLocaleDateString()) ? (
          <CalendarListItem
            key={i}
            month={MONTHSABB[event.date.getMonth()]}
            day={event.date.getDate()}
            year={event.date.getFullYear()}
            title={event.title}
            time={event.time}
          />
        ) : null
      } else {
        return event.date < new Date(new Date().toLocaleDateString()) ? (
          <CalendarListItem
            key={i}
            month={MONTHSABB[event.date.getMonth()]}
            day={event.date.getDate()}
            year={event.date.getFullYear()}
            title={event.title}
            time={event.time}
          />
        ) : null
      }
    })
  }

  const listView = (
    <div className={classes.CalendarList}>
      <div className={classes.Date}>Upcoming Events</div>
      {genListEvents('gt')}
      <div className={classes.Date}>Recent Events</div>
      {genListEvents('lt')}
    </div>
  )

  const detailView = (
    <table className={classes.CalendarTable}>
      <thead>
        <tr>
          <th colSpan={7}>
            <div className={classes.CalendarHeader}>
              <button className={classes.Button} onClick={() => onChangeMonthHandler('prev')}>
                <Triangle
                  direction="left"
                  size="small"
                  styles={{ borderRightColor: 'var(--light-gray-color)' }}
                />
                <abbr className={classes.Month}>
                  {MONTHSABB[startingDate.getMonth() - 1 < 0 ? 11 : startingDate.getMonth() - 1]}
                </abbr>
              </button>
              <div className={classes.Date}>{`${
                MONTHS[startingDate.getMonth()]
              } ${startingDate.getFullYear()}`}</div>
              <button className={classes.Button} onClick={() => onChangeMonthHandler('next')}>
                <abbr className={classes.Month}>
                  {MONTHSABB[startingDate.getMonth() + 1 > 11 ? 0 : startingDate.getMonth() + 1]}
                </abbr>
                <Triangle
                  direction="right"
                  size="small"
                  styles={{ borderLeftColor: 'var(--light-gray-color)' }}
                />
              </button>
            </div>
          </th>
        </tr>
        <tr className={classes.Header}>
          {DAYS.map((day, i) => (
            <th key={i}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dates.map((week, i) => {
          return (
            <tr key={i}>
              {week.map((day, i) => {
                let currentDay = false
                if (new Date().toLocaleDateString() === day.toLocaleDateString()) {
                  currentDay = true
                }
                let disabled = false
                if (startingDate.getMonth() !== day.getMonth()) {
                  disabled = true
                }
                const matchedEvents = events.filter(
                  (event) => event.date.toLocaleDateString() === day.toLocaleDateString()
                )
                return (
                  <CalendarItem
                    key={i}
                    day={day.getDate()}
                    currentDay={currentDay}
                    events={matchedEvents}
                    disabled={disabled}
                  />
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )

  return (
    <>
      <Media
        query="(min-width: 900px)"
        onChange={(matches) => setView(matches ? 'detailView' : 'listView')}
      />
      <div className={classes.Calendar}>
        <div className={classes.IconContainer}>
          <CalendarIcon
            size={2.5}
            styles={{
              color: view === 'detailView' ? 'var(--dark-purple-color)' : 'var(--light-gray-color)',
            }}
            onClick={() => onChangeViewHandler('detailView')}
          />
          <ListIcon
            size={2.5}
            styles={{
              color: view === 'listView' ? 'var(--dark-purple-color)' : 'var(--light-gray-color)',
            }}
            onClick={() => onChangeViewHandler('listView')}
          />
        </div>
        {view === 'detailView' ? detailView : listView}
      </div>
    </>
  )
}

export default React.memo(EventsCalendar)

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
const MONTHSABB = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const getDates = (year: number, monthIndex: number) => {
  const dates: Array<Date[]> = [[], [], [], [], [], []]
  const startDate = new Date(year, monthIndex, 1)
  startDate.setDate(startDate.getDate() - startDate.getDay())
  const endDate = new Date(new Date(year, monthIndex + 1, 1).getTime() - 1)
  endDate.setDate(endDate.getDate() + 6 - endDate.getDay())

  const currentDate = startDate
  let counter = 0
  while (currentDate <= endDate) {
    const group = Math.floor(counter / 7)
    dates[group].push(new Date(currentDate))
    currentDate.setDate(currentDate.getDate() + 1)
    counter += 1
  }
  return dates
}