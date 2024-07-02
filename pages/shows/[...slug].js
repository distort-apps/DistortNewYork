import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Results from '@/components/shows/show-detail/results';
import ErrorAlert from '@/components/ui/error-alert';
import Button from '@/components/ui/button';
import Head from 'next/head';
import ShowGrid from '@/components/shows/show-grid';
import Pagination from '@/components/ui/pagination';

function DateFilterPage() {
  const [loadedShows, setLoadedShows] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isBottom, setIsBottom] = useState(false);
  const router = useRouter();

  const filterData = router.query.slug;

  const { data, error } = useSWR('/api/shows', (url) =>
    fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const showsArr = [];
      for (const key in data.shows) {
        showsArr.push({
          ...data.shows[key],
        });
      }
      setLoadedShows(showsArr);
    }
  }, [data]);

  useEffect(() => {
    if (loadedShows.length > 0) {
      const filteredYear = filterData ? filterData[0] : null;
      const filteredMonth = filterData ? filterData[1] : null;
      const numYear = +filteredYear;
      const numMonth = +filteredMonth;

      const filtered = loadedShows.filter((show) => {
        const showDate = new Date(show.date);
        return showDate.getFullYear() === numYear && showDate.getMonth() === numMonth - 1;
      });

      setFilteredShows(filtered);
      setTotalPages(Math.ceil(filtered.length / 10));
    }
  }, [loadedShows, filterData]);

  useEffect(() => {
    function handleScroll() {
      const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;
      setIsBottom(bottom);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  let pageHeadData = (
    <Head>
      <title>Filtered Shows</title>
      <meta name="description" content={`A list of filtered shows.`} />
    </Head>
  );

  if (!data) {
    return (
      <>
        {pageHeadData}
        <p className="center">Loading...</p>
      </>
    );
  }

  const filteredYear = filterData ? filterData[0] : null;
  const filteredMonth = filterData ? filterData[1] : null;
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  pageHeadData = (
    <Head>
      <title>Filtered Shows</title>
      <meta name="description" content={`All shows for ${numMonth}/${numYear}.`} />
    </Head>
  );

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
          <p>Let's try that again ...</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/shows">Show All Events</Button>
        </div>
      </>
    );
  }

  const paginatedShows = filteredShows.slice((currentPage - 1) * 10, currentPage * 10);

  if (filteredShows.length === 0 && currentPage === 1) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found ...</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/shows">Show All Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      {pageHeadData}
      <Results date={date} />
      <ShowGrid items={paginatedShows} />
      {isBottom && paginatedShows.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}

export default DateFilterPage;
