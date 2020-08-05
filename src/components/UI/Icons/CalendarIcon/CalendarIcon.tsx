import IconContainer from '../IconContainer/IconContainer'

interface Props {
  size?: number
  styles?: React.CSSProperties
  onClick?: () => void
}

const CalendarIcon: React.FC<Props> = (props) => {
  let styles = {}
  if (props.size) {
    styles = { size: props.size }
  }
  return (
    <IconContainer onClick={props.onClick} styles={props.styles} {...styles}>
      {(iconClass) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.65"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={iconClass}
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      )}
    </IconContainer>
  )
}

export default CalendarIcon
