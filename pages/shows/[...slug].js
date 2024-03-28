import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Results from '@/components/shows/show-detail/results'
import ErrorAlert from '@/components/ui/error-alert'
import Button from '@/components/ui/button'
import Head from 'next/head'
import ShowGrid from '@/components/shows/show-grid'

function DateFilterPage () {
  const [loadedShows, setLoadedShows] = useState([])
  const router = useRouter()

  const filterData = router.query.slug

  const { data, error } = useSWR(
    '/api/shows',
    url => fetch(url).then(res => res.json())
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
      <title>Filtered Shows</title>
      <meta name='description' content={`A list of filtered shows.`} />
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

  const filteredYear = filterData[0]
  const filteredMonth = filterData[1]

  const numYear = +filteredYear
  const numMonth = +filteredMonth

  pageHeadData = (
    <Head>
      <title>Filtered Shows</title>
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
    numMonth > 12 ||
    error
  ) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/shows'>show All events</Button>
        </div>
      </>
    )
  }
  const filteredShows = loadedShows.filter(loadedShow => {
    const showDate = new Date(loadedShow.date)
    return (
      showDate.getFullYear() === numYear && showDate.getMonth() === numMonth - 1
    )
  })

  if (!filteredShows || filteredShows.length === 0) {
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

  const date = new Date(numYear, numMonth - 1)

  return (
    <>
      {pageHeadData}
      <Results date={date} />
      <ShowGrid items={filteredShows} />
    </>
  )
}

export default DateFilterPage