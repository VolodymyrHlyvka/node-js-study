const express = require("express");

const productController = require("../controllers/product");

const router = express.Router();

/**
 * @swagger
 * /admin/add-product:
 *   get:
 *     summary: Display the add product form
 *     description: Renders an HTML form for adding a new product.
 *     responses:
 *       200:
 *         description: A form to add a product
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */
router.get("/add-product", productController.getAddProduct);

/**
 * @swagger
 * /admin/add-product:
 *   post:
 *     summary: Add a new product
 *     description: Receives form data to add a new product and redirects to the home page.
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product
 *               price:
 *                 type: string
 *                 description: The price of the product
 *     responses:
 *       302:
 *         description: Redirect to the home page
 */
router.post("/add-product", productController.addProduct);

module.exports = router;
