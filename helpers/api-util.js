import { connectDatabase, getAllDocuments } from './db-util'

export async function getAllShows (collection, sort) {
  const shows = await fetch('http://localhost:3000/api/shows')
    .then(res => res.json())
    .then(data => {
      let shows = data.shows
      return shows
    })
  return shows
  //
}

export async function getShowById (showId) {
  const show = await fetch(`http://localhost:3000/api/shows/${showId}`)
    .then(res => res.json())
    .then(data => {
      let show = data.shows
      return show
    })
  return show
}
