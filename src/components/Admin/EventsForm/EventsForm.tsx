import React from 'react'
import useForm, { convertDate } from '../hooks/useAdminForm'
import { cloneDeep } from 'lodash'
import AdminFieldSet from '../AdminFieldSet/AdminFieldSet'
import AdminForm from '../AdminForm/AdminForm'
import * as typeDefs from '@generated/graphql'
import { isKey } from '@utils/helpers'
import { inputTypes as types } from '@components/UI/Inputs/Input/Input'
import { CREATE_EVENT, MUTATE_EVENT } from '@queries/index'

interface Props {
  data?: typeDefs.Event
  closeFormOnSubmit: () => void
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>
}

const EventsForm: React.FC<Props> = (props) => {
  const initialFormState = cloneDeep(initialState)

  if (props.data) {
    for (const key in initialFormState) {
      if (isKey(key, initialFormState)) {
        if (key === 'date') {
          initialFormState[key].value = convertDate(props.data[key]) ?? ''
        } else {
          initialFormState[key].value = props.data[key] ?? ''
        }
      }
    }
  }

  const { inputs, formState } = useForm(initialFormState)

  const onSubmitHandler = () => {
    const eventInput: typeDefs.EventInput = {
      date: formState.date.value as string,
      title: formState.title.value as string,
      description: formState.description.value as string,
      url: formState.url.value as string,
      endDate: formState.endDate.value as string,
      location: formState.location.value as string,
    }
    return eventInput
  }

  return (
    <AdminForm
      title="Events Form"
      onSubmit={onSubmitHandler}
      query={props.data ? MUTATE_EVENT : CREATE_EVENT}
      pid={props.data && props.data.pid}
      setSuccess={props.setSuccess}
      closeFormOnSubmit={props.closeFormOnSubmit}
    >
      <AdminFieldSet inputs={inputs} />
    </AdminForm>
  )
}

export default React.memo(EventsForm)

const initialState = {
  date: {
    value: '',
    type: types.INPUT,
    invalid: false,
    touched: false,
    errorMessage: '',
    label: 'Date',
    required: true,
    elementConfig: {
      placeholder: 'Date',
      type: 'date',
    },
  },
  endDate: {
    value: '',
    type: types.INPUT,
    invalid: false,
    touched: false,
    errorMessage: '',
    label: 'End Date',
    elementConfig: {
      placeholder: 'End Date',
      type: 'date',
    },
  },
  title: {
    value: '',
    type: types.INPUT,
    invalid: false,
    touched: false,
    errorMessage: '',
    label: 'Title',
    required: true,
    elementConfig: {
      placeholder: 'Title',
      type: 'text',
    },
  },
  description: {
    value: '',
    type: types.TEXT,
    invalid: false,
    touched: false,
    errorMessage: '',
    label: 'Description',
    elementConfig: {
      placeholder: 'Description',
      type: 'text',
    },
  },
  url: {
    value: '',
    type: types.INPUT,
    invalid: false,
    touched: false,
    errorMessage: '',
    label: 'URL',
    elementConfig: {
      placeholder: 'URL',
      type: 'text',
    },
  },
  location: {
    value: '',
    type: types.INPUT,
    invalid: false,
    touched: false,
    errorMessage: '',
    label: 'Location',
    elementConfig: {
      placeholder: 'Location',
      type: 'text',
    },
  },
}
