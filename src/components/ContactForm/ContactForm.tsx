import classes from './ContactForm.module.scss'
import ContactInput from '../UI/Inputs/ContactInput/ContactInput'
import Button from '../UI/Buttons/Button/Button'

const ContactForm: React.FC = () => {
  const onSubmitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault()
  }
  return (
    <form className={classes.Form} onSubmit={onSubmitHandler}>
      <ContactInput defaultValue="Your Name" type="input" />
      <ContactInput defaultValue="Email" type="input" />
      <ContactInput defaultValue="Phone Number" type="input" />
      <ContactInput defaultValue="Please leave a message" type="textarea" />
      <Button color="purple" size="large">
        Submit
      </Button>
    </form>
  )
}

export default ContactForm
