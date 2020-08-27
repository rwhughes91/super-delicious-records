import classes from './CheckoutForm.module.scss'
import ContactInput from '../UI/Inputs/ContactInput/ContactInput'

const CheckoutForm: React.FC = () => {
  return (
    <div>
      <form>
        <ContactInput type="input">First name</ContactInput>
        <ContactInput type="input">Last name</ContactInput>
        <ContactInput type="input">Email</ContactInput>
        <ContactInput type="input">Phone</ContactInput>
      </form>
    </div>
  )
}

export default CheckoutForm
