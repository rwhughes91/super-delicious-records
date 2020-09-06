import { gql } from 'graphql-request'

export const GET_ARTIST = gql`
  query GetArtist($pid: String!) {
    getArtist(pid: $pid) {
      pid
      name
      website
      imageUrl
      introduction {
        header
        body
      }
      labelSide
      bandMembers {
        name
        imageUrl
        instrument
      }
      albums {
        name
        year
        imageUrl
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

export const GET_ARTISTS = gql`
  query GetArtists {
    getArtists {
      pid
      name
      website
      imageUrl
      introduction {
        header
        body
      }
      labelSide
      bandMembers {
        name
        imageUrl
        instrument
      }
      albums {
        name
        year
        imageUrl
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
