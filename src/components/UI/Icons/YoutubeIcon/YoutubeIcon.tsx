import IconContainer from '../IconContainer/IconContainer'
import { FaYoutube } from 'react-icons/fa'

interface Props {
  styles?: React.CSSProperties
  size?: number
}

const YoutubeIcon: React.FC<Props> = (props) => {
  return (
    <IconContainer size={props.size} styles={props.styles}>
      {() => <FaYoutube size={'100%'} />}
    </IconContainer>
  )
}

export default YoutubeIcon
