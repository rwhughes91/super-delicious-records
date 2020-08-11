import IconContainer from '../IconContainer/IconContainer'
import { FaSpotify } from 'react-icons/fa'

interface Props {
  styles?: React.CSSProperties
  size?: number
}

const SpotifyIcon: React.FC<Props> = (props) => {
  return (
    <IconContainer size={props.size} styles={props.styles}>
      {() => <FaSpotify size={'100%'} />}
    </IconContainer>
  )
}

export default SpotifyIcon
