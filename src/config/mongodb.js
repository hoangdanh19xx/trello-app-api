import { MongoClient } from "mongodb";
import { env } from "*/config/environtment";

export const connectDB = async () => {
  const client = new MongoClient(env.MONGODB_URI);
  try {
    // connect the client to the server
    await client.connect();
    console.log("Connected successfully to server!");

    // List databases
    await listDatabases(client);
  } finally {
    // Ensures that the client will close when finish/error
    await client.close();
    console.log("closed");
  }
};

const listDatabases = async (client) => {
  const databasesList = await client.db().admin().listDatabases();
  console.log(databasesList);
  console.log("Your databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
};
