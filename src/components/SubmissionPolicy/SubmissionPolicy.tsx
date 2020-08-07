import PrimaryHeader from '../UI/Headers/PrimaryHeader/PrimaryHeader'
import SecondaryHeader from '../UI/Headers/SecondaryHeader/SecondaryHeader'
import TextBody from '../UI/TextBody/TextBody'

const SubmissionPolicy: React.FC = () => {
  return (
    <>
      <PrimaryHeader>Submission policy</PrimaryHeader>
      <SecondaryHeader>
        <p>
          Our roster is expanding! If you’d like to be considered or just see what we can do for
          you, please send inquiries to{' '}
          <a
            style={{ color: 'var(--bright-red-color)', textDecoration: 'none' }}
            href="mailto://submissions@superdeliciousrecords.com"
          >
            submissions@superdeliciousrecords.com
          </a>
          .
        </p>
        Tell us a bit about yourself, what you’ve done in the past, what your upcoming plans are,
        and how you think Super Delicious Records can help you.
      </SecondaryHeader>
      <TextBody center>
        Our focus genres include Metal, Punk and Hard Rock, though we’re open to most types of
        music. Send *only* links to music, EPKs and such, NO ATTACHMENTS. We will reply to all
        inquiries but please be patient as it may take some time. Thank you!
      </TextBody>
    </>
  )
}

export default SubmissionPolicy
