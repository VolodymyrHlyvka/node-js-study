const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect("mongodb://root:example@localhost:27017/")
    .then((client) => {
      console.log("Connected");
      callback(client);
    })
    .catch((err) => console.error(err));
};

module.exports = mongoConnect;
