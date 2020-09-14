import React from 'react'
import { useCallback } from 'react'
import useForm, {
  createFormStateArrayOfObjects,
  createFormStateArrayOfStrings,
  convertDate,
  Field,
  State,
  actions,
} from '../hooks/useAdminForm'
import { cloneDeep } from 'lodash'
import AdminFieldSet from '../AdminFieldSet/AdminFieldSet'
import AdminForm from '../AdminForm/AdminForm'
import * as typeDefs from '@generated/graphql'
import { inputTypes as types } from '@components/UI/Inputs/Input/Input'
import { Authenticator } from '@utils/helpers'
import { CREATE_NEWS_ITEM, MUTATE_NEWS_ITEM } from '@queries/index'

interface Props {
  data?: typeDefs.NewsItem
  closeFormOnSubmit: () => void
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>
}

enum sectionHeaders {
  LINKS = 'Link',
  VIDEO = 'Video',
}

enum videoHeaders {
  SRC = 'Video Src',
  HEADER = 'Header',
}

enum linkHeaders {
  SRC = 'Source',
  HEADER = 'Header',
  BTNTEXT = 'Button Text',
}

type SingleInputs = 'title' | 'shortTitle' | 'imageUrl' | 'date'

const singleInputKeys: SingleInputs[] = ['title', 'shortTitle', 'imageUrl', 'date']

const NewsForm: React.FC<Props> = (props) => {
  const singleInputState = cloneDeep(mainInputsConfig)
  let descriptionInput = [{ ...descriptionConfig }]
  let videoInputState: { value: Field[]; sectionHeader?: string }[] = [
    {
      value: [{ ...videoConfig.src }, { ...videoConfig.title }],
      sectionHeader: sectionHeaders.VIDEO,
    },
  ]
  let linkInputState: { value: Field[]; sectionHeader?: string }[] = [
    {
      value: [{ ...linkConfig.src }, { ...linkConfig.header }, { ...linkConfig.buttonText }],
      sectionHeader: sectionHeaders.LINKS,
    },
  ]

  if (props.data) {
    descriptionInput = []
    videoInputState = []
    linkInputState = []

    for (const key of singleInputKeys) {
      if (key === 'date') {
        singleInputState[key].value = convertDate(props.data[key]) ?? ''
      } else {
        singleInputState[key].value = props.data[key] ?? ''
      }
    }
    if (props.data.description) {
      descriptionInput = createFormStateArrayOfStrings(props.data.description, descriptionConfig)
    }

    if (props.data.videos) {
      videoInputState = createFormStateArrayOfObjects(
        props.data.videos,
        videoConfig,
        sectionHeaders.VIDEO
      )
    }
    if (props.data.links) {
      linkInputState = createFormStateArrayOfObjects(
        props.data.links,
        linkConfig,
        sectionHeaders.LINKS
      )
    }
  }

  const { inputs: singleInputs, formState: singleInputsState } = useForm(singleInputState)
  const {
    inputs: descriptionInputs,
    dispatch: descriptionDispatch,
    formState: descriptionsState,
  } = useForm({
    description: { value: descriptionInput },
  })
  const { inputs: videoInputs, dispatch: videoDispatch, formState: videosState } = useForm({
    videos: { value: videoInputState },
  })
  const { inputs: linkInputs, dispatch: linkDispatch, formState: linksState } = useForm({
    links: { value: linkInputState },
  })

  const onSubmitHandler = () => {
    const descriptions: string[] = []
    for (const description of descriptionsState.description.value as Field[]) {
      if (description.value) {
        descriptions.push(description.value as string)
      }
    }
    const videos = []
    for (const videoContainer of videosState.videos.value as Field[]) {
      const src = (videoContainer.value as Field[]).find((item) => item.label === videoHeaders.SRC)
      const header = (videoContainer.value as Field[]).find(
        (item) => item.label === videoHeaders.HEADER
      )
      if (src && header) {
        if (src.value || header.value) {
          const videoInput = new VideoInput(src.value as string, header.value as string)
          videoInput.authenticate()
          videos.push({ src: videoInput.src, title: videoInput.title })
        }
      }
    }
    const links = []
    for (const linkContainer of linksState.links.value as Field[]) {
      const source = (linkContainer.value as Field[]).find((item) => item.label === linkHeaders.SRC)
      const header = (linkContainer.value as Field[]).find(
        (item) => item.label === linkHeaders.HEADER
      )
      const buttonText = (linkContainer.value as Field[]).find(
        (item) => item.label === linkHeaders.BTNTEXT
      )
      if (source && header && buttonText) {
        if (source.value || header.value || buttonText.value) {
          const linkInput = new LinkInput(
            header.value as string,
            source.value as string,
            buttonText.value as string
          )
          linkInput.authenticate()
          links.push({
            header: linkInput.header,
            src: linkInput.src,
            buttonText: linkInput.buttonText,
          })
        }
      }
    }
    const newsInput: typeDefs.NewsInput = {
      title: singleInputsState.title.value as string,
      shortTitle: singleInputsState.shortTitle.value as string,
      imageUrl: singleInputsState.imageUrl.value as string,
      date: singleInputsState.date.value as string,
      description: descriptions,
      videos,
      links,
    }
    return newsInput
  }

  const appendDescriptionHandler = useCallback(() => {
    descriptionDispatch({
      type: actions.APPEND,
      key: 'description',
      value: { ...descriptionConfig, required: false },
    })
  }, [descriptionDispatch])
  const appendVideoHandler = useCallback(() => {
    videoDispatch({
      type: actions.APPEND,
      key: 'videos',
      value: {
        value: [{ ...videoConfig.src }, { ...videoConfig.title }],
        sectionHeader: sectionHeaders.VIDEO,
      },
    })
  }, [videoDispatch])
  const appendLinkHandler = useCallback(() => {
    linkDispatch({
      type: actions.APPEND,
      key: 'links',
      value: {
        value: [{ ...linkConfig.src }, { ...linkConfig.header }, { ...linkConfig.buttonText }],
        sectionHeader: sectionHeaders.LINKS,
      },
    })
  }, [linkDispatch])

  return (
    <AdminForm
      title="News Form"
      onSubmit={onSubmitHandler}
      setSuccess={props.setSuccess}
      closeFormOnSubmit={props.closeFormOnSubmit}
      query={props.data ? MUTATE_NEWS_ITEM : CREATE_NEWS_ITEM}
      pid={props.data && props.data.pid}
    >
      <AdminFieldSet inputs={singleInputs} />
      <AdminFieldSet
        title="Descriptions"
        inputs={descriptionInputs}
        buttonOnClick={appendDescriptionHandler}
      />
      <AdminFieldSet title="Links" inputs={linkInputs} buttonOnClick={appendLinkHandler} optional />
      <AdminFieldSet
        title="Videos"
        inputs={videoInputs}
        buttonOnClick={appendVideoHandler}
        optional
      />
    </AdminForm>
  )
}

export default React.memo(NewsForm)

const descriptionConfig: Field = {
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
}

const videoConfig: State<typeDefs.VideoInput> = {
  src: {
    value: '',
    type: types.INPUT,
    invalid: false,
    touched: false,
    errorMessage: '',
    label: videoHeaders.SRC,
    warning: 'Field required if adding video',
    elementConfig: {
      placeholder: 'Src',
      type: 'text',
    },
  },
  title: {
    value: '',
    type: types.INPUT,
    invalid: false,
    touched: false,
    errorMessage: '',
    label: videoHeaders.HEADER,
    warning: 'Field required if adding video',
    elementConfig: {
      placeholder: 'Header',
      type: 'text',
    },
  },
}

const linkConfig: State<typeDefs.LinkInput> = {
  src: {
    value: '',
    type: types.INPUT,
    invalid: false,
    touched: false,
    errorMessage: '',
    label: linkHeaders.SRC,
    warning: 'Field required if adding link',
    elementConfig: {
      placeholder: 'URL',
      type: 'text',
    },
  },
  header: {
    value: '',
    type: types.INPUT,
    invalid: false,
    touched: false,
    errorMessage: '',
    label: linkHeaders.HEADER,
    warning: 'Field required if adding link',
    elementConfig: {
      placeholder: 'Header',
      type: 'text',
    },
  },
  buttonText: {
    value: '',
    type: types.INPUT,
    invalid: false,
    touched: false,
    errorMessage: '',
    label: linkHeaders.BTNTEXT,
    warning: 'Field required if adding link',
    elementConfig: {
      placeholder: 'Button Text',
      type: 'text',
    },
  },
}

const mainInputsConfig: State<Pick<typeDefs.NewsItem, SingleInputs>> = {
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
  shortTitle: {
    value: '',
    type: types.INPUT,
    invalid: false,
    touched: false,
    required: true,
    errorMessage: '',
    label: 'Short Title',
    elementConfig: {
      placeholder: 'Short Title',
      type: 'text',
    },
  },
  imageUrl: {
    value: '',
    type: types.INPUT,
    invalid: false,
    touched: false,
    errorMessage: '',
    label: 'Image URL',
    required: true,
    elementConfig: {
      placeholder: 'Image URL',
      type: 'text',
    },
  },
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
}
export class VideoInput extends Authenticator implements typeDefs.VideoInput {
  NAME = 'Video'
  requiredKeys = ['src', 'title']
  constructor(public src: string, public title: string) {
    super()
  }
}

class LinkInput extends Authenticator implements typeDefs.LinkInput {
  NAME = 'Link'
  requiredKeys = ['header', 'src', 'buttonText']
  constructor(public header: string, public src: string, public buttonText: string) {
    super()
  }
}
