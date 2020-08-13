import IconContainer from '../IconContainer/IconContainer'

interface Props {
  styles?: React.CSSProperties
  size?: number
}

const ProfileIcon: React.FC<Props> = (props) => {
  return (
    <IconContainer size={props.size} styles={props.styles}>
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
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      )}
    </IconContainer>
  )
}

export default ProfileIcon
