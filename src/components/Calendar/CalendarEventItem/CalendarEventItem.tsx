import { useState } from 'react'
import classes from './CalendarEventItem.module.scss'
import { Props as CalendarListItemProps } from '../CalendarListItem/CalendarListItem'
import CalendarModal from '../CalendarModal/CalendarModal'

type Props = CalendarListItemProps

const CalendarEventItem: React.FC<Props> = (props) => {
  let upcoming = false
  const today = new Date(new Date().toLocaleDateString())

  if (today.getTime() <= props.date.getTime()) {
    upcoming = true
  }

  const [showModal, setShowModal] = useState(false)

  const onClickHandler = () => {
    setShowModal((prevState) => !prevState)
  }

  return (
    <>
      {showModal && <CalendarModal {...props} upcoming={upcoming} onClick={onClickHandler} />}
      <button className={classes.CalendarEventItem} onClick={onClickHandler}>
        {props.title}
      </button>
    </>
  )
}

export default CalendarEventItem
