const { ObjectId } = require("mongodb");

const { getDb } = require("../utils/database");

class User {
  constructor(name, email, cart, userId) {
    this.name = name;
    this.email = email;
    this.cart = cart;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  static findByPk(id) {
    const db = getDb();
    return db.collection("users").findOne({ _id: new ObjectId(id) });
  }

  getCart() {
    const db = getDb();

    return db
      .collection("products")
      .find({
        _id: {
          $in: this.cart.products.map((item) => item.productId),
        },
      })
      .toArray()
      .then((products) => {
        return products.map((product) => {
          return {
            ...product,
            quantity: this.cart.products.find(
              (item) => item.productId.toString() === product._id.toString()
            ).quantity,
          };
        });
      });
  }

  addToCart(product) {
    const db = getDb();
    const updatedCart = this.cart;

    // if cart is empty
    if (!this.cart?.products.length) {
      updatedCart.products = [{ productId: product._id, quantity: 1 }];
    } else {
      const cartProduct = updatedCart.products.find(
        (cp) => cp.productId.toString() === product._id.toString()
      );

      // if we have a product in cart
      if (cartProduct) {
        updatedCart.products = updatedCart.products.map((cp) => {
          if (cp.productId.toString() === cartProduct.productId.toString()) {
            return {
              ...cp,
              quantity: cartProduct.quantity + 1,
            };
          }
          return cp;
        });
      }
      // if don't  have a product in cart
      else {
        updatedCart.products.push({ productId: product._id, quantity: 1 });
      }
    }

    return db.collection("users").updateOne(
      { _id: new ObjectId(this.userId) },
      {
        $set: {
          cart: updatedCart,
        },
      }
    );
  }

  updateCart(product, quantity) {
    const db = getDb();
    const updatedCart = this.cart;

    const cartProduct = updatedCart.products.find(
      (cp) => cp.productId.toString() === product._id.toString()
    );

    if (cartProduct) {
      updatedCart.products = updatedCart.products.map((cp) => {
        if (cp.productId.toString() === product._id.toString()) {
          return {
            ...cp,
            quantity: parseInt(quantity),
          };
        }
        return cp;
      });

      return db.collection("users").updateOne(
        { _id: new ObjectId(this.userId) },
        {
          $set: {
            cart: updatedCart,
          },
        }
      );
    }
  }

  removeFromCart(product) {
    const db = getDb();
    const updatedCart = this.cart;

    const cartProduct = updatedCart.products.find(
      (cp) => cp.productId.toString() === product._id.toString()
    );

    if (cartProduct) {
      updatedCart.products = updatedCart.products.filter(
        (cp) => cp.productId.toString() !== product._id.toString()
      );

      return db.collection("users").updateOne(
        { _id: new ObjectId(this.userId) },
        {
          $set: {
            cart: updatedCart,
          },
        }
      );
    }
  }
}

module.exports = User;
