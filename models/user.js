const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

// allows us to add our custom functions to model
userSchema.methods.addToCart = function (product, quantity) {
  // if cart is empty
  if (!this.cart?.products.length) {
    this.cart.products = [{ productId: product._id, quantity: 1 }];
  } else {
    const cartProduct = this.cart.products.find(
      (cp) => cp.productId.toString() === product._id.toString()
    );

    // if we have a product in cart
    if (cartProduct) {
      this.cart.products = this.cart.products.map((cp) => {
        if (cp.productId.toString() === cartProduct.productId.toString()) {
          return {
            ...cp,
            quantity: quantity || cartProduct.quantity + 1,
          };
        }
        return cp;
      });
    }
    // if don't  have a product in cart
    else {
      this.cart.products.push({ productId: product._id, quantity: 1 });
    }
  }

  return this.save();
};

userSchema.methods.removeFromCart = function (product) {
  const cartProduct = this.cart.products.find(
    (cp) => cp.productId.toString() === product._id.toString()
  );

  if (cartProduct) {
    this.cart.products = this.cart.products.filter((cp) => {
      return cp.productId.toString() !== cartProduct.productId.toString();
    });
  }
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
