import classes from './TextBody.module.scss'

interface Props {
  center?: boolean
}

const Text: React.FC<Props> = (props) => (
  <p style={{ textAlign: props.center ? 'center' : 'inherit' }} className={classes.Text}>
    {props.children}
  </p>
)

export default Text
