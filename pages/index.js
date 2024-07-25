import { useState, useEffect } from 'react';
import FeaturedShows from '@/components/home-page/featured-shows';
import Newsletter from '@/components/input/newsletter';
import Head from 'next/head';
import Starfleet from '@/components/home-page/starfleet';
import { fetchFeaturedShows } from '@/helpers/api-util';
import Pagination from '@/components/ui/pagination';
import router from 'next/router';

function HomePage(props) {
  const [currentPage, setCurrentPage] = useState(props.initialPage);
  const [isBottom, setIsBottom] = useState(false);

  function handlePageChange(newPage) {
    setCurrentPage(newPage);
    router.push(`/?page=${newPage}`);
  }
  
  const totalPages = Math.ceil(props.totalShows / 15);

  useEffect(() => {
    function handleScroll() {
      const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;
      setIsBottom(bottom);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {}, [isBottom]);

  return (
    <>
      <Head>
        <title>Featured Shows in NY</title>
        <meta
          name='description'
          content='Our top picks for shows to see in NY'
        />
      </Head>
      <Starfleet />
      <Newsletter />
      <FeaturedShows shows={props.shows} />
      <div className="pagination-wrapper-default">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          customClass="pagination-wrapper-index"
        />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const page = context.query.page ? parseInt(context.query.page, 10) : 1;

  try {
    const { shows, totalShows } = await fetchFeaturedShows(page);

    return {
      props: {
        shows: JSON.parse(JSON.stringify(shows)),
        totalShows,
        initialPage: page,
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);

    return {
      props: {
        shows: [],
        totalShows: 0,
        initialPage: 1,
        error: 'Error in getFeaturedShows',
      },
    };
  }
}

export default HomePage;
