import IconContainer from '../IconContainer/IconContainer'

interface Props {
  size?: number
}

const SearchIcon: React.FC<Props> = (props) => {
  let styles = {}
  if (props.size) {
    styles = { size: props.size }
  }
  return (
    <IconContainer {...styles}>
      {(iconClass) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={iconClass}
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      )}
    </IconContainer>
  )
}

export default SearchIcon
