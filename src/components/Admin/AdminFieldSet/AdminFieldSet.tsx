import classes from './AdminFieldSet.module.scss'

interface Props {
  inputs: JSX.Element[]
  title?: string
  buttonOnClick?: () => void
  relative?: boolean
  optional?: boolean
}

const AdminField: React.FC<Props> = (props) => {
  const classNames = [classes.AppendButton]
  if (props.relative) {
    classNames.push(classes.Relative)
  }
  return (
    <div className={classes.AdminFieldSet}>
      {props.title && (
        <div className={classes.AdminFieldSetHeader}>
          <p className={classes.Title}>
            {props.title}
            {props.optional && (
              <span style={{ fontSize: '1.4rem', color: 'var(--light-purple-color)' }}>
                {' '}
                (Optional)
              </span>
            )}
          </p>
          {props.buttonOnClick && (
            <button className={classNames.join(' ')} onClick={props.buttonOnClick} type="button">
              Add
            </button>
          )}
        </div>
      )}
      {props.inputs}
    </div>
  )
}

export default AdminField
