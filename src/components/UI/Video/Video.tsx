import classes from './Video.module.scss'

interface Props {
  title: string
  src: string
}

const Video: React.FC<Props> = (props) => {
  return (
    <div className={classes.Video}>
      <iframe
        src={props.src}
        frameBorder="0"
        title={props.title}
        width="100%"
        height="100%"
        allowFullScreen
      />
    </div>
  )
}

export default Video
