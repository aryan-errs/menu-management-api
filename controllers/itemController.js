const Item = require("../models/Item");
const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");

// Create a new item
exports.createItem = async (req, res) => {
  try {
    const { categoryId, subCategoryId, name, image, description, taxApplicability, tax, baseAmount, discount } = req.body;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const subCategory = subCategoryId ? await SubCategory.findById(subCategoryId) : null;
    if (subCategoryId && !subCategory) {
      return res.status(404).json({ error: "Subcategory not found" });
    }

    const item = new Item({
      categoryId,
      subCategoryId: subCategoryId || null,
      name,
      image,
      description,
      taxApplicability: taxApplicability ?? (subCategory?.taxApplicability ?? category.taxApplicability),
      tax: tax ?? (subCategory?.tax ?? category.tax),
      baseAmount,
      discount,
      totalAmount: baseAmount - discount,
    });

    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all items
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find().populate("categoryId").populate("subCategoryId");
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get items by category ID
exports.getItemsByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const items = await Item.find({ categoryId }).populate("categoryId").populate("subCategoryId");
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get items by sub-category ID
exports.getItemsBySubCategoryId = async (req, res) => {
  try {
    const { subCategoryId } = req.params;
    const items = await Item.find({ subCategoryId }).populate("categoryId").populate("subCategoryId");
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get item by ID or name
exports.getItemByIdOrName = async (req, res) => {
  try {
    const { identifier } = req.params;
    const item = await Item.findOne({ $or: [{ _id: identifier }, { name: identifier }] }).populate("categoryId").populate("subCategoryId");
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an item
exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Search items by name
exports.searchItemsByName = async (req, res) => {
  try {
    const { name } = req.query;
    const items = await Item.find({ name: new RegExp(name, "i") }).populate("categoryId").populate("subCategoryId");
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
