import FeaturedShows from "@/components/home-page/featured-shows"
import { getFeaturedShows } from "@/show-dummy-data"

function HomePage(props) {
  return (
    <FeaturedShows shows={props.shows}/>
  )
}

export default HomePage

export async function getStaticProps(){

  const featuredShows = getFeaturedShows()
  console.log(featuredShows)

  return {
    props: {
      shows: featuredShows
    },
    revalidate: 60
  }
}