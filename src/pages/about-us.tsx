import Head from 'next/head'
import { useState } from 'react'
import classes from '../styles/pages/AboutUs.module.scss'
import Layout from '../components/Layout/Layout'
import PrimaryHeader from '../components/UI/Headers/PrimaryHeader/PrimaryHeader'
import SecondaryHeader from '../components/UI/Headers/SecondaryHeader/SecondaryHeader'
import TertiaryHeader from '../components/UI/Headers/TertiaryHeader/TertiaryHeader'
import Triangle from '../components/UI/Triangle/Triangle'
import TextBody from '../components/UI/TextBody/TextBody'

interface ListItems {
  [key: number]: boolean
}

const listItemText = [
  {
    title: '#1 Record Labels Provide Promotions, Marketing Plans, and Marketing Materials',
    body: `There’s not enough time to do everything on your own. With a record label, you get
      expertise working for you with years of experience in promotions, marketing, and
      branding. The experts know the dos and don’ts of building artists, and are able to
      assist with marketing collateral and strategies to expand your audience and grow your
      fanbase.`,
  },
  {
    title: '#2 Record Labels Have the Resources to Promote Material Properly',
    body: `You can spend a lot of time and money promoting music and have very little to show for
    it at the end of the day. Record labels have the tried and true experience to get the
    best return on the promotional dollars spent to maximize the artists’ exposure.`,
  },
  {
    title: '#3 Record Labels Provide Support for Videos and Photoshoots',
    body: `Music videos are one the most important promotional tools available, but they can be
    expensive and time consuming to make. Additionally, professional photos are must for
    any EPK. A record label has the resources to streamline these processes and to be able
    to build for you the look you want, and at a fraction of the cost.`,
  },
  {
    title: '#4 Record Labels Have Booking and Touring Resources',
    body: `Record labels maintain relationships with professionals throughout the industry. This
    is especially important when it comes to booking agents, tour managers, and tour
    support. The right shows, with the right payment, and a solid support team is what it
    takes to make a tour both productive and successful.`,
  },
  {
    title: `#5 Record Labels have Greater Access to Media Outlets Including Magazines, Radio,
    Podcasts and Blogs`,
    body: `Record labels have more sway, more contacts, and can offer their artists more
    opportunity. Many outlets don’t deal directly with artists at all, and even those that
    do give priority to record labels. They know that labels are more professional, more
    focused and have already vetted the artists. Record labels have rapport with their
    contacts and the inherent trust provides preferential opportunities.`,
  },
  {
    title: '#6 Record Labels Can Help with Production Costs',
    body: `It’s easier than ever to self-record, but modern production standards still require
    professional expertise to stand out from the crowd. Record labels have access to the
    professionals and resources necessary to achieve top quality, without the guesswork.`,
  },
  {
    title: '#7 Record Labels Give you the Opportunity to be A Part of a Community',
    body: `When one artist succeeds the entire record label family benefits. Upon joining a
    record label, you immediately become associated with that label’s artists, get the
    benefits of that exposure, and the credibility from it as well. This translates to
    better touring opportunities, lower overhead from shared resources, better promotional
    opportunities and greater exposure. Every label-mate enjoys the same industry clout
    just by being label-mates. Don’t underestimate how valuable this can be.`,
  },
  {
    title: '#8 Record Labels Provide Industry Guidance and Business Acumen',
    body: `Electronic distribution is easier than it ever has been, but how do you make the most
    of it? Record labels understand the metrics, how to leverage multiple distribution
    channels, and how to capitalize on the markets that are popping.`,
  },
  {
    title: '#9 Record Labels Can Provide Support for Hard Media and Other Tour Essentials',
    body: `Touring is essential for promoting your music, but there’s a lot that goes into it
    before the tour begins. Sale-able goods such as CD’s, vinyl, T-shirts and other swag
    need to be produced before the tour. Tour essentials such as signage, lights, trusses,
    sales and inventory tools, etc. – the needs are extensive. Record labels have the
    resources, contacts and knowledge to ensure that tour prep – and the tour – goes
    smoothly and is successful.`,
  },
  {
    title: '# 10 Record Labels Have Contacts and Resources Throughout the Industry',
    body: `Record Labels are in contact with every facet of the industry. Years of relationship
    building leads to solid rapport with trusted contacts that can be called upon as
    needed. If the label can’t do something itself, they know someone who can do it, and
    do it well.`,
  },
]

const listItemState: ListItems = {
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
  6: false,
  7: false,
  8: false,
  9: false,
  10: false,
}

const aboutUs: React.FC = () => {
  const [showListItem, setShowListItem] = useState(listItemState)

  const onClickHandler = (i: number) => {
    setShowListItem((prevState) => {
      return {
        ...prevState,
        [i]: !prevState[i],
      }
    })
  }
  return (
    <>
      <Head>
        <title>About Us | Super Delicious Records</title>
      </Head>
      <Layout pageType="main">
        <PrimaryHeader>About Us</PrimaryHeader>
        <SecondaryHeader>
          Super Delicious Records is a different kinds of record label.
        </SecondaryHeader>
        <TertiaryHeader>
          We partner with artists in the same way that other labels don’t. We align our goals with
          the artists’ goals and measure our success on achieving those mutual goals.
        </TertiaryHeader>
        <TextBody center>
          Additionally, we take a different approach to marketing. Our contact list is extensive and
          has global reach, covering every landmass on Earth, but that’s not the only thing that
          sets us apart. By engaging each contact individually we’re able to create and maintain
          rapport. Building upon these relationships allows us to establish the long term
          partnerships that form the foundation of our marketing.
        </TextBody>
        <SecondaryHeader>
          Super Delicious Records and our artists to flourish in the ever changing music business.
        </SecondaryHeader>
        <TextBody center>
          Don’t be fooled by our youth. Super Delicious Records is powered by more than 35 years’
          experience in the music business in virtually every realm – creation, production,
          distribution, marketing, promotion, touring – there’s almost nothing we haven’t done. That
          makes Super Delicious Records unique among record labels, and uniquely qualified to ensure
          that every project reaches its maximum potential.
        </TextBody>
        <PrimaryHeader>About Record Labels</PrimaryHeader>
        <SecondaryHeader>Why do I need a record label?</SecondaryHeader>
        <TextBody center>
          The truth is you don’t. But you probably want a Record label… unless you have an unlimited
          amount of time and money – and even then you would probably want a label. Record labels
          handle the business end of the music business – freeing your time to write, record, and
          perform. Indie labels play a fundamental role in developing and establishing artists,
          ultimately preparing them for the next level.
        </TextBody>
        <SecondaryHeader>What are the advantages of working with a record label?</SecondaryHeader>
        <TextBody center>
          There are several advantages to working with a label – here are 10 of them:
        </TextBody>
        <ul className={classes.List}>
          {listItemText.map((listItem, i) => (
            <li key={i}>
              <div className={classes.ListItemContainer}>
                <div
                  className={classes.ListItem}
                  onClick={() => onClickHandler(i)}
                  onKeyPress={() => onClickHandler(i)}
                  role="button"
                  tabIndex={0}
                >
                  <Triangle
                    size="small"
                    direction="right"
                    styles={{
                      borderLeftColor: 'var(--bright-blue-color)',
                      transform: showListItem[i] ? 'rotate(90deg)' : '',
                    }}
                  />
                  <div className={classes.ListTitle}>
                    <TertiaryHeader>{listItem.title}</TertiaryHeader>
                  </div>
                </div>
              </div>
              <div
                className={[classes.ListBody, showListItem[i] ? classes.Show : classes.Hide].join(
                  ' '
                )}
              >
                <TextBody center>{listItem.body}</TextBody>
              </div>
            </li>
          ))}
        </ul>
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
      </Layout>
    </>
  )
}
export default aboutUs
