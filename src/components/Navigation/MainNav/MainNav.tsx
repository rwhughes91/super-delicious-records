import classes from './MainNav.module.scss'
import NavItems from '../NavItems/NavItems'
import SideNav from '../SideNav/SideNav'

const Navigation: React.FC = () => {
  return (
    <>
      <div className={classes.MainNav}>
        <div className={classes.SecondaryNavBarContainer}>
          <div className={classes.SecondaryNavBar}>
            <NavItems color="purple" icons="only" />
          </div>
        </div>
        <div className={classes.MainNavBarContainer}>
          <div className={classes.MainNavBar}>
            <NavItems color="white" icons={false} />
          </div>
        </div>
      </div>
      <SideNav />
    </>
  )
}

export default Navigation
