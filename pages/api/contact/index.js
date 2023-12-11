import { connectDatabase, insertDocument } from '../../../helpers/db-util'
async function handler (req, res) {
    
    if (req.method === 'POST') {
        const { email, info } = req.body
        
        if (!email || !email.includes('@') || !info || info.length === 0) {
            res.status(422).json({ message: 'Invalid email address' })
            client.close()
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
      info
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
