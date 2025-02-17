const express = require("express");
const {
  createSubCategory,
  getAllSubCategories,
  getSubCategoryByIdOrName,
  updateSubCategory,
  getItemsBySubCategoryIdOrName
} = require("../controllers/subCategoryController");

const router = express.Router();

/**
 * @route POST /:categoryId
 * @description Create a new subcategory under a specific category.
 * @param {string} categoryId - The ID of the parent category.
 * @access Public
 */
router.post("/:categoryId", createSubCategory);

/**
 * @route GET /
 * @description Retrieve all subcategories.
 * @access Public
 */
router.get("/", getAllSubCategories);


/**
 * @route GET /details/:identifier
 * @description Retrieve a subcategory by its ID or name.
 * @param {string} identifier - The ID or name of the subcategory.
 * @access Public
 */
router.get("/:identifier", getSubCategoryByIdOrName);

router.get("/:identifier/items", getItemsBySubCategoryIdOrName);

/**
 * @route PATCH /:id
 * @description Update an existing subcategory.
 * @param {string} id - The ID of the subcategory to update.
 * @access Public
 */
router.patch("/:id", updateSubCategory);

module.exports = router;
