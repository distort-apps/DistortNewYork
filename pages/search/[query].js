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

function GenSearchPage () {
  const [loadedShows, setLoadedShows] = useState([])
  const [totalShows, setTotalShows] = useState(0) // Store total number of shows
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [isBottom, setIsBottom] = useState(false)
  const router = useRouter()

  const query = (router.query.query || '').toLowerCase()

  const { data, error } = useSWR(
    `/api/search/${query}?page=${currentPage}&limit=15`,
    url => fetch(url).then(res => res.json())
  )

  useScrollRestorationGen()

  useEffect(() => {
    if (data) {
      const showsArr = data.shows.map(show => ({ ...show }))
      setLoadedShows(showsArr)
      setTotalShows(data.totalShows) // Update total number of shows
      setTotalPages(Math.ceil(data.totalShows / 15))
    }
  }, [data])

  useEffect(() => {
    const storedPage = JSON.parse(sessionStorage.getItem(router.asPath))?.page
    if (storedPage) {
      setCurrentPage(parseInt(storedPage, 15))
    }
  }, [router.asPath])

  function handlePageChange (newPage) {
    setCurrentPage(newPage)
    router.push(`/search/${query}?page=${newPage}`, undefined, {
      shallow: true
    })
  }

  useEffect(() => {
    function handleScroll () {
      const bottom =
        Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.scrollHeight
      setIsBottom(bottom)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
      <title>Filtered Events</title>
      <meta name='description' content={`All shows for ${query}.`} />
    </Head>
  )

  if (!query || query.trim().length === 0 || error) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>lets try that again ...</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/shows'>show all events</Button>
        </div>
      </>
    )
  }

  if ((!data && !loadedShows) || loadedShows.length === 0) {
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

  return (
    <>
      {pageHeadData}
      <Results query={query} items={totalShows} />
      <ShowGrid items={loadedShows} />
      <div className='pagination-wrapper-default'>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          customClass='pagination-wrapper-default'
        />
      </div>
    </>
  )
}

export default GenSearchPage
