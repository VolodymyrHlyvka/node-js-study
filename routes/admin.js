const express = require("express");

const productController = require("../controllers/product");
const userController = require("../controllers/user");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.use(isAuth);

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         name:
 *           type: string
 *           description: The product name
 *         price:
 *           type: number
 *           description: The product price
 *         userId:
 *           type: string
 *           description: The ID of the user who added the product
 */

/**
 * @swagger
 * /admin/product:
 *   post:
 *     summary: Add a new product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The product was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Some server error
 */
router.post("/product", productController.addProduct);

router.put("/product", productController.updateProduct);

router.delete("/product/:id", productController.deleteProduct);

router.post("/user", userController.addUser);

router.get("/user/:id", userController.getUser);

module.exports = router;
