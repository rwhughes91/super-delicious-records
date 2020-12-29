import React, { useCallback, useState } from 'react'
import classes from './ListItem.module.scss'
import AnimateHeight from 'react-animate-height'
import Text from '@components/UI/Text/Text'

interface Props {
  body: string
  title: string
}

const ListItem: React.FC<Props> = (props) => {
  const [show, setShow] = useState(false)

  const onClickHandler = useCallback(() => {
    setShow((prevShow) => !prevShow)
  }, [])

  return (
    <button
      className={classes.ListItem}
      onClick={onClickHandler}
      style={{ paddingBottom: show ? '2rem' : '1rem' }}
    >
      <div className={classes.ListItemTitle}>
        <Text styles={{ textAlign: 'start' }}>{props.title}</Text>
        <div
          className={classes.Plus}
          style={{
            transform: show ? 'rotate(-45deg)' : 'rotate(0)',
            color: show ? 'var(--bright-red-color)' : '',
          }}
        >
          +
        </div>
      </div>
      <AnimateHeight duration={250} height={show ? 'auto' : 0} animateOpacity>
        <div className={classes.ListItemBody}>
          <Text>{props.body}</Text>
        </div>
      </AnimateHeight>
    </button>
  )
}

export default React.memo(ListItem)
