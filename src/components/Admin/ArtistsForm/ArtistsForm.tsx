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
import { VideoInput } from '../NewsForm/NewsForm'

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

enum introHeaders {
  HEADER = 'Header',
  BODY = 'Body',
}

enum bandMemberHeaders {
  NAME = 'Name',
  IMAGE = 'Image',
  INSTRUMENT = 'Instrument',
}

enum videoHeaders {
  SRC = 'Video Src',
  HEADER = 'Title',
}

enum albumHeaders {
  NAME = 'Name',
  YEAR = 'Year',
  IMAGE = 'Image',
}

enum albumLinksHeaders {
  APPLE = 'Apple Music',
  SOUND = 'Sound Cloud',
  SPOTIFY = 'Spotify',
  WEBSITE = 'Website',
  YOUTUBE = 'Youtube',
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
  const {
    inputs: bandMemberInputs,
    dispatch: bandMemberDispatch,
    formState: bandMembersState,
  } = useForm({
    bandMember: { value: bandMemberInputState },
  })

  const { inputs: introInputs, formState: introductionState } = useForm({
    introduction: { value: introInputState },
  })
  const { inputs: albumInputs, dispatch: albumDispatch, formState: albumsState } = useForm({
    albums: { value: albumInputState },
  })
  const { inputs: videoInputs, dispatch: videoDispatch, formState: videosState } = useForm({
    videos: { value: videoInputState },
  })

  const onSubmitHandler = () => {
    let introduction: typeDefs.IntroInput = { header: '', body: '' }
    for (const introductionContainer of introductionState.introduction.value as Field[]) {
      const introductionData = (introductionContainer as Field).value as Field[]
      const header = introductionData.find((item) => item.label === introHeaders.HEADER)
      const body = introductionData.find((item) => item.label === introHeaders.BODY)
      if (header && body) {
        if (header.value || body.value) {
          introduction = { header: header.value as string, body: body.value as string }
        }
      } else {
        throw new Error('Body and header field are required for the introduction section')
      }
    }

    const bandMembers = []
    for (const bandMemberContainer of bandMembersState.bandMember.value as Field[]) {
      const name = (bandMemberContainer.value as Field[]).find(
        (item) => item.label === bandMemberHeaders.NAME
      )
      const imageUrl = (bandMemberContainer.value as Field[]).find(
        (item) => item.label === bandMemberHeaders.IMAGE
      )
      const instrument = (bandMemberContainer.value as Field[]).find(
        (item) => item.label === bandMemberHeaders.INSTRUMENT
      )
      if (name && imageUrl && instrument) {
        if (name.value || imageUrl.value || instrument?.value) {
          const bandMemberInput = new BandMemberInput(
            name.value as string,
            imageUrl.value as string,
            instrument?.value as string
          )
          bandMemberInput.authenticate()
          bandMembers.push({
            name: bandMemberInput.name,
            imageUrl: bandMemberInput.imageUrl,
            instrument: bandMemberInput.instrument,
          })
        }
      }
    }

    const albums = []
    for (const albumContainer of albumsState.albums.value as Field[]) {
      const name = (albumContainer.value as Field[]).find(
        (item) => item.label === albumHeaders.NAME
      )
      const year = (albumContainer.value as Field[]).find(
        (item) => item.label === albumHeaders.YEAR
      )
      const imageUrl = (albumContainer.value as Field[]).find(
        (item) => item.label === albumHeaders.IMAGE
      )
      const albumLinks = (albumContainer.value as Field[]).find(
        (item) => item.sectionHeader === 'Album Links'
      )
      let albumLinkInput
      const albumLinksPayload: { data: any; filledValues: boolean } = {
        data: {},
        filledValues: false,
      }
      if (albumLinks) {
        for (const albumLink of albumLinks.value as Field[]) {
          if (albumLink.label) {
            if (albumLink.value) {
              albumLinksPayload.filledValues = true
            }
            albumLinksPayload.data[albumLink.label] = albumLink.value
          }
        }
        if (
          albumLinksPayload.data[albumLinksHeaders.WEBSITE] ||
          albumLinksPayload.data[albumLinksHeaders.YOUTUBE] ||
          albumLinksPayload.data[albumLinksHeaders.SPOTIFY]
        ) {
          albumLinkInput = new AlbumLinkInput(
            albumLinksPayload.data[albumLinksHeaders.WEBSITE],
            albumLinksPayload.data[albumLinksHeaders.YOUTUBE],
            albumLinksPayload.data[albumLinksHeaders.SPOTIFY],
            albumLinksPayload.data[albumLinksHeaders.APPLE],
            albumLinksPayload.data[albumLinksHeaders.SOUND]
          )
        }
      }
      if (name && year && imageUrl && albumLinkInput) {
        if (name.value || year.value || imageUrl.value || albumLinksPayload.filledValues) {
          albumLinkInput?.authenticate()
          const albumInput = new AlbumInput(
            name.value as string,
            parseFloat(year.value as string),
            imageUrl.value as string,
            albumLinkInput
          )
          albumInput.authenticate()
          albums.push({
            name: albumInput.name,
            year: albumInput.year,
            imageUrl: albumInput.imageUrl,
            links: {
              website: albumInput.links.website,
              spotify: albumInput.links.spotify,
              youtube: albumInput.links.youtube,
              soundCloud: albumInput.links.soundCloud,
              appleMusic: albumInput.links.appleMusic,
            },
          })
        }
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
    const artistInput: typeDefs.ArtistInput = {
      name: singleInputsState.name.value as string,
      website: singleInputsState.website.value as string,
      imageUrl: singleInputsState.imageUrl.value as string,
      labelSide: singleInputsState.labelSide.value as typeDefs.LabelSide,
      introduction,
      bandMembers: bandMembers,
      albums,
      videos,
    }
    return artistInput
  }

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
    <AdminForm title="Artist Form" onSubmit={onSubmitHandler}>
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
    label: albumLinksHeaders.WEBSITE,
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
    label: albumLinksHeaders.YOUTUBE,
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
    label: albumLinksHeaders.SPOTIFY,
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
    label: albumLinksHeaders.SOUND,
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
    label: albumLinksHeaders.APPLE,
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
    label: albumHeaders.NAME,
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
    label: albumHeaders.YEAR,
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
    label: albumHeaders.IMAGE,
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
    label: introHeaders.HEADER,
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
    label: introHeaders.BODY,
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
    label: bandMemberHeaders.NAME,
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
    warning: 'Field required if adding band member',
    label: bandMemberHeaders.IMAGE,
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
    label: bandMemberHeaders.INSTRUMENT,
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
  website: {
    value: '',
    type: types.INPUT,
    invalid: false,
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
  labelSide: {
    value: '',
    type: types.SELECT,
    invalid: false,
    touched: false,
    errorMessage: '',
    label: 'Label',
    required: true,
    elementConfig: {
      placeholder: 'Label',
      type: 'text',
      options: [
        { value: typeDefs.LabelSide.Left, displayValue: 'Left' },
        { value: typeDefs.LabelSide.Right, displayValue: 'Right' },
      ],
    },
  },
}

class BandMemberInput extends Authenticator implements typeDefs.BandMemberInput {
  NAME = 'Band Member'
  requiredKeys = ['name', 'imageUrl']
  constructor(public name: string, public imageUrl: string, public instrument?: string) {
    super()
  }
}

class AlbumInput extends Authenticator implements typeDefs.AlbumInput {
  NAME = 'Album'
  requiredKeys = ['name', 'year', 'imageUrl', 'links']
  constructor(
    public name: string,
    public year: number,
    public imageUrl: string,
    public links: typeDefs.AlbumLink
  ) {
    super()
  }
}

class AlbumLinkInput extends Authenticator implements typeDefs.AlbumLinkInput {
  requiredKeys = ['website', 'youtube', 'spotify']
  NAME = 'Album Link'
  constructor(
    public website: string,
    public youtube: string,
    public spotify: string,
    public soundCloud?: string,
    public appleMusic?: string
  ) {
    super()
  }
}
