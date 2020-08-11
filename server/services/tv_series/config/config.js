const { MongoClient } = require('mongodb');

const dbUrl = "mongodb://localhost:27017"
const dbName = process.env.DATABASE_NAME || "EntertainMe"

const client = new MongoClient(dbUrl, { useUnifiedTopology: true })

client.connect()

// var db;
const db = client.db(dbName) 

module.exports = db;
