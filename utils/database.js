const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect("mongodb://root:example@localhost:27017/")
    .then((client) => {
      _db = client.db();
      console.log("Connected");
      callback();
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }

  throw "No Database Found";
};

exports.getDb = getDb;
exports.mongoConnect = mongoConnect;
