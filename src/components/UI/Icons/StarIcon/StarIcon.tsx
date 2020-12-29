import React from 'react'
import { FiMusic } from 'react-icons/fi'

interface Props {
  size: number
  color: string
}

const StarIcon: React.FC<Props> = (props) => {
  return <FiMusic size={props.size} color={props.color} strokeWidth={0.75} />
}

export default React.memo(StarIcon)
