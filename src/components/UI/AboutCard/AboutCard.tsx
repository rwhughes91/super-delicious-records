import React from 'react'
import classes from './AboutCard.module.scss'
import Text from '@components/UI/Text/Text'
import TertiaryHeader from '@components/UI/Headers/TertiaryHeader/TertiaryHeader'
import StarIcon from '@components/UI/Icons/StarIcon/StarIcon'
import TargetIcon from '@components/UI/Icons/TargetIcon/TargetIcon'
import WorldIcon from '@components/UI/Icons/WorldIcon/WorldIcon'

interface Props {
  type: 'part' | 'exp' | 'world'
}

const AboutCard: React.FC<Props> = (props) => {
  const iconConfig = { size: 72, color: 'var(--light-purple-color)' }
  let header
  let body
  let icon
  if (props.type === 'part') {
    header = 'Partnership'
    body = `We align our goals with the artists’ goals and measure our success on achieving those mutual goals.`
    icon = <TargetIcon {...iconConfig} />
  } else if (props.type === 'exp') {
    header = 'Experience'
    body =
      'Super Delicious Records is powered by more than 35 years’ experience in the music business.'
    icon = <StarIcon {...iconConfig} />
  } else {
    header = 'Connected'
    body =
      'Our contact list has global reach and we focus on fostering relationships for sustained success.'
    icon = <WorldIcon {...iconConfig} />
  }
  return (
    <div className={classes.AboutCard}>
      <div>{icon}</div>
      <div className={classes.Title}>
        <TertiaryHeader>{header}</TertiaryHeader>
      </div>
      <div className={classes.Body}>
        <Text>{body}</Text>
      </div>
    </div>
  )
}

export default React.memo(AboutCard)
