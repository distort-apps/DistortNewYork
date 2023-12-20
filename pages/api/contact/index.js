import { connectDatabase, insertDocument } from '../../../helpers/db-util'
async function handler (req, res) {
  if (req.method === 'POST') {
    const { email, title, date, genre, time, price, url, excerpt } = req.body

    if (
      !email ||
      !email.includes('@') ||
      !title ||
      title.length === 0 ||
      !date ||
      date.length === 0 ||
      !genre ||
      genre.length === 0 ||
      !time ||
      time.length === 0 ||
      !price ||
      price.length === 0 ||
      !url ||
      url.length === 0 

    ) {
      res.status(422).json({ message: 'Invalid email address' })
      return
    }

    let client
    try {
      client = await connectDatabase()
    } catch (error) {
      res.status(500).json({ message: 'Connecting to db failed🚬💀💀💀' })
      return
    }

    const newPost = {
      email,
      title,
      date,
      genre,
      time,
      price,
      url,
      excerpt
    }

    let result
    try {
      result = await insertDocument(client, 'contact', newPost)
      res.status(201).json({ message: 'success', contact: newPost })
      client.close()
    } catch (error) {
      res.status(500).json({ message: 'inserting to db faild 💀💀💀🚬' })
    }
  }
}
export default handler
