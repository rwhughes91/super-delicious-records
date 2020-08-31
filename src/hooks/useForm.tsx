import { useReducer, Dispatch } from 'react'
import formValidation, { Rules } from '@utils/formValidation'
import { Props as InputProps } from '@components/UI/Inputs/Input/Input'

interface Action {
  type: string
  key: string
  value: string
}

interface Base {
  formIsInvalid: boolean
  [key: string]: InputProps | boolean
}

export default function useForm<T>(initialState: T & Base): [T & Base, Dispatch<Action>] {
  const reducer = (state: T & Base, action: Action) => {
    switch (action.type) {
      case 'toggleInvalid': {
        const invalid = !(state[action.key] as InputProps).invalid
        const formIsInvalid = isFormInvalid(state, action.key, invalid)
        return {
          ...state,
          [action.key]: {
            ...(state[action.key] as InputProps),
            invalid,
          },
          formIsInvalid,
        }
      }
      case 'change': {
        let invalid
        let errorMessage
        if (action.key === 'confirmPassword') {
          const confirmPasswordValidation: Rules = {
            required: true,
            equal: [(state['password'] as InputProps).value as string, 'Does not equal password'],
          }
          const [valid, errorMessageStr] = formValidation(action.value, confirmPasswordValidation)
          invalid = !valid
          errorMessage = errorMessageStr
        } else {
          const [valid, errorMessageStr] = formValidation(
            action.value,
            (state[action.key] as InputProps).validation as Rules
          )
          invalid = !valid
          errorMessage = errorMessageStr
        }
        const newState: T & Base = {
          ...state,
          [action.key]: {
            ...(state[action.key] as InputProps),
            value: action.value,
            touched: true,
            invalid,
            errorMessage,
          },
        }
        const formIsInvalid = isFormInvalid(newState, action.key, invalid)
        return {
          ...newState,
          formIsInvalid,
        }
      }
      default:
        return state
    }
  }

  return useReducer(reducer, initialState)
}

export function isFormInvalid(state: any, actionKey: string, invalid: boolean): boolean {
  let formIsInvalid = false
  for (const key in state) {
    if (key === actionKey) {
      formIsInvalid = invalid || formIsInvalid
    } else {
      formIsInvalid = (state[key].invalid as boolean) || formIsInvalid
    }
  }
  return formIsInvalid
}
