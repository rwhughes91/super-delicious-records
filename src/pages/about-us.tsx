import Head from 'next/head'
import classes from '@styles/pages/AboutUs.module.scss'
import Layout from '@components/Layout/Layout'
import PrimaryHeader from '@components/UI/Headers/PrimaryHeader/PrimaryHeader'
import SecondaryHeader from '@components/UI/Headers/SecondaryHeader/SecondaryHeader'
import TextBody from '@components/UI/TextBody/TextBody'
import SubmissionPolicy from '@components/SubmissionPolicy/SubmissionPolicy'
import Body from '@components/Layout/Body'
import ListItem from '@components/UI/ListItem/ListItem'
import AboutCard from '@components/UI/AboutCard/AboutCard'
import GenreCarousel from '@components/GenreCarousel/GenreCarousel'

const listItemText = [
  {
    title: 'Record Labels Provide Promotions, Marketing Plans, and Marketing Materials',
    body: `There’s not enough time to do everything on your own. With a record label, you get
      expertise working for you with years of experience in promotions, marketing, and
      branding. The experts know the dos and don’ts of building artists, and are able to
      assist with marketing collateral and strategies to expand your audience and grow your
      fanbase.`,
  },
  {
    title: 'Record Labels Have the Resources to Promote Material Properly',
    body: `You can spend a lot of time and money promoting music and have very little to show for
    it at the end of the day. Record labels have the tried and true experience to get the
    best return on the promotional dollars spent to maximize the artists’ exposure.`,
  },
  {
    title: 'Record Labels Provide Support for Videos and Photoshoots',
    body: `Music videos are one the most important promotional tools available, but they can be
    expensive and time consuming to make. Additionally, professional photos are must for
    any EPK. A record label has the resources to streamline these processes and to be able
    to build for you the look you want, and at a fraction of the cost.`,
  },
  {
    title: 'Record Labels Have Booking and Touring Resources',
    body: `Record labels maintain relationships with professionals throughout the industry. This
    is especially important when it comes to booking agents, tour managers, and tour
    support. The right shows, with the right payment, and a solid support team is what it
    takes to make a tour both productive and successful.`,
  },
  {
    title: `Record Labels have Greater Access to Media Outlets Including Magazines, Radio,
    Podcasts and Blogs`,
    body: `Record labels have more sway, more contacts, and can offer their artists more
    opportunity. Many outlets don’t deal directly with artists at all, and even those that
    do give priority to record labels. They know that labels are more professional, more
    focused and have already vetted the artists. Record labels have rapport with their
    contacts and the inherent trust provides preferential opportunities.`,
  },
  {
    title: 'Record Labels Can Help with Production Costs',
    body: `It’s easier than ever to self-record, but modern production standards still require
    professional expertise to stand out from the crowd. Record labels have access to the
    professionals and resources necessary to achieve top quality, without the guesswork.`,
  },
  {
    title: 'Record Labels Give you the Opportunity to be A Part of a Community',
    body: `When one artist succeeds the entire record label family benefits. Upon joining a
    record label, you immediately become associated with that label’s artists, get the
    benefits of that exposure, and the credibility from it as well. This translates to
    better touring opportunities, lower overhead from shared resources, better promotional
    opportunities and greater exposure. Every label-mate enjoys the same industry clout
    just by being label-mates. Don’t underestimate how valuable this can be.`,
  },
  {
    title: 'Record Labels Provide Industry Guidance and Business Acumen',
    body: `Electronic distribution is easier than it ever has been, but how do you make the most
    of it? Record labels understand the metrics, how to leverage multiple distribution
    channels, and how to capitalize on the markets that are popping.`,
  },
  {
    title: 'Record Labels Can Provide Support for Hard Media and Other Tour Essentials',
    body: `Touring is essential for promoting your music, but there’s a lot that goes into it
    before the tour begins. Sale-able goods such as CD’s, vinyl, T-shirts and other swag
    need to be produced before the tour. Tour essentials such as signage, lights, trusses,
    sales and inventory tools, etc. – the needs are extensive. Record labels have the
    resources, contacts and knowledge to ensure that tour prep – and the tour – goes
    smoothly and is successful.`,
  },
  {
    title: 'Record Labels Have Contacts and Resources Throughout the Industry',
    body: `Record Labels are in contact with every facet of the industry. Years of relationship
    building leads to solid rapport with trusted contacts that can be called upon as
    needed. If the label can’t do something itself, they know someone who can do it, and
    do it well.`,
  },
]

const AboutUs: React.FC = () => {
  const bannerStyles = {
    backgroundColor: 'var(--dark-purple-color)',
    opacity: 0.75,
  }
  return (
    <>
      <Head>
        <title>About Us | Super Delicious Records</title>
      </Head>
      <Layout pageType="main">
        <PrimaryHeader>About Us</PrimaryHeader>
        <Body>
          <div style={bannerStyles}>
            <SecondaryHeader
              styles={{
                color: 'var(--tan-white-color)',
                padding: '3px 0',
              }}
            >
              Super Delicious Records is a different kind of record label.
            </SecondaryHeader>
          </div>
          <div className={classes.Cards}>
            <AboutCard type="part" />
            <AboutCard type="exp" />
            <AboutCard type="world" />
          </div>
          <GenreCarousel genres={['Metal', 'Punk', 'Rock']} />
          <PrimaryHeader>About Record Labels</PrimaryHeader>
          <SecondaryHeader styles={{ color: 'var(--dark-purple-color)' }}>
            Why do you need a record label?
          </SecondaryHeader>
          <TextBody center>
            The truth is you don’t. But you probably want a Record label… Record labels handle the
            business end of the music business – freeing your time to write, record, and perform.
            Indie labels play a fundamental role in developing and establishing artists, ultimately
            preparing them for the next level.
          </TextBody>
          <SecondaryHeader styles={{ color: 'var(--dark-purple-color)' }}>
            What are the advantages of working with a record label?
          </SecondaryHeader>
          <TextBody center>
            <ul className={classes.List}>
              {listItemText.map((listItem, i) => (
                <ListItem key={i} body={listItem.body} title={listItem.title} />
              ))}
            </ul>
          </TextBody>
          <SubmissionPolicy />
        </Body>
      </Layout>
    </>
  )
}
export default AboutUs
