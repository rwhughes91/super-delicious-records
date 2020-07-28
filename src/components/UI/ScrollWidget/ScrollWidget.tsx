import classes from './ScrollWidget.module.scss'

const ScrollWidget: React.FC = () => {
  return (
    <>
      <div className={classes.Mouse}></div>
      <p className={classes.Scroll}>scroll</p>
    </>
  )
}

export default ScrollWidget
