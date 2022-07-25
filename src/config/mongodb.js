import { MongoClient } from "mongodb";
import { env } from "*/config/environtment";

let dbInstance = null;

export const connectDB = async () => {
  const client = new MongoClient(env.MONGODB_URI);

  // connect the client to the server
  await client.connect();

  // assign clientDB to out dbInstance
  dbInstance = client.db(env.DATABASE_NAME);
};

// Get database instance
export const getDB = () => {
  if (!dbInstance) throw new Error("Must connect to database first!");
  return dbInstance;
};
