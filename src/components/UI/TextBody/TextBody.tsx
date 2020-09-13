import classes from './TextBody.module.scss'

interface Props {
  center?: boolean
  styles?: React.CSSProperties
  fullWidthOnPhone?: boolean
  large?: boolean
}

const Text: React.FC<Props> = (props) => (
  <div
    style={{ ...props.styles, textAlign: props.center ? 'center' : 'inherit' }}
    className={[
      classes.Text,
      props.fullWidthOnPhone ? classes.Wide : '',
      props.large ? classes.Large : '',
    ].join(' ')}
  >
    {props.children}
  </div>
)

export default Text
