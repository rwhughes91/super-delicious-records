import classes from './HomeNav.module.scss'
import NavItems from '../NavItems/NavItems'

const HomeNav: React.FC = () => {
  return (
    <div className={classes.Navbar}>
      <NavItems color="purple" icons />
    </div>
  )
}

export default HomeNav
