import classes from './Home.module.scss'
import Layout from '../Layout/Layout'
import Button from '../UI/Button/Button'
import ScrollWidget from '../UI/ScrollWidget/ScrollWidget'
import NavItems from '../Navigation/NavItems/NavItems'

const Home: React.FC = () => {
  return (
    <Layout>
      <div className={classes.Navbar}>
        <NavItems color="purple" icons={false} />
      </div>
      <div className={classes.Hero}>
        <img
          className={classes.HeroImage}
          src="/images/sdr-logo-primary.png"
          alt="Super Delicious Records"
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
