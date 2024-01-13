import { MongoClient } from 'mongodb'

export async function connectDatabase () {
  const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.${process.env.mongodb_database}.mongodb.net/?retryWrites=true&w=majority`
  const client = await MongoClient.connect(connectionString)

  return client
}

export async function insertDocument (client, collection, document) {
  const db = client.db(process.env.mongodb_clustername)

  const result = await db.collection(collection).insertOne(document)
  return result
}

export async function insertDocuments(client, collection, documents) {
  const db = client.db(process.env.mongodb_clustername);
  const result = await db.collection(collection).insertMany(documents);
  return result;
}

export async function getAllDocuments (client, collection, sort, filter = {}) {
  const db = client.db(process.env.mongodb_clustername)

  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray()

  return documents
}
