import React from 'react'
import useForm, {
  State,
  Field,
  createFormStateArrayOfObjects,
  actions,
} from '../hooks/useAdminForm'
import AdminFieldSet from '../AdminFieldSet/AdminFieldSet'
import AdminForm from '../AdminForm/AdminForm'
import * as typeDefs from '@generated/graphql'
import { inputTypes as types } from '@components/UI/Inputs/Input/Input'
import { cloneDeep } from 'lodash'
import { useCallback } from 'react'

interface Props {
  data?: typeDefs.ShopItem
}

enum sectionHeaders {
  IMAGES = 'Images',
}

type SingleInputs =
  | 'name'
  | 'price'
  | 'description'
  | 'moreInfo'
  | 'weight'
  | 'qtyAvailable'
  | 'tag'

const singleInputKeys: SingleInputs[] = [
  'name',
  'price',
  'description',
  'moreInfo',
  'weight',
  'qtyAvailable',
  'tag',
]

const ShopForm: React.FC<Props> = (props) => {
  const singleInputState = cloneDeep(mainInputsConfig)
  let imageInputState: { value: Field[]; sectionHeader?: string }[] = [
    {
      value: [
        { ...imageConfig.imageUrl },
        { ...imageConfig.imageSetUrl },
        { ...imageConfig.alt },
        { ...imageConfig.color },
      ],
    },
  ]

  if (props.data) {
    imageInputState = []

    for (const key of singleInputKeys) {
      singleInputState[key].value = (props.data[key] ?? '').toString()
    }
    if (props.data.images) {
      imageInputState = createFormStateArrayOfObjects(
        props.data.images,
        imageConfig,
        sectionHeaders.IMAGES
      )
    }
  }

  const { inputs: singleInputs } = useForm(singleInputState)
  const { inputs: imageInputs, dispatch: imageDispatch } = useForm({
    images: { value: imageInputState },
  })

  const appendImageHandler = useCallback(() => {
    imageDispatch({
      type: actions.APPEND,
      key: 'images',
      value: {
        value: [
          { ...imageConfig.imageUrl },
          { ...imageConfig.imageSetUrl },
          { ...imageConfig.alt },
          { ...imageConfig.color },
        ],
        sectionHeader: sectionHeaders.IMAGES,
      },
    })
  }, [imageDispatch])

  return (
    <AdminForm title="Shop Form">
      <>
        <AdminFieldSet inputs={singleInputs} />
        <AdminFieldSet title="Images" inputs={imageInputs} buttonOnClick={appendImageHandler} />
      </>
    </AdminForm>
  )
}

export default React.memo(ShopForm)

const imageConfig: State<Required<typeDefs.ShopImageInput>> = {
  imageUrl: {
    value: '',
    type: types.INPUT,
    invalid: false,
    touched: false,
    errorMessage: '',
    label: 'Image URL',
    warning: 'true',
    elementConfig: {
      placeholder: 'Src',
      type: 'text',
    },
  },
  imageSetUrl: {
    value: '',
    type: types.INPUT,
    invalid: false,
    touched: false,
    errorMessage: '',
    label: 'Image Set URL',
    warning: 'true',
    elementConfig: {
      placeholder: 'Src',
      type: 'text',
    },
  },
  alt: {
    value: '',
    type: types.INPUT,
    invalid: false,
    touched: false,
    errorMessage: '',
    label: 'Alt',
    warning: 'true',
    elementConfig: {
      placeholder: 'Alt',
      type: 'text',
    },
  },
  color: {
    value: '',
    type: types.INPUT,
    invalid: false,
    touched: false,
    errorMessage: '',
    label: 'Color',
    warning: 'true',
    elementConfig: {
      placeholder: 'Color',
      type: 'text',
    },
  },
}

const mainInputsConfig: State<Pick<Required<typeDefs.ShopItemInput>, SingleInputs>> = {
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
  description: {
    value: '',
    type: types.TEXT,
    invalid: false,
    touched: false,
    errorMessage: '',
    label: 'Description',
    required: true,
    elementConfig: {
      placeholder: 'Description',
      type: 'text',
    },
  },
  moreInfo: {
    value: '',
    type: types.INPUT,
    invalid: false,
    touched: false,
    errorMessage: '',
    label: 'More Info',
    elementConfig: {
      placeholder: 'More Info',
      type: 'text',
    },
  },
  weight: {
    value: '',
    type: types.INPUT,
    invalid: false,
    touched: false,
    errorMessage: '',
    label: 'Weight',
    elementConfig: {
      placeholder: 'Weight',
      type: 'text',
    },
  },
  qtyAvailable: {
    value: '',
    type: types.INPUT,
    invalid: false,
    touched: false,
    errorMessage: '',
    label: 'Qty Available',
    required: true,
    elementConfig: {
      placeholder: 'Qty Available',
      type: 'number',
    },
  },
  tag: {
    value: '',
    type: types.SELECT,
    invalid: false,
    touched: false,
    errorMessage: '',
    label: 'TAG',
    required: true,
    elementConfig: {
      placeholder: 'Tag',
      type: 'text',
      options: [
        { displayValue: 'Hat', value: typeDefs.Tag.Hat },
        { displayValue: 'Shirt', value: typeDefs.Tag.Shirt },
        { displayValue: 'Swag', value: typeDefs.Tag.Swag },
      ],
    },
  },
}
