import classes from './Home.module.scss'
import Layout from '../../Layout/Layout'
import Button from '../../UI/Button/Button'
import ScrollWidget from '../../UI/ScrollWidget/ScrollWidget'

const Home: React.FC = () => {
  return (
    <Layout pageType="home">
      <div className={classes.Hero}>
        <img
          className={classes.HeroImage}
          src="/images/sdr-logo-primary.png"
          alt="Super Delicious Records"
          unselectable="on"
        />
        <div className={classes.Button}>
          <Button color="purple" href="/about-us">
            Learn More
          </Button>
        </div>
      </div>
      <div className={classes.MouseContainer}>
        <ScrollWidget />
      </div>
    </Layout>
  )
}

export default Home
