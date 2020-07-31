import classes from './Logo.module.scss'

interface Props {
  width: string
  height: string
}

const Logo: React.FC<Props> = (props) => {
  return (
    <div className={classes.LogoContainer} style={{ width: props.width, height: props.height }}>
      <img className={classes.Logo} src={'/images/sdr-logo.png'} alt="logo" />
    </div>
  )
}

export default Logo
