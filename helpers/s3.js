// s3.js
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.NEXT_AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY,
  },
});

export async function uploadToS3(filePath, filename) {
  try {
    const fileContent = await readFile(filePath);

    const params = {
      Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
      Key: filename,
      Body: fileContent,
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw error;
  }
}

async function readFile(filePath) {
  // Read file content
  // Implement this based on your needs, e.g., using fs.promises.readFile
}
