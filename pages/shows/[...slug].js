import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Results from '@/components/shows/show-detail/results'
import ErrorAlert from '@/components/ui/error-alert'
import Button from '@/components/ui/button'
import Head from 'next/head'
import ShowGrid from '@/components/shows/show-grid'
import Pagination from '@/components/ui/pagination'
import { useScrollRestorationGen } from '@/helpers/hooks/useScrollRestorationGen'

function DateFilterPage () {
  const [loadedShows, setLoadedShows] = useState([])
  const [totalShows, setTotalShows] = useState(0) // Store total number of shows
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [isBottom, setIsBottom] = useState(false)
  const router = useRouter()

  const filterData = router.query.slug
  const [filteredYear, filteredMonth] = filterData || []
  const numYear = parseInt(filteredYear, 10)
  const numMonth = parseInt(filteredMonth, 10)

  const { data, error } = useSWR(
    `/api/shows?year=${numYear}&month=${numMonth}&page=${currentPage}&limit=10`,
    url => fetch(url).then(res => res.json())
  )

  useScrollRestorationGen()

  useEffect(() => {
    if (data) {
      const showsArr = data.shows.map(show => ({ ...show }))
      setLoadedShows(showsArr)
      setTotalShows(data.totalShows) // Update total number of shows
      setTotalPages(Math.ceil(data.totalShows / 10))
    }
  }, [data])

  useEffect(() => {
    const storedPage = JSON.parse(sessionStorage.getItem(router.asPath))?.page;
    if (storedPage) {
      setCurrentPage(parseInt(storedPage, 10));
    }
  }, [router.asPath]);

  function handlePageChange (newPage) {
    setCurrentPage(newPage)
    router.push(`/shows/${numYear}/${numMonth}?page=${newPage}`, undefined, { shallow: true })
  }

  useEffect(() => {
    function handleScroll() {
      const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight
      setIsBottom(bottom)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  let pageHeadData = (
    <Head>
      <title>Filtered Shows</title>
      <meta name='description' content={`All shows for ${numMonth}/${numYear}.`} />
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
          <p>lets try that again ...</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/shows'>show All events</Button>
        </div>
      </>
    )
  }

  if (!loadedShows.length) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>no events found ...</p>
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
      <Results date={date} totalShows={totalShows} />
      <ShowGrid items={loadedShows} />
      {isBottom && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  )
}

export default DateFilterPage
