import classes from './NavButton.module.scss'

interface Props {
  onClick: () => void
  checked: boolean
}

const NavButton: React.FC<Props> = (props) => {
  return (
    <>
      <input
        type="checkbox"
        id="navi-toggle"
        className={classes.NavInput}
        onChange={props.onClick}
        checked={props.checked}
      />
      <label htmlFor="navi-toggle" className={classes.NavButton}>
        <span className={classes.NavIcon}>&nbsp;</span>
      </label>
    </>
  )
}

export default NavButton
