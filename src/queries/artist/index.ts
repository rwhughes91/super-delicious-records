import { gql } from 'graphql-request'

export const GET_ARTIST = gql`
  query GetArtist($pid: String!) {
    getArtist(pid: $pid) {
      pid
      name
      website
      imageUrl
      imageSetUrl
      introduction {
        header
        body
      }
      labelSide
      bandMembers {
        name
        imageUrl
        imageSetUrl
        instrument
      }
      albums {
        name
        year
        imageUrl
        imageSetUrl
        links {
          website
          youtube
          spotify
          soundCloud
          appleMusic
        }
      }
      videos {
        src
        title
      }
    }
  }
`

export const GET_ARTISTS_LIST = gql`
  query GetArtistSList {
    getArtistsList {
      pid
      name
    }
  }
`

export const GET_ARTISTS = gql`
  query GetArtists {
    getArtists {
      pid
      name
      website
      imageUrl
      imageSetUrl
      introduction {
        header
        body
      }
      labelSide
      bandMembers {
        name
        imageUrl
        imageSetUrl
        instrument
      }
      albums {
        name
        year
        imageUrl
        imageSetUrl
        links {
          website
          youtube
          spotify
          soundCloud
          appleMusic
        }
      }
      videos {
        src
        title
      }
    }
  }
`
export const CREATE_ARTIST = gql`
  mutation CreateArtist($data: ArtistInput!) {
    createArtist(data: $data)
  }
`
export const MUTATE_ARTIST = gql`
  mutation MutateArtist($data: ArtistInput!, $pid: String!) {
    mutateArtist(data: $data, pid: $pid)
  }
`
