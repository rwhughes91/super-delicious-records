import classes from './AdminListItem.module.scss'

interface Props {
  pid: string
  title: string
  onClick?: () => void
}

const AdminListItem: React.FC<Props> = (props) => {
  return (
    <button className={classes.AdminListItem} onClick={props.onClick}>
      <div className={classes.pid}>{props.pid}</div>
      <div className={classes.title}>{props.title}</div>
    </button>
  )
}

export default AdminListItem
