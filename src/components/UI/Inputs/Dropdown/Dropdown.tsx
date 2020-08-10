import classes from './Dropdown.module.scss'

interface Props {
  children: JSX.Element
  value: string
  onBlur: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const Dropdown: React.FC<Props> = (props) => {
  return (
    <div className={classes.DropdownContainer}>
      <div className={classes.DropdownCaret} />
      <select className={classes.Dropdown} {...props}>
        {props.children}
      </select>
    </div>
  )
}

export default Dropdown
