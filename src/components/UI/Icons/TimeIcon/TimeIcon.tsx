import IconContainer from '../IconContainer/IconContainer'
import { FiClock } from 'react-icons/fi'

interface Props {
  styles?: React.CSSProperties
  size?: number
}

const TimeIcon: React.FC<Props> = (props) => {
  return (
    <IconContainer size={props.size} styles={props.styles}>
      {() => <FiClock size={'100%'} />}
    </IconContainer>
  )
}

export default TimeIcon
