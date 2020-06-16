const MongoDBAdapter = require("moleculer-db-adapter-mongo");
module.exports = new MongoDBAdapter(`${process.env.MONGO_DB}:${process.env.MONGO_PORT}`)
