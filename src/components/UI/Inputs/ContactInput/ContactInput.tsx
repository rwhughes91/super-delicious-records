import classes from './ContactInput.module.scss'
import Input, { Props } from '../Input/Input'

const ContactInput: React.FC<Props> = (props) => {
  return (
    <Input
      {...props}
      className={classes.ContactInput}
      containerClassName={classes.InputContainer}
      errorMessageClassName={classes.ErrorMessage}
    />
  )
}

export default ContactInput
