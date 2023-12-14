import { connectDatabase, getAllDocuments, insertDocument } from '../../../helpers/db-util'

async function handler (req, res) {
  let client
  try {
    client = await connectDatabase()
  } catch (error) {
    res.status(500).json({ message: 'Connecting to db failed🚬💀💀💀' })
    return
  }

  if (req.method === 'POST') {
    const { title, date, genre, location, price, isFeatured, image, excerpt } =
      req.body

      console.log(title, date, genre, location, price, isFeatured, image, excerpt)

    if (
      !title ||
      title.trim().length === 0 ||
      !date ||
      date.trim().length === 0 ||
      !genre ||
      genre.trim().length === 0 ||
      !location ||
      location.trim().length === 0 ||
      !price ||
      price.trim().length === 0 ||
      !image ||
      image.trim().length === 0 
    ) {
      console.log("propblem with data")
      res.status(422).json({ message: 'invalid info' })
      client.close()
      return
    }

    const newShow = {
       title,
       date,
       genre,
       location,
       price,
       isFeatured,
       image,
       excerpt
    }
    
    try {
      await insertDocument(client, 'shows', newShow)
      res.status(201).json({ message: 'New Show Added', show: newShow })
    } catch (error) {
      res.status(500).json({ message: 'inserting to db faild 💀💀💀🚬' })
    }
  }

  // GET ALL shows
  if (req.method === 'GET') {
    let documents
    try {
      documents = await getAllDocuments(client, 'shows', { _id: -1 })
      res.status(200).json({ shows: documents })
    } catch (error) {
      res.status(500).json({ message: 'Error fetching documentsdocuments🚬🚬' })
    }
  }
  client.close()
}

export default handler
