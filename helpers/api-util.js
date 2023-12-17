// import { connectDatabase, getAllDocuments } from "./db-util";

import { connectDatabase, getAllDocuments } from './db-util'

// let client
// try {
//   client = await connectDatabase()
// } catch (error) {
//     console.log(error)
//   return
// }

export async function getAllShows (collection, sort) {
    //     let client
    // try {
    //      client = await connectDatabase()
    // } catch (error) {
    //     console.log(error)
    // }
    //     let shows
    // try {
    //     shows = await getAllDocuments(client, collection, sort)

    //     console.log("shows", shows)
    //     client.close()
    // } catch (error) {
    //     console.log(error)
    // }

      const shows = await fetch('http://localhost:3000/api/shows')
    .then(res => res.json())
    .then(data => {
      let shows = data.shows
      return shows
    })
    return shows
//   
}

export async function getShowById(showId) {
    const show = await fetch(`http://localhost:3000/api/shows/${showId}`)
    .then(res => res.json())
    .then(data => {
      let show = data.shows
      return show
    })
    return show
}
