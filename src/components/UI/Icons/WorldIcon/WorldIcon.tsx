import React from 'react'
import { FiGlobe } from 'react-icons/fi'

interface Props {
  size: number
  color: string
}

const WorldIcon: React.FC<Props> = (props) => {
  return <FiGlobe size={props.size} color={props.color} strokeWidth={0.75} />
}

export default React.memo(WorldIcon)
