const { getDb } = require("../utils/database");

class Cart {
  constructor(productId, userId) {
    this.productId = productId;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    return db.collection("carts").insertOne(this);
  }
}

module.exports = Cart;
