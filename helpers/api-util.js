import { connectDb } from './db-util'
import Show from '@/models/show-model'
export async function fetchFeaturedShows () {
  try {
    const connection = await connectDb()

    const featuredShows = await Show.find({ isFeatured: true })
      .sort({ rating: 1 })
      .exec()

    return featuredShows
  } catch (error) {
    console.error('Error fetching featured shows:', error)
    throw new Error('Failed to fetch featured shows')
  }
}

export async function fetchAllShows () {
  try {
    const connection = await connectDb()
    const shows = await Show.find({}).sort({ date: 1 }).limit(500).exec()
    return shows
  } catch (error) {
    console.error('Error in getAllShows:', error)
    throw new Error('Internal Server Error')
  }
}

export async function getShowById(id) {
  try {
    const show = await Show.findById(id);
    return show;
  } catch (error) {
    console.error('Error in getShowById:', error);
    throw new Error('Internal Server Error');
  }
}




