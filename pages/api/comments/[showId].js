import Comment from '../../../models/comment-model';
import { connectDb } from '@/helpers/db-util';
async function handler(req, res) {
  try {
    await connectDb()
  } catch (error) {
  console.error('Error connecting to database:', error)
  }
  const showId = req.query.showId;

  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    if (!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
      return res.status(422).json({ message: 'Invalid input.' });
    }

    const newComment = new Comment({
      email,
      name,
      text,
      showId
    });

    try {
      await newComment.save();
      res.status(201).json({ message: 'Comment added successfully!', comment: newComment });
    } catch (error) {
      res.status(500).json({ message: 'Failed to add the comment.' });
    }
  }

  if (req.method === 'GET') {
    try {
      const comments = await Comment.find({ showId: showId }).sort({ _id: -1 });
      res.status(200).json({ comments: comments });
    } catch (error) {
      res.status(500).json({ message: 'Failed to get comments.' });
    }
  }
}

export default handler;
