const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    // This will create an new instance of "MongoMemoryServer" and automatically start it
    const mongod = await MongoMemoryServer.create();

    const uri = mongod.getUri();
    await mongoose.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
