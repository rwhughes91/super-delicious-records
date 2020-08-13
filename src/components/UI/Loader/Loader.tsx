import classes from './Loader.module.scss'

const Loader: React.FC = () => {
  return (
    <div className={classes.LoaderContainer}>
      <div style={{ animationDelay: '0' }} className={classes.Loader}></div>
      <div style={{ animationDelay: '.25s' }} className={classes.Loader}></div>
      <div style={{ animationDelay: '.5s' }} className={classes.Loader}></div>
    </div>
  )
}

export default Loader
