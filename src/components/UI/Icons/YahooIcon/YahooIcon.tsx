import IconContainer from '../IconContainer/IconContainer'
import { FaYahoo } from 'react-icons/fa'

interface Props {
  styles?: React.CSSProperties
  size?: number
}

const YahooIcon: React.FC<Props> = (props) => {
  return (
    <IconContainer size={props.size} styles={props.styles}>
      {() => <FaYahoo size={'100%'} />}
    </IconContainer>
  )
}

export default YahooIcon
