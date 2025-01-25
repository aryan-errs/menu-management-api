const express = require("express");
const {
  createItem,
  getAllItems,
  getItemsByCategoryId,
  getItemsBySubCategoryId,
  getItemByIdOrName,
  updateItem,
  searchItemsByName,
} = require("../controllers/itemController");

const router = express.Router();

// Create Item
router.post("/", createItem);

// Get all Items
router.get("/", getAllItems);

// Get Items under a Category
router.get("/category/:categoryId", getItemsByCategoryId);

// Get Items under a Sub-Category
router.get("/subcategory/:subCategoryId", getItemsBySubCategoryId);

// Get an Item by ID or Name
router.get("/details/:identifier", getItemByIdOrName);

// Edit an Item
router.patch("/:id", updateItem);

// Search Items by Name
router.get("/search", searchItemsByName);

module.exports = router;
