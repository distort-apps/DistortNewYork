import FeaturedShows from '@/components/home-page/featured-shows'
import Newsletter from '@/components/input/newsletter'
import Head from 'next/head'
function HomePage (props) {
  return (
    <>
      <Head>
        <title>Featured Shows in NY</title>
        <meta name="description" content="Our top picks for shows to see this week in NY"/>
      </Head>
      <Newsletter />
      <FeaturedShows shows={props.shows} />
    </>
  )
}

export async function getStaticProps () {
  // const featuredShows = await getFeaturedShows()

  const featuredShows = await fetch('http://localhost:3000/api')
    .then(res => res.json())
    .then(data => {
      let shows = data.shows
      return shows
    })

  return {
    props: {
      shows: featuredShows
    },
    revalidate: 60
  }
}

export default HomePage
