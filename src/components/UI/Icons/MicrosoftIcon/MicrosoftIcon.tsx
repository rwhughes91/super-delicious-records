import IconContainer from '../IconContainer/IconContainer'
import { FaMicrosoft } from 'react-icons/fa'

interface Props {
  styles?: React.CSSProperties
  size?: number
}

const MicrosoftIcon: React.FC<Props> = (props) => {
  return (
    <IconContainer size={props.size} styles={props.styles}>
      {() => <FaMicrosoft size={'100%'} />}
    </IconContainer>
  )
}

export default MicrosoftIcon
