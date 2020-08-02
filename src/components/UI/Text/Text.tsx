import classes from './Text.module.scss'

interface Props {
  styles?: React.CSSProperties
}

const Text: React.FC<Props> = (props) => {
  return (
    <span style={props.styles} className={classes.Text}>
      {props.children}
    </span>
  )
}

export default Text
