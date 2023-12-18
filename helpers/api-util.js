import { connectDatabase } from './db-util'
import { ObjectId } from 'mongodb'

export async function getFeaturedShows () {
  let client

  try {
    client = await connectDatabase()
    const db = client.db('gagz')
    const shows = await db
      .collection('shows')
      .find({ isFeatured: true })
      .sort({ _id: -1 })
      .limit(50)
      .toArray()

    return shows
  } catch (error) {
    console.error('Error in getFeaturedShows:', error)
    throw new Error('Internal Server Error')
  } finally {
    if (client) {
      client.close()
    }
  }
}

export async function getAllShows () {
  let client

  try {
    client = await connectDatabase()
    const db = client.db('gagz')
    const shows = await db
      .collection('shows')
      .find({})
      .sort({ _id: -1 })
      .limit(500)
      .toArray()

    return shows
  } catch (error) {
    console.error('Error in getAllShows:', error)
    throw new Error('Internal Server Error')
  } finally {
    if (client) {
      client.close()
    }
  }
}

export async function getShowById(id) {
  let client;

  try {
    client = await connectDatabase();
    const db = client.db('gagz');
    const show = await db.collection('shows').findOne({ _id: new ObjectId(id) });

    return show;
  } catch (error) {
    console.error('Error in getShowById:', error);
    throw new Error('Internal Server Error');
  } finally {
    if (client) {
      client.close();
    }
  }
}
