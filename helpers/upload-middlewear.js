import multer from 'multer';

const storage = multer.memoryStorage(); // Use memory storage for simplicity

const uploadMiddleware = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB file size limit
  },
}).single('file'); // Assuming your file input is named 'file'

export default function (req, res, next) {
  uploadMiddleware(req, res, (err) => {
    if (err) {
      console.error('Error uploading file:', err);
      res.status(500).json({ error: 'Error uploading file' });
    } else {
      next();
    }
  });
}
