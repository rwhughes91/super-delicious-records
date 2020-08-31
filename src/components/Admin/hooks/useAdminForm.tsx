import { useState, useReducer, useCallback, ChangeEvent, Dispatch } from 'react'
import AdminInput, { ElementConfig } from '../../UI/Inputs/AdminInput/AdminInput'
import { difference } from 'lodash'
import { DateTime } from 'luxon'

import { inputTypes } from '../../UI/Inputs/Input/Input'

export enum actions {
  UPDATE = 'UPDATE_VALUE',
  RESET = 'RESET',
  APPEND = 'APPEND',
}

interface Action<T> {
  type: actions
  key: keyof T
  value: string | Field
  index?: number[]
  innerKeys?: (string | number | symbol)[]
}

export interface Field {
  value: string | Field | Field[]
  sectionHeader?: string
  type?: inputTypes
  elementConfig?: ElementConfig
  label?: string
  invalid?: boolean
  touched?: boolean
  errorMessage?: string
  required?: boolean
  key?: string
  warning?: string
  [key: string]: Field | Field[] | ElementConfig | string | boolean | undefined
}

export type State<T> = {
  [P in keyof T]: Field
}

const useForm = <T extends unknown>(
  initialState: State<T>,
  group = false
): { inputs: JSX.Element[]; formState: State<T>; dispatch: Dispatch<Action<State<T>>> } => {
  const [order] = useState<Array<keyof T>>(Object.keys(initialState) as Array<keyof T>)
  const reducer = useCallback(
    (state: State<T>, action: Action<typeof initialState>) => {
      switch (action.type) {
        case actions.UPDATE: {
          return {
            ...state,
            [action.key]: updateValues(state[action.key], action.value as string, action.index),
          }
        }
        case actions.APPEND:
          if (!Array.isArray(state[action.key].value)) {
            throw new Error(`${state[action.key]} is not an array type. On key: ${action.key}`)
          }
          return {
            ...state,
            [action.key]: {
              ...state[action.key],
              value: appendValue(state[action.key].value as Field[], action.value as Field),
            },
          }
        case actions.RESET:
          return initialState
        default:
          return state
      }
    },
    [initialState]
  )

  const [formState, dispatch] = useReducer(reducer, initialState)

  const onChangeHandler = useCallback(
    (key: keyof typeof formState, value: string, index?: number[]) => {
      dispatch({ type: actions.UPDATE, key, value, index })
    },
    [formState]
  )

  const spreadFormFields = useCallback(
    (formField: Field, fieldKey: keyof typeof formState, group = true, index?: number[]): any => {
      const fields = []
      if (Array.isArray(formField.value)) {
        const subFields = []
        for (const key in formField.value) {
          subFields.push(
            spreadFormFields(
              formField.value[key],
              fieldKey,
              false,
              index ? [...index, parseInt(key)] : [parseInt(key)]
            )
          )
        }
        fields.push(
          <fieldset key={`${fieldKey} container array`}>
            {formField.sectionHeader && <legend>{formField.sectionHeader}</legend>}
            {subFields}
          </fieldset>
        )
      } else if (typeof formField.value === 'object') {
        const subFields = []
        for (const key in formField.value) {
          subFields.push(spreadFormFields(formField.value[key] as Field, fieldKey, false, index))
        }
        fields.push(
          group ? <fieldset key={`${fieldKey} container object`}>{subFields}</fieldset> : subFields
        )
      } else {
        fields.push(
          <AdminInput
            key={fieldKey as string}
            {...formField}
            type={formField.type ?? inputTypes.INPUT}
            value={formField.value as string}
            elementConfig={formField.elementConfig ?? { placeholder: '', type: 'input' }}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              onChangeHandler(fieldKey, event?.target.value, index)
            }
          />
        )
      }
      return fields
    },
    [formState, onChangeHandler]
  )

  const inputs = []
  for (const key of order) {
    inputs.push(spreadFormFields(formState[key], key, group))
  }

  return { inputs, formState, dispatch }
}

export default useForm

function appendValue(array: Field[], value: Field): Field[] {
  return array.concat(value)
}

function updateValues(field: Field, value: string, index?: number[], indexStart = 0): Field {
  const newField = {
    ...field,
  }
  if (Array.isArray(newField.value)) {
    if (index === undefined) throw new Error('Must use an index for array value types')
    if (index[indexStart] >= newField.value.length) throw new Error('Index outside the array range')
    newField.value[index[indexStart]] = updateValues(
      newField.value[index[indexStart]],
      value,
      index,
      indexStart + 1
    )
  } else if (typeof newField.value === 'object') {
    newField.value = updateValues(newField.value as Field, value, index)
  } else {
    newField.value = value
    newField.touched = true
  }
  return newField
}

export function isKey<T>(x: string | number | symbol, y: T): x is keyof T {
  return x in y
}

export function convertDate(x: string): string {
  const date = new Date(x)
  const dt = DateTime.fromISO(date.toISOString())
  return dt.toFormat('yyyy-MM-dd')
}

export function createFormStateArrayOfObjects<T>(
  dataArray: any[],
  config: State<T>,
  sectionHeader?: string
): {
  value: Field[]
}[] {
  const newFormState = []
  for (const formObj of dataArray) {
    const newObj: { value: Field[]; sectionHeader?: string } = { value: [], sectionHeader }
    for (const subKey in formObj) {
      if (isKey(subKey, config)) {
        newObj.value.push({
          ...config[subKey],
          value: formObj[subKey],
        })
      } else {
        throw new Error(`Key ${subKey} is not in the config object`)
      }
    }
    const toAdd = appendMissingConfigKeys(config, formObj)
    newObj.value = newObj.value.concat(toAdd)
    newFormState.push(newObj)
  }
  return newFormState
}

export function appendMissingConfigKeys<T>(config: State<T>, formObj: any): Field[] {
  const newObj = []
  const keysToAdd = difference(Object.keys(config), Object.keys(formObj))
  for (const configKeyToAdd of keysToAdd) {
    if (isKey(configKeyToAdd, config)) {
      newObj.push({
        ...config[configKeyToAdd],
      })
    } else {
      throw new Error('Calculating diff column did not work')
    }
  }
  return newObj
}

export function createFormStateArrayOfStrings<T>(dataArray: string[], config: T): Field[] {
  const newFormState = []
  for (const primValue of dataArray) {
    newFormState.push({ ...config, value: primValue })
  }
  return newFormState
}
