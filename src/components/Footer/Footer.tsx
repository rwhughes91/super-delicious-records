import { useState } from 'react'
import classes from './Footer.module.scss'
import Logo from '../UI/Logo/Logo'
import Button from '../UI/Button/Button'
import FooterNavItems from '../Navigation/FooterNavItems/FooterNavItems'
import FooterInput from '../UI/Inputs/FooterInput/FooterInput'
import FacebookIcon from '../UI/Icons/FacebookIcon/FacebookIcon'
import TwitterIcon from '../UI/Icons/TwitterIcon/TwitterIcon'
import InstagramIcon from '../UI/Icons/InstagramIcon/InstagramIcon'

const Footer: React.FC = () => {
  const [urls] = useState({
    facebook: 'https://www.facebook.com/SuperDeliciousRecords',
    instagram: 'https://www.instagram.com/accounts/login/?next=/superdeliciousrecords/',
    twitter: 'https://twitter.com/SuperDeliciousR',
  })
  const icons = (type: 'small' | 'large') => (
    <>
      <a href={urls.facebook} rel="noreferrer" target="_blank">
        <FacebookIcon size={type === 'large' ? 2.5 : undefined} />
      </a>
      <a href={urls.instagram} target={'blank'}>
        <InstagramIcon size={type === 'large' ? 2.5 : undefined} />
      </a>
      <a href={urls.twitter} target={'blank'}>
        <TwitterIcon size={type === 'large' ? 2.5 : undefined} />
      </a>
    </>
  )
  return (
    <div className={classes.FooterContainer}>
      <div className={classes.Footer}>
        <Logo width="6rem" height="5rem" />
        <div className={classes.FormContainer}>
          <p className={classes.FooterFormTitle}>Sign up for updates</p>
          <form className={classes.FooterForm} id="footer-form">
            <FooterInput defaultValue="Your Name" />
            <FooterInput defaultValue="Your Email" />
            <div className={classes.ButtonGroup}>
              <Button size="medium" color="white">
                Sign Up
              </Button>
            </div>
          </form>
        </div>
        <div className={classes.FooterNavigation}>
          <FooterNavItems />
        </div>
        <div className={[classes.IconContainer, classes.IconContainerLarge].join(' ')}>
          {icons('large')}
        </div>
        <div className={[classes.IconContainer, classes.IconContainerSmall].join(' ')}>
          {icons('small')}
        </div>
      </div>
    </div>
  )
}

export default Footer
