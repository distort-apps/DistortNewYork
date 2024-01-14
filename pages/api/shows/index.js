import Show from '../../../models/show-model'
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
    const documents = await Show.find().sort({ date: 1 });
    res.status(200).json({ shows: documents });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching documents' });
  }
}

// Main handler function
async function handler(req, res) {
  if (req.method === 'POST') {
    console.log("hey psot");
    await handlePostRequest(req, res);
  } else if (req.method === 'GET') {
    console.log("hey get");

    await handleGetRequest(req, res);
  }
}

export default handler;

