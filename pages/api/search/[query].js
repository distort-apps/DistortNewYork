import {
  connectDatabase,
  getAllDocuments,
  insertDocument
} from '../../../helpers/db-util'

async function handler (req, res) {
  const query = req.query.query
  let client
  try {
    client = await connectDatabase()
  } catch (error) {
    res.status(500).json({ message: 'Connecting to db failed🚬💀💀💀' })
    return
  }

  if (req.method === 'GET') {
    let documents
    try {
      documents = await getAllDocuments(
        client,
        'shows',
        { _id: -1 },
        {
          $or: [
            { title: { $regex: new RegExp(query, 'i') } },
            { genre: { $regex: new RegExp(query, 'i') } },
            { location: { $regex: new RegExp(query, 'i') } },
            { excerpt: { $regex: new RegExp(query, 'i') } }
          ]
        }
      )
      res.status(200).json({ shows: documents })
    } catch (error) {
      res.status(500).json({ message: 'Error fetching documentsdocuments🚬🚬' })
    }
  }
  client.close()
}

export default handler
