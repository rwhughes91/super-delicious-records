import React, { useState, useContext, useRef, FormEvent } from 'react'
import classes from './AdminForm.module.scss'
import FormButton from '@components/UI/Buttons/FormButton/FormButton'
import Loader from '@components/UI/Loader/Loader'
import FlashMessage from '@components/FlashMessage/FlashMessage'
import * as typeDefs from '@generated/graphql'
import sendAxiosRequest from '@utils/sendAxios'
import { UserContext } from '@context/UserProvider'
import { CancelTokenSource } from 'axios'

interface Props {
  title: string
  children: JSX.Element | JSX.Element[]
  query: string
  pid?: string
  upload?: boolean
  closeFormOnSubmit: () => void
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit: () =>
    | typeDefs.NewsInput
    | typeDefs.ArtistInput
    | typeDefs.ShopItemInput
    | typeDefs.EventInput
}

const AdminForm: React.FC<Props> = (props) => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { user } = useContext(UserContext)
  const lastRequestCancelFn = useRef<CancelTokenSource | null>()

  const { setSuccess } = props

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    props.onSubmit()
    setError('')
    setLoading(true)
    try {
      if (user.user) {
        if (!user.admin) {
          throw new Error('Not authenticated as an admin')
        }
        const res = props.onSubmit()
        const variables: { data: typeof res; pid?: string } = { data: res }
        if (props.pid) {
          variables.pid = props.pid
        }
        const [request, cancelFn] = sendAxiosRequest(props.query, user.user, variables)
        lastRequestCancelFn.current?.cancel()
        lastRequestCancelFn.current = cancelFn
        request()
          .then(() => {
            setLoading(false)
            setSuccess(true)
            props.closeFormOnSubmit()
          })
          .catch((error) => {
            setLoading(false)
            setError(error.message)
          })
      }
    } catch (error) {
      setLoading(false)
      setError(error.message)
      window.scrollTo(0, 0)
    }
  }

  return (
    <div className={classes.AdminFormContainer}>
      <h1 className={classes.AdminFormTitle}>{props.title}</h1>
      {error && <FlashMessage error>{error}</FlashMessage>}
      {loading ? (
        <div className={classes.LoaderContainer}>
          <Loader />
        </div>
      ) : (
        <form className={classes.AdminForm} onSubmit={onSubmitHandler}>
          {props.children}
          <div className={classes.ButtonContainer}>
            <FormButton styles={{ fontSize: '1.4rem', maxWidth: '32rem', margin: '1rem 0' }}>
              Save
            </FormButton>
          </div>
        </form>
      )}
    </div>
  )
}

export default React.memo(AdminForm)
