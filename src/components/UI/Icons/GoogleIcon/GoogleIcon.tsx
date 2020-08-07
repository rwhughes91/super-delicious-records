import IconContainer from '../IconContainer/IconContainer'
import { FaGoogle } from 'react-icons/fa'

interface Props {
  styles?: React.CSSProperties
  size?: number
}

const GoogleIcon: React.FC<Props> = (props) => {
  return (
    <IconContainer size={props.size} styles={props.styles}>
      {() => <FaGoogle size={'100%'} />}
    </IconContainer>
  )
}

export default GoogleIcon
