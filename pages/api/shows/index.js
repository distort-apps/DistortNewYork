import {
  connectDatabase,
  getAllDocuments,
  insertDocument, 
  insertDocuments 
} from '../../../helpers/db-util';

function isValidShow(show) {
  const { title, date, genre, location, time, price, image } = show;
  return title && date && genre && location && price && image && time;
}

async function handler(req, res) {
  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed' });
    return;
  }

  if (req.method === 'POST') {
    const data = req.body;

    if (Array.isArray(data)) {
      const allValid = data.every(isValidShow);
      if (!allValid) {
        res.status(422).json({ message: 'Invalid info in one or more shows' });
        client.close();
        return;
      }

      try {
        await insertDocuments(client, 'shows', data);
        res.status(201).json({ message: 'New Shows Added', shows: data });
      } catch (error) {
        res.status(500).json({ message: 'Inserting shows failed' });
      }
    } else {
      if (!isValidShow(data)) {
        res.status(422).json({ message: 'Invalid show data' });
        client.close();
        return;
      }

      try {
        await insertDocument(client, 'shows', data);
        res.status(201).json({ message: 'New Show Added', show: data });
      } catch (error) {
        res.status(500).json({ message: 'Inserting the show failed' });
      }
    }
  } else if (req.method === 'GET') {
    try {
      const documents = await getAllDocuments(client, 'shows', { date: 1 });
      res.status(200).json({ shows: documents });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching documents' });
    }
  }

  client.close();
}

export default handler;
