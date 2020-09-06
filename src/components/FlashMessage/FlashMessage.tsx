import classes from './FlashMessage.module.scss'

interface Props {
  error?: boolean
  success?: boolean
}

const FlashMessage: React.FC<Props> = (props) => {
  const className = [classes.FlashMessage]
  if (props.error) {
    className.push(classes.Error)
  }
  if (props.success) {
    className.push(classes.Success)
  }
  return (
    <div className={className.join(' ')}>
      {props.success && (
        <svg className={classes.CheckMark} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle className={classes.CheckMarkCircle} cx="26" cy="26" r="25" fill="none" />
          <path className={classes.CheckMarkCheck} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
        </svg>
      )}
      <span className={classes.FlashMessageText}>{props.children}</span>
    </div>
  )
}

export default FlashMessage
