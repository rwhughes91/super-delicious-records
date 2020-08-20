import { useState, useCallback } from 'react'
import classes from './AdminContainer.module.scss'
import NewsForm from '../NewsForm/NewsForm'
import ArtistsForm from '../ArtistsForm/ArtistsForm'
import EventsForm from '../EventsForm/EventsForm'
import ShopForm from '../ShopForm/ShopForm'
import AdminListItem from '../AdminListItem/AdminListItem'
import FormButton from '../../UI/Buttons/FormButton/FormButton'
import { Props as NewsProps } from '../../../pages/news/[pid]'
import { Props as ArtistProps } from '../../../pages/artists/[pid]'
import { Props as EventProps } from '../../../pages/events'
import { Props as ShopProps } from '../../../pages/shop/[pid]'

interface Props {
  type: 'news' | 'artists' | 'events' | 'shop'
  newsData?: NewsProps[]
  artistsData?: ArtistProps[]
  eventsData?: EventProps[]
  shopData?: ShopProps[]
}

const AdminContainer: React.FC<Props> = (props) => {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState(undefined)

  const onShowFormHandler = useCallback(() => {
    setFormData(undefined)
    setShowForm((prevState) => !prevState)
  }, [])

  const setFormDataHandler = useCallback((data) => {
    setFormData(data)
    setShowForm(true)
  }, [])

  let adminForm
  let formItems
  if (props.type === 'news') {
    adminForm = <NewsForm data={formData} />
    if (props.newsData) {
      formItems = props.newsData.map((newsItem, i) => {
        return (
          <AdminListItem
            key={i}
            pid={newsItem.pid}
            title={newsItem.title}
            onClick={() => setFormDataHandler(newsItem)}
          />
        )
      })
    }
  }
  if (props.type === 'artists') {
    adminForm = <ArtistsForm data={formData} />
    if (props.artistsData) {
      formItems = props.artistsData.map((artistsItem, i) => {
        return (
          <AdminListItem
            key={i}
            pid={artistsItem.pid}
            title={artistsItem.name}
            onClick={() => setFormDataHandler(artistsItem)}
          />
        )
      })
    }
  }
  if (props.type === 'events') {
    adminForm = <EventsForm data={formData} />
    if (props.eventsData) {
      formItems = props.eventsData.map((eventsItem, i) => {
        return (
          <AdminListItem
            key={i}
            pid={eventsItem.pid}
            title={eventsItem.title}
            onClick={() => setFormDataHandler(eventsItem)}
          />
        )
      })
    }
  }
  if (props.type === 'shop') {
    adminForm = <ShopForm data={formData} />
    if (props.shopData) {
      formItems = props.shopData.map((shopItem, i) => {
        return (
          <AdminListItem
            key={i}
            pid={shopItem.pid}
            title={shopItem.name}
            onClick={() => setFormDataHandler(shopItem)}
          />
        )
      })
    }
  }

  return (
    <div className={classes.AdminContainer}>
      <div className={classes.HeaderContainer}>
        <div className={classes.ButtonContainer}>
          <FormButton styles={{ width: '10rem' }} onClick={onShowFormHandler}>
            {showForm ? 'Close Form' : 'Add Item'}
          </FormButton>
        </div>
      </div>
      <div className={classes.FormContainer}>
        {!showForm && <div style={{ marginTop: '1.5rem' }}>{formItems}</div>}
        {showForm && adminForm}
      </div>
    </div>
  )
}

export default AdminContainer
