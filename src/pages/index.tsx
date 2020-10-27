import { useCallback, DragEvent } from 'react'
import Head from 'next/head'
import classes from '@styles/pages/Home.module.scss'
import Layout from '@components/Layout/Layout'
import Button from '@components/UI/Buttons/Button/Button'

const HomePage: React.FC = () => {
  const onDragHandler = useCallback((event: DragEvent<HTMLImageElement>) => {
    event.preventDefault()
  }, [])

  return (
    <>
      <Head>
        <title>Super Delicious Records</title>
      </Head>
      <Layout pageType="home">
        <div className={classes.Hero}>
          <img
            className={classes.HeroImage}
            src="/images/sdr-logo-primary.png"
            alt="Super Delicious Records"
            unselectable="on"
            onDragStart={onDragHandler}
          />
          <div className={classes.Button}>
            <Button size="xlarge" color="purple" href="/about-us">
              Learn More
            </Button>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default HomePage
