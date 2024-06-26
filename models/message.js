const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  toxicity: Number,
  severeToxicity: Number,
  identityAttack: Number,
  insult: Number,
  profanity: Number,
  threat: Number,
  type: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Message", messageSchema);
