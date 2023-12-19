import {
  connectDatabase,
  getAllDocuments,
  insertDocument
} from '../../../helpers/db-util'

async function handler (req, res) {
  const showId = req.query.showId
  let client
  try {
    client = await connectDatabase()
  } catch (error) {
    res.status(500).json({ message: 'Connecting to db failed🚬💀💀💀' })
    return
  }

  if (req.method === 'POST') {
    const { email, name, text } = req.body

    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'invalid info' })
      client.close()
      return
    }

    const newComment = {
      email,
      name,
      text,
      showId
    }

    let result

    try {
      result = await insertDocument(client, 'comments', newComment)
      res.status(201).json({ message: 'success', comment: newComment })
    } catch (error) {
      res.status(500).json({ message: 'inserting to db faild 💀💀💀🚬' })
    }
  }

  if (req.method === 'GET') {
    let documents
    try {
      documents = await getAllDocuments(
        client,
        'comments',
        { _id: -1 },
        { showId: showId }
      )
      res.status(200).json({ comments: documents })
    } catch (error) {
      res.status(500).json({ message: 'Error fetching documentsdocuments🚬🚬' })
    }
  }
  client.close()
}

export default handler
