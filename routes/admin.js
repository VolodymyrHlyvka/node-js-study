const express = require("express");

const productController = require("../controllers/product");
const userController = require("../controllers/user");

const router = express.Router();
 
/**
 * @swagger
 * /admin/product:
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
router.post("/product", productController.addProduct);

router.put("/product", productController.updateProduct);

router.delete("/product/:id", productController.deleteProduct);

router.post("/user", userController.addUser);

router.get("/user/:id", userController.getUser);

module.exports = router;
