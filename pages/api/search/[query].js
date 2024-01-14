import Show from '../../../models/show-model'
import { connectDb } from '@/helpers/db-util';
async function handler(req, res) {
  const query = req.query.query;

  if (req.method === 'GET') {
    try {
      await connectDb();
    } catch (error) {
      console.error('Error connecting to database:', error);
    }
    try {
      const regexQuery = new RegExp(query, 'i');
      const documents = await Show.find({
        $or: [
          { title: { $regex: regexQuery } },
          { genre: { $regex: regexQuery } },
          { location: { $regex: regexQuery } },
          { excerpt: { $regex: regexQuery } }
        ]
      }).sort({ date: 1 });

      res.status(200).json({ shows: documents });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching documents🚬🚬' });
    }
  } else {
    res.status(405).end(); 
  }
}

export default handler;
