import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Results from '@/components/shows/show-detail/results'
import ErrorAlert from '@/components/ui/error-alert'
import Button from '@/components/ui/button'
import Head from 'next/head'
import ShowGrid from '@/components/shows/show-grid'

function FilteredEventsPage (props) {
  const [loadedEvents, setLoadedEvents] = useState([])
  const router = useRouter()

  const filterData = router.query.slug

  const { data, error } = useSWR('http://localhost:3000/api/shows', url =>
    fetch(url).then(res => res.json())
  )

  useEffect(() => {
    if (data) {
      const shows = []

      for (const key in data.shows) {
        shows.push({
          id: key,
          ...data.shows[key]
        })
      }
      console.log('shows', shows)
      setLoadedEvents(shows)
    }
  }, [data])

  let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name='description' content={`A list of filtered shows.`} />
    </Head>
  )

  if (!loadedEvents) {
    return (
      <>
        {pageHeadData}
        <p className='center'>Loading...</p>
      </>
    )
  }

  const filteredYear = filterData[0]
  const filteredMonth = filterData[1]

  const numYear = +filteredYear
  const numMonth = +filteredMonth

  pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name='description'
        content={`All shows for ${numMonth}/${numYear}.`}
      />
    </Head>
  )

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/shows'>Show All Shows</Button>
        </div>
      </>
    )
  }

  const filteredEvents = loadedEvents.filter(show => {
    const showDate = new Date(show.date)
    return (
      showDate.getFullYear() === numYear &&
      showDate.getMonth() === numMonth - 1
    )
  })

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/shows'>Show All Shows</Button>
        </div>
      </>
    )
  }

  const date = new Date(numYear, numMonth - 1)

  return (
    <>
      {pageHeadData}
      <Results date={date} />
      <ShowGrid items={filteredEvents} />
    </>
  )
}

export default FilteredEventsPage
