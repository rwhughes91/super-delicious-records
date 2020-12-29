import React from 'react'
import classes from './Layout.module.scss'

interface Props {
  children: any
}

const Body: React.FC<Props> = (props) => {
  return <div className={classes.Body}>{props.children}</div>
}

export default React.memo(Body)
