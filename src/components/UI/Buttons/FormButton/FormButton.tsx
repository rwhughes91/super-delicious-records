import React, { useEffect } from 'react'
import classes from './FormButton.module.scss'

interface Props {
  children: string | JSX.Element
  disabled?: boolean
  styles?: React.CSSProperties
  onClick?: () => void
  loading?: boolean
  successOnClick?: boolean
  successOnClickMessage?: string
  errorOnClick?: boolean
  errorOnClickMessage?: string
}

const FormButton: React.FC<Props> = (props) => {
  const classNames = [classes.FormButton]
  if (props.successOnClick) {
    classNames.push(classes.Success)
  }
  if (props.errorOnClick) {
    classNames.push(classes.Error)
  }
  let output = props.children
  if (props.errorOnClick) {
    output = props.errorOnClickMessage || 'Error'
  }
  if (props.successOnClick) {
    output = (
      <div className={classes.Success}>
        <svg className={classes.CheckMark} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle className={classes.CheckMarkCircle} cx="26" cy="26" r="25" fill="none" />
          <path className={classes.CheckMarkCheck} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
        </svg>
        <span>{props.successOnClickMessage || 'Added to Cart'}</span>
      </div>
    )
  }
  if (props.loading) {
    output = <div className={classes.Loading} />
  }
  return (
    <button
      style={props.styles}
      disabled={props.disabled}
      className={classNames.join(' ')}
      onClick={props.onClick}
    >
      {output}
    </button>
  )
}

export default React.memo(FormButton)

export const FormButtonClass = classes.FormButton
