import React from 'react'
import SecondaryHeader from '@components/UI/Headers/SecondaryHeader/SecondaryHeader'
import classes from './GenreCarousel.module.scss'

interface Props {
  genres: string[]
}

const GenreCarousel: React.FC<Props> = (props) => {
  const fontSize = '3rem'
  return (
    <div className={classes.GenreCarousel}>
      <SecondaryHeader
        styles={{ padding: 0, margin: 0, color: 'var(--dark-purple-color)', fontSize }}
      >
        Our genres:
      </SecondaryHeader>
      <div className={classes.Genres}>
        {props.genres.concat([props.genres[0]]).map((genre, i) => {
          return (
            <SecondaryHeader
              key={i}
              styles={{ padding: 0, margin: 0, color: 'var(--bright-red-color)', fontSize }}
            >
              {genre}
            </SecondaryHeader>
          )
        })}
      </div>
    </div>
  )
}

export default React.memo(GenreCarousel)
