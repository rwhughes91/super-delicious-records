import classes from './Home.module.scss'
import Layout from '../Layout/Layout'
import Button from '../UI/Button/Button'
import ScrollWidget from '../UI/ScrollWidget/ScrollWidget'
import HomeNav from '../Navigation/HomeNav/HomeNav'

const Home: React.FC = () => {
  return (
    <Layout>
      <HomeNav />
      <div className={classes.Hero}>
        <img
          className={classes.HeroImage}
          src="/images/sdr-logo-primary.png"
          alt="Super Delicious Records"
          unselectable="on"
        />
        <div className={classes.Button}>
          <Button color="purple" href="/">
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
