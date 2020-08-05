import IconContainer from '../IconContainer/IconContainer'

interface Props {
  size?: number
  styles?: React.CSSProperties
  onClick?: () => void
}

const ListView: React.FC<Props> = (props) => {
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
          <line x1="8" y1="6" x2="21" y2="6"></line>
          <line x1="8" y1="12" x2="21" y2="12"></line>
          <line x1="8" y1="18" x2="21" y2="18"></line>
          <line x1="3" y1="6" x2="3.01" y2="6"></line>
          <line x1="3" y1="12" x2="3.01" y2="12"></line>
          <line x1="3" y1="18" x2="3.01" y2="18"></line>
        </svg>
      )}
    </IconContainer>
  )
}

export default ListView
