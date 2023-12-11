import FeaturedShows from "@/components/home-page/featured-shows"
import { getFeaturedSHows } from "@/show-dummy-data"

function HomePage(props) {
  return (
    <FeaturedShows shows={props.shows}/>
  )
}

export default HomePage

export async function getStaticProps(){

  // const featuredShows = await getFeaturedShows()

  const featuredShows = getFeaturedSHows()

  return {
    props: {
      shows: featuredShows
    },
    revalidate: 60
  }
}