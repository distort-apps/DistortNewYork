import { fetchFeaturedShows } from "@/helpers/api-util";

async function handler(req, res) {

  if (req.method === 'GET') {
    try {
      const featuredShows = await fetchFeaturedShows();
      res.status(200).json({ shows: featuredShows });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching featured shows' });
    }
  }
}

export default handler;