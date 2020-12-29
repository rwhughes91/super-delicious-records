import PrimaryHeader from '../UI/Headers/PrimaryHeader/PrimaryHeader'
import TextBody from '../UI/TextBody/TextBody'
import ContactForm from '@components/ContactForm/ContactForm'
import classes from './SubmissionPolicy.module.scss'

const SubmissionPolicy: React.FC = () => {
  return (
    <>
      <PrimaryHeader>Submission policy</PrimaryHeader>
      <div className={classes.Link}>
        <TextBody center>
          Our roster is expanding! If you’d like to be considered or just see what we can do for
          you, please send inquiries to{' '}
          <a
            style={{
              color: 'var(--bright-red-color)',
              textDecoration: 'none',
              overflowWrap: 'break-word',
              display: 'inline',
            }}
            href="mailto://submissions@superdeliciousrecords.com"
          >
            submissions@superdeliciousrecords.com.
          </a>
        </TextBody>
      </div>
      <TextBody center>
        Tell us a bit about yourself, what you’ve done in the past, what your upcoming plans are,
        and how you think Super Delicious Records can help you. Send *only* links to music, EPKs and
        such, NO ATTACHMENTS. We will reply to all inquiries but please be patient as it may take
        some time. Thank you!
      </TextBody>
      <ContactForm />
    </>
  )
}

export default SubmissionPolicy
