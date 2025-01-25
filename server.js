require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const dbConnect = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

// initialize app
const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(helmet()); // Add security headers


// limiting rate of requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

dbConnect();


// Define routes
app.use("/categories", require("./routes/categoryRoutes"));
app.use("/subcategories", require("./routes/subCategoryRoutes"));
app.use("/items", require("./routes/itemRoutes"));


// Error Handler
app.use(errorHandler);


app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
