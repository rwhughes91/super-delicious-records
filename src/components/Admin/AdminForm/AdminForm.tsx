import React, { useCallback, FormEvent } from 'react'
import classes from './AdminForm.module.scss'
import FormButton from '../../UI/Buttons/FormButton/FormButton'

interface Props {
  title: string
  children: JSX.Element | JSX.Element[]
  onSubmit: () => void
}

const AdminForm: React.FC<Props> = (props) => {
  const { onSubmit } = props

  const onSubmitHandler = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const res = onSubmit()
      console.log(res)
    },
    [onSubmit]
  )

  return (
    <div className={classes.AdminFormContainer}>
      <h1 className={classes.AdminFormTitle}>{props.title}</h1>
      <form className={classes.AdminForm} onSubmit={onSubmitHandler}>
        {props.children}
        <div className={classes.ButtonContainer}>
          <FormButton styles={{ fontSize: '1.4rem', maxWidth: '32rem', margin: '1rem 0' }}>
            Save
          </FormButton>
        </div>
      </form>
    </div>
  )
}

export default React.memo(AdminForm)
