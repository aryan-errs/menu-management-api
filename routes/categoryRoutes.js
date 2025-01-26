const express = require("express");
const {
  createCategory,
  getCategories,
  getCategoryByIdOrName,
  getSubCategoriesByCategoryIdOrName,
  getItemsByCategoryIdOrName,
  updateCategory,
} = require("../controllers/categoryController");

const router = express.Router();

/**
 * @route POST /categories
 * @description Create a new category
 * @access Public
 * @example Request Body:
 * {
 *   "name": "Electronics",
 *   "image": "http://example.com/electronics.jpg",
 *   "description": "All kinds of electronic items",
 *   "taxApplicability": true,
 *   "tax": 10,
 *   "taxType": "GST"
 * }
 */
router.post("/", createCategory);

/**
 * @route GET /categories
 * @description Get a list of all categories
 * @access Public
 * @returns {Array} List of categories with attributes
 * @example Response:
 * [
 *   {
 *     "_id": "12345",
 *     "name": "Electronics",
 *     "image": "http://example.com/electronics.jpg",
 *     "description": "All kinds of electronic items",
 *     "taxApplicability": true,
 *     "tax": 10,
 *     "taxType": "GST"
 *   }
 * ]
 */
router.get("/", getCategories);

/**
 * @route GET /categories/:identifier
 * @description Get a category by ID or Name
 * @access Public
 * @param {string} identifier - ID or Name of the category
 * @returns {Object} Category details
 * @example URL: /categories/12345
 * @example URL: /categories/Electronics
 */
router.get("/:identifier", getCategoryByIdOrName);


/**
 * @route GET /categories/:id/subcategories/
 * @description Get all categories under a category
 * @access Public
 * @param {string} identifier - ID or Name of the category
 * @returns {Object} Category details
 * @example URL: /categories/12345
 * @example URL: /categories/Electronics
 */
router.get("/:identifier/subcategories", getSubCategoriesByCategoryIdOrName);


router.get("/:identifier/items", getItemsByCategoryIdOrName);

/**
 * @route PATCH /categories/:id
 * @description Update a category's attributes
 * @access Public
 * @param {string} id - ID of the category
 * @example Request Body:
 * {
 *   "name": "Updated Electronics"
 * }
 */
router.patch("/:id", updateCategory);

module.exports = router;
