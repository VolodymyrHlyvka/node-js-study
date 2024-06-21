const { ObjectId } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

const { getDb } = require("../utils/database");

class Product {
  constructor(name, price, _id, userId) {
    this.name = name;
    this.price = price;
    this.id = uuidv4();
    this._id = _id;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    if (!this._id) {
      return db.collection("products").insertOne(this);
    }
    return db.collection("products").updateOne(
      { _id: new ObjectId(this._id) },
      {
        $set: {
          name: this.name,
          price: this.price,
        },
      }
    );
  }

  static fetchAll() {
    const db = getDb();
    return db.collection("products").find().toArray();
  }

  static findById(id) {
    const db = getDb();
    return db.collection("products").find({ id }).next();
  }

  static findByPk(id) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new ObjectId(id) })
      .next();
  }

  static deleteById(id) {
    const db = getDb();
    return db.collection("products").deleteOne({ id });
  }
}

module.exports = Product;
