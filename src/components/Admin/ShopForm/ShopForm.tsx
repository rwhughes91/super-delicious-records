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
import { Authenticator } from '@utils/helpers'
import { CREATE_SHOP_ITEM, MUTATE_SHOP_ITEM } from '@queries/index'

interface Props {
  data?: typeDefs.ShopItem
  closeFormOnSubmit: () => void
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>
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

enum shopImageInputHeaders {
  IMAGE = 'Image URL',
  IMAGESET = 'Image Set URL',
  ALT = 'Alt',
  COLOR = 'Color',
}

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

  const { inputs: singleInputs, formState: singleInputsState } = useForm(singleInputState)
  const { inputs: imageInputs, dispatch: imageDispatch, formState: shopImagesState } = useForm({
    images: { value: imageInputState },
  })

  const onSubmitHandler = () => {
    const images = []
    const colors: string[] = []
    for (const imageContainer of shopImagesState.images.value as Field[]) {
      const imageUrl = (imageContainer.value as Field[]).find(
        (item) => item.label === shopImageInputHeaders.IMAGE
      )
      const imageSetUrl = (imageContainer.value as Field[]).find(
        (item) => item.label === shopImageInputHeaders.IMAGESET
      )
      const alt = (imageContainer.value as Field[]).find(
        (item) => item.label === shopImageInputHeaders.ALT
      )
      const color = (imageContainer.value as Field[]).find(
        (item) => item.label === shopImageInputHeaders.COLOR
      )
      if (imageUrl && imageSetUrl && alt && color) {
        if (color.value) {
          colors.push(color.value as string)
        }
        if (imageUrl.value || imageSetUrl.value || alt.value || color?.value) {
          const shopImageInput = new ShopImageInput(
            imageUrl.value as string,
            imageSetUrl.value as string,
            alt.value as string,
            color?.value as string
          )
          shopImageInput.authenticate()
          images.push({
            imageUrl: shopImageInput.imageUrl,
            imageSetUrl: shopImageInput.imageSetUrl,
            alt: shopImageInput.alt,
            color: shopImageInput.color,
          })
        }
      }
    }
    const shopItemInput: typeDefs.ShopItemInput = {
      name: singleInputsState.name.value as string,
      price: parseFloat(singleInputsState.price.value as string),
      description: singleInputsState.description.value as string,
      qtyAvailable: parseFloat(singleInputsState.qtyAvailable.value as string),
      tag: singleInputsState.tag.value as typeDefs.Tag,
      moreInfo: singleInputsState.moreInfo.value as string,
      weight: singleInputsState.weight.value as string,
      colors: colors.length > 0 ? colors : [''],
      images,
    }
    return shopItemInput
  }

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
    <AdminForm
      title="Shop Form"
      onSubmit={onSubmitHandler}
      query={props.data ? MUTATE_SHOP_ITEM : CREATE_SHOP_ITEM}
      pid={props.data && props.data.pid}
      setSuccess={props.setSuccess}
      closeFormOnSubmit={props.closeFormOnSubmit}
    >
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
    label: shopImageInputHeaders.IMAGE,
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
    label: shopImageInputHeaders.IMAGESET,
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
    label: shopImageInputHeaders.ALT,
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
    label: shopImageInputHeaders.COLOR,
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

export class ShopImageInput extends Authenticator implements typeDefs.ShopImageInput {
  NAME = 'Image'
  requiredKeys = ['imageUrl', 'imageSetUrl', 'alt']
  constructor(
    public imageUrl: string,
    public imageSetUrl: string,
    public alt: string,
    public color?: string
  ) {
    super()
  }
}
