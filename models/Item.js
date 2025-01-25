const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const schema = mongoose.Schema();

const itemSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  categoryId: { type: String, ref: "Category" },
  subCategoryId: { type: String, ref: "SubCategory", default: null },
  name: String,
  image: String,
  description: String,
  taxApplicability: Boolean,
  tax: { type: Number, default: 0 },
  baseAmount: Number,
  discount: Number,
  totalAmount: Number,
});

module.exports = mongoose.model("Item", itemSchema);
