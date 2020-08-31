import { useState, useCallback, useContext } from 'react'
import classes from './UserToolTip.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ProfileIcon from '../UI/Icons/ProfileIcon/ProfileIcon'
import Backdrop from '../UI/Backdrop/Backdrop'
import { FormButtonClass } from '../UI/Buttons/FormButton/FormButton'
import { UserContext } from '../../context/UserProvider'
import { auth } from '../../services/firebase/client'

interface Props {
  size: number
  styles?: React.CSSProperties
}

const UserToolTip: React.FC<Props> = (props) => {
  const { user } = useContext(UserContext)
  const router = useRouter()
  const [showToolTip, setShowToolTip] = useState(false)

  const toggleToolTip = useCallback(() => {
    setShowToolTip((prevState) => !prevState)
  }, [])

  const formButton = useCallback(
    (text: string, onClick?: () => void) => (
      <button
        className={FormButtonClass}
        style={{ fontSize: '1.6rem', height: '4.5rem' }}
        onClick={onClick}
      >
        {text}
      </button>
    ),
    []
  )

  const logout = useCallback(() => {
    if (user.user) {
      auth.signOut()
    }
  }, [user.user])

  const header = <p className={classes.Header}>Account</p>
  const signIn = <Link href="/shop/orders">{formButton('Sign In')}</Link>
  const signOut = formButton('Sign Out', logout)
  const ordersPageLink = (
    <Link href="/shop/orders">
      <button className={[classes.ToolItem, classes.Ripple].join(' ')}>Orders</button>
    </Link>
  )

  const toolBody = (
    <>
      {header}
      {router.pathname !== '/shop/orders' && (
        <>
          {ordersPageLink}
          {user.user ? signOut : signIn}
        </>
      )}
      {router.pathname === '/shop/orders' && !user.user && (
        <div style={{ color: 'var(--dark-purple-color)', fontSize: '2rem' }}>Please sign in</div>
      )}
      {router.pathname === '/shop/orders' && user.user && signOut}
    </>
  )

  const SideBar: JSX.Element = (
    <div
      className={[classes.Tool, classes.SideBar].join(' ')}
      style={{ right: showToolTip ? 0 : '-100%' }}
    >
      {toolBody}
    </div>
  )

  const DropDown = <div className={[classes.Tool, classes.Dropdown].join(' ')}>{toolBody}</div>

  return (
    <>
      <div className={classes.ToolTip}>
        <button className={classes.ToolTipButton} onClick={toggleToolTip} style={props.styles}>
          <ProfileIcon size={props.size} />
        </button>
        {SideBar}
        {showToolTip && DropDown}
      </div>
      <Backdrop
        show={showToolTip}
        top="0"
        left="0"
        onClick={toggleToolTip}
        styles={{ backgroundColor: 'rgba(0, 0, 0, .6)' }}
        classNames={classes.SideBar}
      />
      <Backdrop
        show={showToolTip}
        top="0"
        left="0"
        onClick={toggleToolTip}
        styles={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
        classNames={classes.Dropdown}
      />
    </>
  )
}

export default UserToolTip
