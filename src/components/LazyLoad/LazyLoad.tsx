import React from 'react'
import { useInView } from 'react-intersection-observer'

interface Props {
  placeholder: JSX.Element
  children: JSX.Element | JSX.Element[] | string | string[]
  style?: React.CSSProperties
  customRef?: React.MutableRefObject<HTMLDivElement | null>
}

const LazyLoad: React.FC<Props> = (props) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  return (
    <div style={props.style} ref={ref}>
      <div style={{ height: '100%', width: '100%' }} ref={props.customRef}>
        {inView ? props.children : props.placeholder}
      </div>
    </div>
  )
}

export default React.memo(LazyLoad)
