import React, { useRef, useState, useCallback, ChangeEvent, useEffect } from 'react'
import classes from './NavSearchModal.module.scss'
import Backdrop from '@components/UI/Backdrop/Backdrop'
import SearchIcon from '@components/UI/Icons/SearchIcon/SearchIcon'
import { GET_ARTISTS_LIST } from '@queries/index'
import useSWR from 'swr'
import axios from 'axios'
import Loader from '@components/UI/Loader/Loader'
import * as typeDefs from '@generated/graphql'
import { useRouter } from 'next/router'

interface Props {
  show: boolean
  onClick: () => void
}

const NavSearchModal: React.FC<Props> = (props) => {
  const router = useRouter()
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { data, error } = useSWR<{ getArtistsList: typeDefs.ArtistName[] }>(
    GET_ARTISTS_LIST,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )
  const { onClick } = props

  const pageTransition = useCallback(() => {
    setLoading(true)
  }, [])

  const pageEndTransition = useCallback(() => {
    setLoading(false)
    onClick()
  }, [onClick])

  useEffect(() => {
    inputRef.current && inputRef.current.focus()
  }, [])

  useEffect(() => {
    router.events.on('routeChangeStart', pageTransition)
    router.events.on('routeChangeComplete', pageEndTransition)
    return () => {
      router.events.off('routeChangeStart', pageTransition)
      router.events.off('routeChangeComplete', pageEndTransition)
    }
  }, [data, router, pageTransition, pageEndTransition])

  const redirect = useCallback(
    (pid: string) => {
      router.push('/artists/[pid]', `/artists/${pid}`)
    },
    [router]
  )

  const onInputChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setInput(event?.target.value)
  }, [])

  let output = (
    <div className={classes.Filler}>
      <Loader />
    </div>
  )
  if (data && data.getArtistsList) {
    const filteredItems = data.getArtistsList.filter((artist) => artist.name.startsWith(input))
    if (filteredItems.length > 0) {
      const liItems = filteredItems.map((datum) => {
        return (
          <li key={datum.pid}>
            <button onClick={() => redirect(datum.pid)}>{datum.name}</button>
          </li>
        )
      })
      output = <ul className={classes.ArtistList}>{liItems}</ul>
    } else {
      output = <div className={classes.Filler}>we got nothing here</div>
    }
  }
  if (error) {
    output = (
      <div className={classes.Filler} style={{ color: 'var(--bright-red-color)' }}>
        Oops. Please check your internet connection
      </div>
    )
  }
  if (loading) {
    output = (
      <div className={classes.Filler}>
        <Loader />
      </div>
    )
  }

  return (
    <>
      <Backdrop
        show={props.show}
        left="0"
        top="0"
        onClick={props.onClick}
        styles={{
          backgroundColor: 'rgba(0, 0, 0 ,.7)',
          width: '100vw',
          height: '100vh',
          backdropFilter: 'blur(5px)',
        }}
      />
      <div className={classes.NavSearchModal}>
        <div className={classes.InputWrapper}>
          <label htmlFor="search">
            <SearchIcon size={2} strokeWidth="3" />
          </label>
          <input
            value={input}
            onChange={onInputChangeHandler}
            id="search"
            type="text"
            className={classes.Input}
            placeholder="search for a band"
            ref={inputRef}
          />
        </div>
        {output}
      </div>
    </>
  )
}

export default React.memo(NavSearchModal)

const fetcher = async (query: string) => {
  const res = await axios.post('/api/graphql', { query })
  return res.data.data
}
