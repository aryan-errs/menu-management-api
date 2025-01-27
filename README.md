# API Documentation

This API provides routes and models to manage items, categories, and subcategories in a system. Below are the details for each resource and their associated routes and models.

---

## **Items API**

### Base URL: `/items`

#### **Create an Item**

- **Method:** `POST`
- **Endpoint:** `/`
- **Description:** Create a new item.
- **Request Body:**

  ```json
  {
    "name": "Item Name",
    "description": "Item Description",
    "price": 100,
    "categoryId": "12345",
    "subCategoryId": "67890"
  }
  ```

#### **Get All Items**

- **Method:** `GET`
- **Endpoint:** `/`
- **Description:** Retrieve all items.

#### **Get Items by Category**

- **Method:** `GET`
- **Endpoint:** `/category/:categoryId`
- **Description:** Retrieve items under a specific category.

#### **Get Items by Subcategory**

- **Method:** `GET`
- **Endpoint:** `/subcategory/:subCategoryId`
- **Description:** Retrieve items under a specific subcategory.

#### **Get an Item by ID or Name**

- **Method:** `GET`
- **Endpoint:** `/details/:identifier`
- **Description:** Retrieve an item by its ID or name.

#### **Update an Item**

- **Method:** `PATCH`
- **Endpoint:** `/:id`
- **Description:** Update an existing item's details.
- **Request Body:**

  ```json
  {
    "name": "Updated Item Name"
  }
  ```

#### **Search Items by Name**

- **Method:** `GET`
- **Endpoint:** `/search`
- **Description:** Search for items by their name.

---

## **Categories API**

### Base URL: `/categories`

#### **Create a Category**

- **Method:** `POST`
- **Endpoint:** `/`
- **Description:** Create a new category.
- **Request Body:**

  ```json
  {
    "name": "Electronics",
    "image": "http://example.com/electronics.jpg",
    "description": "All kinds of electronic items",
    "taxApplicability": true,
    "tax": 10,
    "taxType": "GST"
  }
  ```

#### **Get All Categories**

- **Method:** `GET`
- **Endpoint:** `/`
- **Description:** Retrieve a list of all categories.

#### **Get a Category by ID or Name**

- **Method:** `GET`
- **Endpoint:** `/:identifier`
- **Description:** Retrieve a category by its ID or name.

#### **Get Subcategories of a Category**

- **Method:** `GET`
- **Endpoint:** `/:identifier/subcategories`
- **Description:** Retrieve all subcategories under a specific category.

#### **Get Items of a Category**

- **Method:** `GET`
- **Endpoint:** `/:identifier/items`
- **Description:** Retrieve items belonging to a specific category.

#### **Update a Category**

- **Method:** `PATCH`
- **Endpoint:** `/:id`
- **Description:** Update an existing category's details.
- **Request Body:**

  ```json
  {
    "name": "Updated Category Name"
  }
  ```

---

## **Subcategories API**

### Base URL: `/subcategories`

#### **Create a Subcategory**

- **Method:** `POST`
- **Endpoint:** `/:categoryId`
- **Description:** Create a new subcategory under a specific category.
- **Request Body:**

  ```json
  {
    "name": "Laptops",
    "description": "All kinds of laptops"
  }
  ```

#### **Get All Subcategories**

- **Method:** `GET`
- **Endpoint:** `/`
- **Description:** Retrieve all subcategories.

#### **Get a Subcategory by ID or Name**

- **Method:** `GET`
- **Endpoint:** `/:identifier`
- **Description:** Retrieve a subcategory by its ID or name.

#### **Get Items by Subcategory**

- **Method:** `GET`
- **Endpoint:** `/:identifier/items`
- **Description:** Retrieve items belonging to a specific subcategory.

#### **Update a Subcategory**

- **Method:** `PATCH`
- **Endpoint:** `/:id`
- **Description:** Update an existing subcategory's details.
- **Request Body:**

  ```json
  {
    "name": "Updated Subcategory Name"
  }
  ```

---

## **Models**

### **Item Model**

- **Fields:**
  - `_id` (String, default: UUID)
  - `categoryId` (String, references `Category`)
  - `subCategoryId` (String, references `SubCategory`, default: null)
  - `name` (String)
  - `image` (String)
  - `description` (String)
  - `taxApplicability` (Boolean)
  - `tax` (Number, default: 0)
  - `baseAmount` (Number)
  - `discount` (Number)
  - `totalAmount` (Number)

### **Category Model**

- **Fields:**
  - `_id` (String, default: UUID)
  - `name` (String)
  - `image` (String)
  - `description` (String)
  - `taxApplicability` (Boolean)
  - `tax` (Number, default: 0)
  - `taxType` (String)

### **Subcategory Model**

- **Fields:**
  - `_id` (String, default: UUID)
  - `categoryId` (String, references `Category`)
  - `name` (String)
  - `image` (String)
  - `description` (String)
  - `taxApplicability` (Boolean, default: null)
  - `tax` (Number, default: null)

---

## Notes

- All endpoints are public and require no authentication.
- Request and response formats are in JSON.
- Replace `:identifier`, `:id`, or `:categoryId` with actual IDs or names during requests.
