import FeaturedShows from '@/components/home-page/featured-shows'
import Newsletter from '@/components/input/newsletter'
function HomePage (props) {
  return (
    <>
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
