const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");


const subCategorySchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  categoryId: { type: String, ref: "Category" },
  name: String,
  image: String,
  description: String,
  taxApplicability: { type: Boolean, default: null },
  tax: { type: Number, default: null },
});

module.exports = mongoose.model("SubCategory", subCategorySchema);
