import classes from './FormButton.module.scss'

interface Props {
  children: string | JSX.Element
  disabled?: boolean
  styles?: React.CSSProperties
}

const FormButton: React.FC<Props> = (props) => {
  return (
    <button style={props.styles} disabled={props.disabled} className={classes.FormButton}>
      {props.children}
    </button>
  )
}

export default FormButton
