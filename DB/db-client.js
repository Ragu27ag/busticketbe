import { MongoClient } from "mongodb";

// const url = "mongodb://0.0.0.0:27017/";

const url = process.env.CONNECTION_URL;

const client = new MongoClient(url);

client.connect();

console.log("db connected");

export default client;
