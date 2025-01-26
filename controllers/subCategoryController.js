const SubCategory = require("../models/SubCategory");
const Category = require("../models/Category");

exports.createSubCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const subCategory = new SubCategory({
      ...req.body,
      categoryId,
      taxApplicability: req.body.taxApplicability ?? category.taxApplicability,
      tax: req.body.tax ?? category.tax,
    });

    await subCategory.save();
    res.status(201).json(subCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find().populate("categoryId");
    res.status(200).json(subCategories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getSubCategoryByIdOrName = async (req, res) => {
  try {
    const { identifier } = req.params;
    const subCategory = await SubCategory.findOne({
      $or: [{ _id: identifier }, { name: identifier }],
    }).populate("categoryId");

    if (subCategory) {
      res.status(200).json(subCategory);
    } else {
      res.status(404).json({ error: "Subcategory not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const subCategory = await SubCategory.findByIdAndUpdate(id, req.body, { new: true });

    if (subCategory) {
      res.status(200).json(subCategory);
    } else {
      res.status(404).json({ error: "Subcategory not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
