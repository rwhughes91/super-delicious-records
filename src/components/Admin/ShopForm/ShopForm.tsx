import useForm, { isKey, types } from '../hooks/useAdminForm'
import { Props as ShopProps } from '../../../pages/shop/[pid]'
import { cloneDeep } from 'lodash'
import AdminFieldSet from '../AdminFieldSet/AdminFieldSet'
import AdminForm from '../AdminForm/AdminForm'

interface Props {
  data?: ShopProps
}

const ShopForm: React.FC<Props> = (props) => {
  const initialFormState = cloneDeep(initialState)

  if (props.data) {
    for (const key in initialFormState) {
      if (isKey(key, initialFormState)) {
        initialFormState[key].value = props.data[key].toString() ?? ''
      }
    }
  }
  const { inputs } = useForm(initialFormState)

  return (
    <AdminForm title="Shop Form">
      <AdminFieldSet inputs={inputs} />
    </AdminForm>
  )
}

export default ShopForm

const initialState = {
  name: {
    value: '',
    type: types.INPUT,
    invalid: false,
    touched: false,
    errorMessage: '',
    label: 'Name',
    required: true,
    elementConfig: {
      placeholder: 'Name',
      type: 'text',
    },
  },
  imageUrl: {
    value: '',
    type: types.INPUT,
    invalid: false,
    touched: false,
    errorMessage: '',
    label: 'Image',
    required: true,
    elementConfig: {
      placeholder: 'Image',
      type: 'text',
    },
  },
  imageSetUrl: {
    value: '',
    type: types.INPUT,
    invalid: false,
    touched: false,
    errorMessage: '',
    required: true,
    label: 'Image Set Url',
    elementConfig: {
      placeholder: 'Image Set URL',
      type: 'text',
    },
  },
  price: {
    value: '',
    type: types.INPUT,
    invalid: false,
    touched: false,
    errorMessage: '',
    label: 'Price',
    required: true,
    elementConfig: {
      placeholder: 'Price',
      type: 'number',
    },
  },
}
