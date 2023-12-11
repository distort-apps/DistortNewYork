import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ShowContent from '@/components/shows/show-detail/show-content'
import { getShowById } from '@/show-dummy-data'

function ShowDetailPage (selectedShow) {
  const [show, setShow] = useState([])
  const router = useRouter()

  const showId = router.query.showId
  console.log('showId: ', showId)

  useEffect(() => {
    console.log('running')
    const show = getShowById(showId)
    setShow(show)
  }, [])

  // if not show
  if (!show) {
    return (
      <div className='center'>
        <p>No show found!</p>
      </div>
    )
  }

  // if show
  return <ShowContent show={show} />
}

export default ShowDetailPage
