import mongoose from 'mongoose'

export async function connectDb() {
  const uri = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.${process.env.mongodb_database}/gagz?retryWrites=true&w=majority`
  return mongoose.connect(uri);
}