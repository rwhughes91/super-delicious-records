import IconContainer from '../IconContainer/IconContainer'
import { IoMdPin } from 'react-icons/io'

interface Props {
  styles?: React.CSSProperties
  size?: number
}

const LocationIcon: React.FC<Props> = (props) => {
  return (
    <IconContainer size={props.size} styles={props.styles}>
      {() => <IoMdPin size={'100%'} />}
    </IconContainer>
  )
}

export default LocationIcon
