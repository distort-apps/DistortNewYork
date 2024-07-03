import Show from '../../../models/show-model'
import { connectDb } from '@/helpers/db-util';

async function handler(req, res) {
  const { query, page = 1, limit = 10 } = req.query;

  if (req.method === 'GET') {
    try {
      await connectDb();
    } catch (error) {
      console.error('Error connecting to database:', error);
      res.status(500).json({ message: 'Error connecting to database' });
      return;
    }
    try {
      const regexQuery = new RegExp(query, 'i');
      const skip = (page - 1) * limit;

      const totalShows = await Show.countDocuments({
        $or: [
          { title: { $regex: regexQuery } },
          { genre: { $regex: regexQuery } },
          { location: { $regex: regexQuery } },
          { excerpt: { $regex: regexQuery } }
        ]
      });

      const documents = await Show.find({
        $or: [
          { title: { $regex: regexQuery } },
          { genre: { $regex: regexQuery } },
          { location: { $regex: regexQuery } },
          { excerpt: { $regex: regexQuery } }
        ]
      }).sort({ date: 1 }).skip(skip).limit(Number(limit));

      res.status(200).json({ shows: documents, totalShows });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching documents' });
    }
  } else {
    res.status(405).end(); 
  }
}

export default handler;
