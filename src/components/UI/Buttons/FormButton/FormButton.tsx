import classes from './FormButton.module.scss'

interface Props {
  children: string | JSX.Element
  disabled?: boolean
  styles?: React.CSSProperties
  onClick?: () => void
}

const FormButton: React.FC<Props> = (props) => {
  return (
    <button
      style={props.styles}
      disabled={props.disabled}
      className={classes.FormButton}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

export default FormButton
