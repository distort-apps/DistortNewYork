import ShowGrid from "@/components/shows/show-grid"
import { getAllShows } from "@/show-dummy-data"

function AllShowsPage ({shows}) {
    return (
        <ShowGrid items={shows}/>
    )
}


export async function getStaticProps() {
    const shows = getAllShows()
    
    return {
        props: {
            shows: shows
        },
        revalidate: 60
    }
}

export default AllShowsPage