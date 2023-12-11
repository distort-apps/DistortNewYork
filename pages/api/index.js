import {
  connectDatabase,
  getAllDocuments,
} from '../../helpers/db-util'

async function handler (req, res) {
  let client
  try {
    client = await connectDatabase()
  } catch (error) {
    res.status(500).json({ message: 'Connecting to db failed🚬💀💀💀' })
    return
  }
  // GET ALL shows
  if (req.method === 'GET') {
    let documents
    try {
      documents = await getAllDocuments(
        client,
        'shows',
        { _id: -1 },
        { isFeatured: true }
      )
      res.status(200).json({ shows: documents })
    } catch (error) {
      res.status(500).json({ message: 'Error fetching documentsdocuments🚬🚬' })
    }
  }
  client.close()
}

export default handler
