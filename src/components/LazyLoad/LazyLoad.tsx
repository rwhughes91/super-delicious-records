import React from 'react'
import { useInView } from 'react-intersection-observer'

interface Props {
  placeholder: JSX.Element
  children: JSX.Element | JSX.Element[] | string | string[]
  style?: React.CSSProperties
}

const LazyLoad: React.FC<Props> = (props) => {
  const { ref, inView } = useInView({
    threshold: 0.25, // TODO: put final threshold
    triggerOnce: true,
  })
  return (
    <div style={props.style} ref={ref}>
      {inView ? props.children : props.placeholder}
    </div>
  )
}

export default React.memo(LazyLoad)
