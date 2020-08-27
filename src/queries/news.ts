export const GET_NEWS_ITEM = `
  query GetNewsItem($pid: String!) {
    getNewsItem(pid: $pid) {
      pid
      title
      shortTitle
      imageUrl
      description
      date
      videos {
        src
        header
      }
      links {
        header
        src
        buttonText
      }
    }
  }
`

export const GET_NEWS_ITEMS = `
  query GetNewsItems {
    getNewsItems {
      pid
      title
      shortTitle
      imageUrl
      description
      date
      videos {
        src
        header
      }
      links {
        header
        src
        buttonText
      }
    }
  }
`
