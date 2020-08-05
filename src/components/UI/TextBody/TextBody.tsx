import classes from './TextBody.module.scss'

interface Props {
  center?: boolean
  styles?: React.CSSProperties
}

const Text: React.FC<Props> = (props) => (
  <div
    style={{ ...props.styles, textAlign: props.center ? 'center' : 'inherit' }}
    className={classes.Text}
  >
    {props.children}
  </div>
)

export default Text
