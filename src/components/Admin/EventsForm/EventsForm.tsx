import useForm, { convertDate, isKey, types } from '../hooks/useAdminForm'
import { Props as EventProps } from '../../../pages/events'
import { cloneDeep } from 'lodash'
import AdminFieldSet from '../AdminFieldSet/AdminFieldSet'
import AdminForm from '../AdminForm/AdminForm'

interface Props {
  data?: EventProps
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

  const { inputs } = useForm(initialFormState)

  return (
    <AdminForm title="Events Form">
      <AdminFieldSet inputs={inputs} />
    </AdminForm>
  )
}

export default EventsForm

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
