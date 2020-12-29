import React from 'react'
import { FiTarget } from 'react-icons/fi'

interface Props {
  size: number
  color: string
}

const TargetIcon: React.FC<Props> = (props) => {
  return <FiTarget size={props.size} color={props.color} strokeWidth={0.75} />
}

export default React.memo(TargetIcon)
