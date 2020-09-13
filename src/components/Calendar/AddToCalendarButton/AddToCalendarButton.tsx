import React from 'react'
import { SyntheticEvent } from 'react'
import classes from './AddToCalendarButton.module.scss'
import AppleIcon from '../../UI/Icons/AppleIcon/AppleIcon'
import MicrosoftIcon from '../../UI/Icons/MicrosoftIcon/MicrosoftIcon'
import GoogleIcon from '../../UI/Icons/GoogleIcon/GoogleIcon'
import YahooIcon from '../../UI/Icons/YahooIcon/YahooIcon'
import { buildShareUrl, isInternetExplorer } from './utils'

export enum Item {
  'GOOGLE' = 'Google',
  'APPLE' = 'iCal',
  'OUTLOOK' = 'Outlook',
  'YAHOO' = 'Yahoo',
}

export interface Event {
  description: string
  duration: string | number
  endDatetime: string
  location: string
  startDatetime: string
  timezone: string
  title: string
}

interface Props {
  type: 'google' | 'apple' | 'outlook' | 'yahoo'
  event: Event
}

const AddToCalendarButton: React.FC<Props> = (props) => {
  const handleCalendarButtonClick = (e: SyntheticEvent) => {
    const filename = `SDR Event_${props.event.title}`
    e.preventDefault()
    const url = e.currentTarget.getAttribute('href')

    if (url && url.startsWith('BEGIN')) {
      const blob = new Blob([url], { type: 'text/calendar;charset=utf-8' })

      if (isInternetExplorer()) {
        window.navigator.msSaveOrOpenBlob(blob, `${filename}.ics`)
      } else {
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.setAttribute('download', `${filename}.ics`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    } else if (url) {
      window.open(url, '_blank')
    }
  }

  let item: Item = Item.GOOGLE
  let button = <GoogleIcon size={2} styles={{ color: 'var(--bright-blue-color)' }} />
  switch (props.type) {
    case 'google':
      break
    case 'apple':
      button = <AppleIcon size={2} styles={{ color: 'var(--bright-blue-color)' }} />
      item = Item.APPLE
      break
    case 'outlook':
      button = <MicrosoftIcon size={2} styles={{ color: 'var(--bright-blue-color)' }} />
      item = Item.OUTLOOK
      break
    case 'yahoo':
      button = <YahooIcon size={2} styles={{ color: 'var(--bright-blue-color)' }} />
      item = Item.YAHOO
      break
  }
  return (
    <a
      className={classes.AddToCalendarButton}
      onClick={handleCalendarButtonClick}
      href={buildShareUrl(props.event, item)}
    >
      {button}
    </a>
  )
}

export default React.memo(AddToCalendarButton)
