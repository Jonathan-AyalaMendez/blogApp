const { MongoClient } = require("mongodb");

const connectionString = process.env.ATLAS_URI || "mongodb+srv://Jonathan1:cvLPJT9cRhtQVD8Q@cluster1.u7ljltl.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(connectionString);

let db;
module.exports = {
  con: async() => {
    db = await (await client.connect()).db("DB");

    console.log(db);
  },
  DB: ()=>{
    return db
  }
}