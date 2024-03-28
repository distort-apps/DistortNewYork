import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Results from '@/components/shows/show-detail/results'
import ErrorAlert from '@/components/ui/error-alert'
import Button from '@/components/ui/button'
import Head from 'next/head'
import ShowGrid from '@/components/shows/show-grid'

function GenSearchPage () {
  const [loadedShows, setLoadedShows] = useState([])
  const router = useRouter()

  const query = (router.query.query || '').toLowerCase()

  const { data, error } = useSWR(`/api/search/${query}`, url =>
    fetch(url).then(res => res.json())
  )

  useEffect(() => {
    if (data) {
      const showsArr = []

      for (const key in data.shows) {
        showsArr.push({
          ...data.shows[key]
        })
      }
      setLoadedShows(showsArr)
    }
  }, [data])

  let pageHeadData = (
    <Head>
      <title>General Search Page</title>
      <meta name='description' content='A list of search results' />
    </Head>
  )

  if (!data) {
    return (
      <>
        {pageHeadData}
        <p className='center'>Loading...</p>
      </>
    )
  }

  pageHeadData = (
    <Head>
      <title>Filtered Shows</title>
      <meta name='description' content={`All shows for ${query}.`} />
    </Head>
  )

  if (!query || query.trim().length === 0 || error) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/shows'>show all events</Button>
        </div>
      </>
    )
  }

  if (!data && !loadedShows || loadedShows.length === 0) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/shows'>show all events</Button>
        </div>
      </>
    )
  }

  return (
    <>
      {pageHeadData}
      <Results query={query} />
      <ShowGrid items={loadedShows} />
    </>
  )
}

export default GenSearchPage
