import classes from './HomeNav.module.scss'
import NavItems from '../NavItems/NavItems'
import SideNav from '../SideNav/SideNav'

const HomeNav: React.FC = () => {
  return (
    <>
      <div className={classes.Navbar}>
        <NavItems color="purple" icons />
      </div>
      <SideNav home />
    </>
  )
}

export default HomeNav
