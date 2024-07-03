import { connectDb } from './db-util'
import Show from '@/models/show-model'

export async function fetchFeaturedShows (page = 1, limit = 15) {
  try {
    await connectDb()

    const skip = (page - 1) * limit
    const shows = await Show.find({
      isFeatured: true
    })
      .sort({ date: 1 })
      .skip(skip)
      .limit(limit)
      .exec()

    const totalShows = await Show.countDocuments({ isFeatured: true })

    return { shows, totalShows }
  } catch (error) {
    console.error('Error fetching featured shows:', error)
    throw new Error('Failed to fetch featured shows')
  }
}

export async function fetchAllShows (page = 1, limit = 15) {
  try {
    await connectDb()

    const skip = (page - 1) * limit
    const shows = await Show.find({})
      .sort({ date: 1 })
      .skip(skip)
      .limit(limit)
      .exec()

    const totalShows = await Show.countDocuments({})

    console.log(totalShows)
    return { shows, totalShows }
  } catch (error) {
    console.error('Error in fetchAllShows:', error)
    throw new Error('Internal Server Error')
  }
}

export async function getShowById (id) {
  try {
    const connection = await connectDb()
    const show = await Show.findById(id)
    return show
  } catch (error) {
    console.error('Error in getShowById:', error)
    throw new Error('Internal Server Error')
  }
}
