import { gql } from 'graphql-request'

export const GET_EVENT = gql`
  query GetEvent($pid: String!) {
    getEvent(pid: $pid) {
      pid
      date
      title
      description
      url
      endDate
      location
    }
  }
`

export const GET_EVENTS = gql`
  query GetEvents {
    getEvents {
      pid
      date
      title
      description
      url
      endDate
      location
    }
  }
`
export const CREATE_EVENT = gql`
  mutation CreateEvent($data: EventInput!) {
    createEvent(data: $data)
  }
`
