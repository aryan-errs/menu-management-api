const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory")

exports.createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).send(category);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getCategories = async (req, res) => {
  const categories = await Category.find();
  res.send(categories);
};

exports.getCategoryByIdOrName = async (req, res) => {
  const { identifier } = req.params;
  const category = await Category.findOne({ $or: [{ _id: identifier }, { name: identifier }] });
  if (category) res.send(category);
  else res.status(404).send("Category not found");
};


exports.getSubCategoriesByCategoryIdOrName = async (req, res) => {
  try {
    const { identifier } = req.params;
    const subCategories = await SubCategory.findOne({ $or: [{ _id: identifier }, { name: identifier }] });
    res.status(200).json(subCategories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(category);
};
