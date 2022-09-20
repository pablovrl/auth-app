import { MongoClient, Db } from "mongodb";

const URI = process.env.MONGODB_URI;
const DB = process.env.MONGODB_DB_NAME;

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connecToDatabase() {
  if (cachedClient && cachedDb) return { client: cachedClient, db: cachedDb };

  if (!URI) {
    throw new Error("The MONGODB_URI environment variable is missing.");
  }

  if (!DB) {
    throw new Error("The MONGODB_DB_NAME environment variable is missing.");
  }

  const client = new MongoClient(URI);
  await client.connect();
  const db = client.db(DB);

  cachedClient = client;
  cachedDb = db;

  return {
    client: cachedClient,
    db: cachedDb,
  };
}

