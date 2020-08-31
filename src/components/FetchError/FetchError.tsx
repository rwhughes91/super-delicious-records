import classes from './FetchError.module.scss'

const FetchError: React.FC = () => {
  return (
    <div className={classes.FetchError}>
      <span className={classes.FetchErrorMessage}>
        Oops. Looks like there was an error fetching your orders. Please make sure you are connected
        to the internet and signed in!
      </span>
    </div>
  )
}

export default FetchError
