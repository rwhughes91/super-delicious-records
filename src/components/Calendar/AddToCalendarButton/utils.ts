import { Item as SHARE_SITES, Event } from './AddToCalendarButton'

declare global {
  interface Window {
    opera: string
  }
}

export const formatDate: (x: string) => string = (date) => date && date.replace('+00:00', 'Z')

export const formatDuration: (x: string | number) => string = (duration) => {
  if (typeof duration === 'string') return duration
  const parts = duration.toString().split('.')
  if (parts.length < 2) {
    parts.push('00')
  }

  return parts.map((part) => (part.length === 2 ? part : `0${part}`)).join('')
}

export const isMobile: () => boolean = () =>
  /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/.test(
    window.navigator.userAgent || window.navigator.vendor || window.opera
  )

export const isInternetExplorer: () => boolean = () =>
  /MSIE/.test(window.navigator.userAgent) || /Trident/.test(window.navigator.userAgent)

export const escapeICSDescription: (x: string) => string = (description) =>
  description.replace(/(\r?\n|<br ?\/?>)/g, '\\n')

const googleShareUrl: (x: Event) => string = ({
  description,
  endDatetime,
  location,
  startDatetime,
  timezone,
  title,
}) =>
  `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${startDatetime}/${endDatetime}${
    timezone && `&ctz=${timezone}`
  }&location=${location}&text=${title}&details=${description}`

const yahooShareUrl: (x: Event) => string = ({
  description,
  duration,
  location,
  startDatetime,
  title,
}) =>
  `https://calendar.yahoo.com/?v=60&view=d&type=20&title=${title}&st=${startDatetime}&dur=${duration}&desc=${description}&in_loc=${location}`

const buildShareFile: (x: Event) => string = ({
  description = '',
  endDatetime,
  location = '',
  startDatetime,
  timezone = '',
  title = '',
}) => {
  const content = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `URL:${document.URL}`,
    'METHOD:PUBLISH',
    // TODO: Will need to parse the date without Z for ics
    // This means I'll probably have to require a date lib - luxon most likely or datefns
    timezone === '' ? `DTSTART:${startDatetime}` : `DTSTART;TZID=${timezone}:${startDatetime}`,
    timezone === '' ? `DTEND:${endDatetime}` : `DTEND;TZID=${timezone}:${endDatetime}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${escapeICSDescription(description)}`,
    `LOCATION:${location}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\n')

  return isMobile() ? encodeURI(`data:text/calendar;charset=utf8,${content}`) : content
}

export const buildShareUrl: (x: Event, y: SHARE_SITES) => string = (
  {
    description = '',
    duration,
    endDatetime,
    location = '',
    startDatetime,
    timezone = '',
    title = '',
  },
  type
) => {
  const encodeURI = type !== SHARE_SITES.APPLE && type !== SHARE_SITES.OUTLOOK

  const data: Event = {
    description: encodeURI ? encodeURIComponent(description) : description,
    duration: formatDuration(duration),
    endDatetime: formatDate(endDatetime),
    location: encodeURI ? encodeURIComponent(location) : location,
    startDatetime: formatDate(startDatetime),
    timezone,
    title: encodeURI ? encodeURIComponent(title) : title,
  }

  switch (type) {
    case SHARE_SITES.GOOGLE:
      return googleShareUrl(data)
    case SHARE_SITES.YAHOO:
      return yahooShareUrl(data)
    default:
      return buildShareFile(data)
  }
}
