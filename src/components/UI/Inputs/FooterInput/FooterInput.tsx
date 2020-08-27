import classes from './FooterInput.module.scss'
import Input, { Props } from '../Input/Input'

const FooterInput: React.FC<Props> = (props) => {
  return (
    <Input
      {...props}
      className={classes.FooterInput}
      containerClassName={classes.ContainerInput}
      errorMessageClassName={classes.ErrorMessage}
      invalidClassName={classes.Invalid}
    />
  )
}

export default FooterInput
