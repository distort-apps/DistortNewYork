import Show from '../../../models/show-model'
import { connectDb } from '@/helpers/db-util';
import xss from 'xss'
function isValidShow(show) {
  const { title, date, genre, location, time, price, image } = show;
  return title && date && genre && location && price && image && time;
}

export async function handlePostRequest(req, res) {
  const data = req.body;

  if (Array.isArray(data)) {
    const allValid = data.every(isValidShow);
    if (!allValid) {
      res.status(422).json({ message: 'Invalid info in one or more shows' });
      return;
    } 

    try {
      for(let show of data) {
        show.excerpt = xss(show.excerpt)
      }
      const newShows = await Show.insertMany(data);
      res.status(201).json({ message: 'New Shows Added', shows: newShows });
    } catch (error) {
      res.status(500).json({ message: 'Inserting shows failed' });
    }
  } else {
    if (!isValidShow(data)) {
      res.status(422).json({ message: 'Invalid show data' });
      return;
    }

    try {
      data.excerpt = xss(data.excerpt)

      const newShow = new Show(data);
      await newShow.save();
      res.status(201).json({ message: 'New Show Added', show: newShow });
    } catch (error) {
      res.status(500).json({ message: 'Inserting the show failed' });
    }
  }
}

export async function handleGetRequest(req, res) {
  try {
    await connectDb();
    const documents = await Show.find().sort({ date: 1 });
    res.status(200).json({ shows: documents });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching documents' });
  }
}

async function handler(req, res) {
  try {
    await connectDb()
  } catch (error) {
  console.error('Error connecting to database:', error)
  }
  if (req.method === 'POST') {
    await handlePostRequest(req, res);
  } else if (req.method === 'GET') {

    await handleGetRequest(req, res);
  }
}

export default handler;

