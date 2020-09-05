import React from 'react'
import useForm, {
  createFormStateArrayOfObjects,
  appendMissingConfigKeys,
  State,
  Field,
  actions,
} from '../hooks/useAdminForm'
import { cloneDeep } from 'lodash'
import AdminFieldSet from '../AdminFieldSet/AdminFieldSet'
import AdminForm from '../AdminForm/AdminForm'
import { useCallback } from 'react'
import * as typeDefs from '@generated/graphql'
import { isKey } from '@utils/helpers'
import { inputTypes as types } from '@components/UI/Inputs/Input/Input'
import { Authenticator } from '@utils/helpers'

interface Props {
  data?: typeDefs.Artist
}

type SingleInputs = 'name' | 'website' | 'imageUrl' | 'labelSide'

const singleInputKeys: SingleInputs[] = ['name', 'website', 'imageUrl', 'labelSide']

enum sectionHeaders {
  MEMBER = 'Band Member',
  LINKS = 'Album Links',
  ALBUM = 'Album',
  VIDEO = 'Video',
}

const ArtistsForm: React.FC<Props> = (props) => {
  const singleInputState = cloneDeep(mainInputsConfig)
  let bandMemberInputState: { value: Field[]; sectionHeader?: string }[] = [
    {
      value: [
        { ...bandMemberConfig.name },
        { ...bandMemberConfig.imageUrl },
        { ...bandMemberConfig.instrument },
      ],
      sectionHeader: sectionHeaders.MEMBER,
    },
  ]
  let introInputState = [{ value: [{ ...introConfig.header }, { ...introConfig.body }] }]
  let albumInputState: { value: Field[]; sectionHeader?: string }[] = [
    {
      value: [
        { ...albumConfig.name },
        { ...albumConfig.imageUrl },
        { ...albumConfig.year },
        {
          value: [
            { ...albumLinkConfig.website },
            { ...albumLinkConfig.spotify },
            { ...albumLinkConfig.youtube },
            { ...albumLinkConfig.soundCloud },
            { ...albumLinkConfig.appleMusic },
          ],
          sectionHeader: sectionHeaders.LINKS,
        },
      ],
      sectionHeader: sectionHeaders.ALBUM,
    },
  ]
  let videoInputState: { value: Field[]; sectionHeader?: string }[] = [
    {
      value: [{ ...videoConfig.title }, { ...videoConfig.src }],
      sectionHeader: sectionHeaders.VIDEO,
    },
  ]

  if (props.data) {
    bandMemberInputState = []
    introInputState = []
    albumInputState = []
    videoInputState = []

    for (const key of singleInputKeys) {
      singleInputState[key].value = props.data[key] ?? ''
      if (props.data[key]) {
        singleInputState[key].touched = true
        singleInputState[key].invalid = false
      }
    }

    if (props.data.bandMembers) {
      bandMemberInputState = createFormStateArrayOfObjects(
        props.data.bandMembers,
        bandMemberConfig,
        sectionHeaders.MEMBER
      )
    }
    if (props.data.introduction) {
      introInputState = [{ value: [] }]
      for (const introKey in props.data.introduction) {
        if (isKey(introKey, introConfig)) {
          introInputState[0].value.push({
            ...introConfig[introKey],
            value: props.data.introduction[introKey],
          })
        } else {
          throw new Error(`key ${introKey} is not in the config object`)
        }
      }
      const toAdd = appendMissingConfigKeys(introConfig, props.data.introduction)
      introInputState[0].value = introInputState[0].value.concat(toAdd)
    }
    if (props.data.albums) {
      for (const album of props.data.albums) {
        const albumObj: { value: Field[]; sectionHeader?: string } = {
          value: [],
          sectionHeader: sectionHeaders.ALBUM,
        }
        for (const albumKey in album) {
          if (isKey(albumKey, albumConfig)) {
            albumObj.value.push({
              ...albumConfig[albumKey],
              value: album[albumKey].toString(),
            })
          } else if (albumKey === 'links') {
            const linkObj: { value: Field[]; sectionHeader?: string } = {
              value: [],
              sectionHeader: sectionHeaders.LINKS,
            }
            for (const linkKey in album.links) {
              if (isKey(linkKey, albumLinkConfig)) {
                linkObj.value.push({
                  ...albumLinkConfig[linkKey],
                  value: album.links[linkKey] as string,
                })
              }
            }
            const toAdd = appendMissingConfigKeys(albumLinkConfig, album.links)
            linkObj.value = linkObj.value.concat(toAdd)
            albumObj.value.push(linkObj)
          } else {
            throw new Error(`Key ${albumKey} is not in the config object`)
          }
        }
        const toAdd = appendMissingConfigKeys(albumConfig, album)
        albumObj.value = albumObj.value.concat(toAdd)
        albumInputState.push(albumObj)
      }
    }
    if (props.data.videos) {
      videoInputState = createFormStateArrayOfObjects(
        props.data.videos,
        videoConfig,
        sectionHeaders.VIDEO
      )
    }
  }

  const { inputs: singleInputs, formState: singleInputsState } = useForm(singleInputState)
  const { inputs: bandMemberInputs, dispatch: bandMemberDispatch } = useForm({
    bandMember: { value: bandMemberInputState },
  })

  console.log(singleInputsState)

  const { inputs: introInputs } = useForm({ introduction: { value: introInputState } })
  const { inputs: albumInputs, dispatch: albumDispatch } = useForm({
    albums: { value: albumInputState },
  })
  const { inputs: videoInputs, dispatch: videoDispatch } = useForm({
    videos: { value: videoInputState },
  })

  const appendBandMemberHandler = useCallback(() => {
    bandMemberDispatch({
      type: actions.APPEND,
      key: 'bandMember',
      value: {
        value: [
          { ...bandMemberConfig.name },
          { ...bandMemberConfig.imageUrl },
          { ...bandMemberConfig.instrument },
        ],
        sectionHeader: sectionHeaders.MEMBER,
      },
    })
  }, [bandMemberDispatch])
  const appendAlbumHandler = useCallback(() => {
    albumDispatch({
      type: actions.APPEND,
      key: 'albums',
      value: {
        value: [
          { ...albumConfig.name },
          { ...albumConfig.imageUrl },
          { ...albumConfig.year },
          {
            value: [
              { ...albumLinkConfig.website },
              { ...albumLinkConfig.spotify },
              { ...albumLinkConfig.youtube },
              { ...albumLinkConfig.soundCloud },
              { ...albumLinkConfig.appleMusic },
            ],
            sectionHeader: sectionHeaders.LINKS,
          },
        ],
        sectionHeader: sectionHeaders.ALBUM,
      },
    })
  }, [albumDispatch])
  const appendVideoHandler = useCallback(() => {
    videoDispatch({
      type: actions.APPEND,
      key: 'videos',
      value: {
        value: [{ ...videoConfig.title }, { ...videoConfig.src }],
        sectionHeader: sectionHeaders.VIDEO,
      },
    })
  }, [videoDispatch])

  return (
    <AdminForm title="Artist Form">
      <AdminFieldSet inputs={singleInputs} />
      <AdminFieldSet title="Introduction" inputs={introInputs} />
      <AdminFieldSet
        title="Band Members"
        inputs={bandMemberInputs}
        buttonOnClick={appendBandMemberHandler}
        optional
      />
      <AdminFieldSet
        title="Albums"
        inputs={albumInputs}
        buttonOnClick={appendAlbumHandler}
        optional
      />
      <AdminFieldSet
        title="Videos"
        inputs={videoInputs}
        buttonOnClick={appendVideoHandler}
        optional
      />
    </AdminForm>
  )
}

export default React.memo(ArtistsForm)

const albumLinkConfig: State<Required<typeDefs.AlbumLinkInput>> = {
  website: {
    value: '',
    type: types.INPUT,
    invalid: false,
    touched: false,
    errorMessage: '',
    label: 'Website',
    warning: 'Field required if adding album',
    elementConfig: {
      placeholder: 'Website',
      type: 'text',
    },
  },
  youtube: {
    value: '',
    type: types.INPUT,
    invalid: false,
    touched: false,
    errorMessage: '',
    label: 'Youtube',
    warning: 'Field required if adding album',
    elementConfig: {
      placeholder: 'Youtube',
      type: 'text',
    },
  },
  spotify: {
    value: '',
    type: types.INPUT,
    invalid: false,
    touched: false,
    errorMessage: '',
    label: 'Spotify',
    warning: 'Field required if adding album',
    elementConfig: {
      placeholder: 'Spotify',
      type: 'text',
    },
  },
  soundCloud: {
    value: '',
    type: types.INPUT,
    invalid: false,
    touched: false,
    errorMessage: '',
    label: 'Sound Cloud',
    elementConfig: {
      placeholder: 'Sound Cloud',
      type: 'text',
    },
  },
  appleMusic: {
    value: '',
    type: types.INPUT,
    invalid: false,
    touched: false,
    errorMessage: '',
    label: 'Apple Music',
    elementConfig: {
      placeholder: 'Apple Music',
      type: 'text',
    },
  },
}

const albumConfig: State<Omit<typeDefs.AlbumInput, 'links'>> = {
  name: {
    value: '',
    type: types.INPUT,
    invalid: false,
    touched: false,
    errorMessage: '',
    label: 'Name',
    warning: 'Field required if adding album',
    elementConfig: {
      placeholder: 'Name',
      type: 'text',
    },
  },
  year: {
    value: '',
    type: types.INPUT,
    invalid: false,
    touched: false,
    errorMessage: '',
    label: 'Year',
    elementConfig: {
      placeholder: 'Year',
      type: 'number',
    },
  },
  imageUrl: {
    value: '',
    type: types.INPUT,
    invalid: false,
    touched: false,
    errorMessage: '',
    label: 'Image',
    elementConfig: {
      placeholder: 'Image',
      type: 'text',
    },
  },
}

const videoConfig: State<typeDefs.VideoInput> = {
  title: {
    value: '',
    type: types.INPUT,
    invalid: false,
    touched: false,
    errorMessage: '',
    label: 'Title',
    warning: 'Field required if adding video',
    elementConfig: {
      placeholder: 'Title',
      type: 'text',
    },
  },
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
}

const introConfig: State<typeDefs.IntroInput> = {
  header: {
    value: '',
    type: types.TEXT,
    invalid: false,
    touched: false,
    errorMessage: '',
    label: 'Header',
    required: true,
    elementConfig: {
      placeholder: 'Header',
      type: 'text',
    },
  },
  body: {
    value: '',
    type: types.TEXT,
    invalid: false,
    touched: false,
    errorMessage: '',
    label: 'Body',
    required: true,
    elementConfig: {
      placeholder: 'Body',
      type: 'text',
    },
  },
}

const bandMemberConfig: State<Required<typeDefs.BandMemberInput>> = {
  name: {
    value: '',
    type: types.INPUT,
    invalid: false,
    touched: false,
    errorMessage: '',
    label: 'Name',
    warning: 'Field required if adding band member',
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
    elementConfig: {
      placeholder: 'Image',
      type: 'text',
    },
  },
  instrument: {
    value: '',
    type: types.INPUT,
    invalid: false,
    touched: false,
    errorMessage: '',
    label: 'Instrument',
    warning: 'Field required if adding band member',
    elementConfig: {
      placeholder: 'Instrument',
      type: 'text',
    },
  },
}

const mainInputsConfig = {
  name: {
    value: '',
    type: types.INPUT,
    invalid: true,
    touched: false,
    errorMessage: '',
    label: 'Name',
    required: true,
    elementConfig: {
      placeholder: 'Name',
      type: 'text',
    },
  },
  website: {
    value: '',
    type: types.INPUT,
    invalid: true,
    touched: false,
    errorMessage: '',
    label: 'Website',
    required: true,
    elementConfig: {
      placeholder: 'Website',
      type: 'text',
    },
  },
  imageUrl: {
    value: '',
    type: types.INPUT,
    invalid: true,
    touched: false,
    errorMessage: '',
    label: 'Image',
    required: true,
    elementConfig: {
      placeholder: 'Image',
      type: 'text',
    },
  },
  labelSide: {
    value: '',
    type: types.SELECT,
    invalid: true,
    touched: false,
    errorMessage: '',
    label: 'Label',
    elementConfig: {
      placeholder: 'Label',
      type: 'text',
      options: [
        { value: 'left', displayValue: 'Left' },
        { value: 'right', displayValue: 'Right' },
      ],
    },
  },
}
