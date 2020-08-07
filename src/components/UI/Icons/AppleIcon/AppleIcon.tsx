import IconContainer from '../IconContainer/IconContainer'
import { FaApple } from 'react-icons/fa'

interface Props {
  styles?: React.CSSProperties
  size?: number
}

const AppleIcon: React.FC<Props> = (props) => {
  return (
    <IconContainer size={props.size} styles={props.styles}>
      {() => <FaApple size={'100%'} />}
    </IconContainer>
  )
}

export default AppleIcon
