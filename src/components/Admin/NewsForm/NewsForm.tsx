import { useCallback } from 'react'
import useForm, {
  createFormStateArrayOfObjects,
  createFormStateArrayOfStrings,
  convertDate,
  Field,
  State,
  types,
  actions,
} from '../hooks/useAdminForm'
import {
  Props as NewsProps,
  Video as VideoProps,
  Link as LinkProps,
} from '../../../pages/news/[pid]'
import { cloneDeep } from 'lodash'
import AdminFieldSet from '../AdminFieldSet/AdminFieldSet'
import AdminForm from '../AdminForm/AdminForm'

interface Props {
  data?: NewsProps
}

enum sectionHeaders {
  LINKS = 'Link',
  VIDEO = 'Video',
}

type SingleInputs = 'title' | 'shortTitle' | 'imageUrl' | 'date'

const singleInputKeys: SingleInputs[] = ['title', 'shortTitle', 'imageUrl', 'date']

const NewsForm: React.FC<Props> = (props) => {
  const singleInputState = cloneDeep(mainInputsConfig)
  let descriptionInput = [{ ...descriptionConfig }]
  let videoInputState: { value: Field[]; sectionHeader?: string }[] = [
    {
      value: [{ ...videoConfig.src }, { ...videoConfig.header }],
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

  const { inputs: singleInputs } = useForm(singleInputState)
  const { inputs: descriptionInputs, dispatch: descriptionDispatch } = useForm({
    description: { value: descriptionInput },
  })
  const { inputs: videoInputs, dispatch: videoDispatch } = useForm({
    videos: { value: videoInputState },
  })
  const { inputs: linkInputs, dispatch: linkDispatch } = useForm({
    links: { value: linkInputState },
  })

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
        value: [{ ...videoConfig.src }, { ...videoConfig.header }],
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
    <AdminForm title="News Form">
      <>
        <AdminFieldSet inputs={singleInputs} />
        <AdminFieldSet
          title="Descriptions"
          inputs={descriptionInputs}
          buttonOnClick={appendDescriptionHandler}
        />
        <AdminFieldSet
          title="Links"
          relative
          inputs={linkInputs}
          buttonOnClick={appendLinkHandler}
          optional
        />
        <AdminFieldSet
          title="Videos"
          relative
          inputs={videoInputs}
          buttonOnClick={appendVideoHandler}
          optional
        />
      </>
    </AdminForm>
  )
}

export default NewsForm

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

const videoConfig: State<VideoProps> = {
  src: {
    value: '',
    type: types.INPUT,
    invalid: false,
    touched: false,
    errorMessage: '',
    label: 'Video Src',
    warning: 'Field required if adding video',
    elementConfig: {
      placeholder: 'Src',
      type: 'text',
    },
  },
  header: {
    value: '',
    type: types.INPUT,
    invalid: false,
    touched: false,
    errorMessage: '',
    label: 'Header',
    warning: 'Field required if adding video',
    elementConfig: {
      placeholder: 'Header',
      type: 'text',
    },
  },
}

const linkConfig: State<LinkProps> = {
  src: {
    value: '',
    type: types.INPUT,
    invalid: false,
    touched: false,
    errorMessage: '',
    label: 'Source',
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
    label: 'Header',
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
    label: 'Button Text',
    warning: 'Field required if adding link',
    elementConfig: {
      placeholder: 'Button Text',
      type: 'text',
    },
  },
}

const mainInputsConfig: State<Pick<NewsProps, SingleInputs>> = {
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
