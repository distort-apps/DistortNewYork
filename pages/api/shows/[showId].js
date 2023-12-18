import {
  connectDatabase,
  getAllDocuments,
} from '../../../helpers/db-util'
import { ObjectId } from 'mongodb'

async function handler (req, res) {
  const showId = req.query.showId
  let client
  try {
    client = await connectDatabase()
  } catch (error) {
    res.status(500).json({ message: 'Connecting to db failed🚬💀💀💀' })
    return
  }

  if (req.method === 'GET') {
    const id = new ObjectId(showId)
    let documents
    try {
      documents = await getAllDocuments(
        client,
        'shows',
        {id: -1},
        { _id: id }
      )
      
      res.status(200).json({ shows: documents })
    } catch (error) {
      res.status(500).json({ message: 'Error fetching documentsdocuments🚬🚬' })
    }
  }
  client.close()
}

export default handler
