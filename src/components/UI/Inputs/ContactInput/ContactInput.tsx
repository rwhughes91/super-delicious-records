import classes from './ContactInput.module.scss'
import Input from '../Input/Input'

export interface Props {
  type: 'input' | 'textarea'
  defaultValue?: string
  styles?: React.CSSProperties
  onChange?: (value: string) => void
}

const ContactInput: React.FC<Props> = (props) => {
  return (
    <Input
      {...props}
      classNames={classes.ContactInput}
      type={props.type}
      onChange={props.onChange}
    />
  )
}

export default ContactInput
