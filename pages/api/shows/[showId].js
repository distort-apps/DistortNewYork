import Show from '../../../models/show-model'
import { connectDb } from '@/helpers/db-util';
async function handler(req, res) {
  const showId = req.query.showId;

  if (req.method === 'GET') {
    try {
      await connectDb();
      const document = await Show.findById(showId);

      if (document) {
        res.status(200).json({ show: document });
      } else {
        res.status(404).json({ message: 'Event not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching the event' });
    }
  }
}

export default handler;
