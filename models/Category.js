const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const categorySchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  name: String,
  image: String,
  description: String,
  taxApplicability: Boolean,
  tax: { type: Number, default: 0 },
  taxType: String,
});

module.exports = mongoose.model("Category", categorySchema);
