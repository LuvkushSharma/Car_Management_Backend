const express = require("express");
const {
  createCar,
  getAllCars,
  getCar,
  updateCar,
  deleteCar,
  searchCars,
} = require("../controllers/carController");
const { protect } = require("../controllers/authController");

const router = express.Router();

// Protect all car routes
router.use(protect);

/**
 * @swagger
 * tags:
 *   name: Car
 *   description: API for managing cars
 */

/**
 * @swagger
 * /cars:
 *   post:
 *     summary: Create a new car
 *     tags: [Car]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Car created successfully
 *       400:
 *         description: Bad request
 */
router.post("/", createCar);

/**
 * @swagger
 * /cars:
 *   get:
 *     summary: Get all cars of the logged-in user
 *     tags: [Car]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of cars retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", getAllCars);

/**
 * @swagger
 * /cars/search:
 *   get:
 *     summary: Search cars by keyword
 *     tags: [Car]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Keyword to search
 *     responses:
 *       200:
 *         description: Successful search
 *       401:
 *         description: Unauthorized
 */
router.get("/search", searchCars);

/**
 * @swagger
 * /cars/{id}:
 *   get:
 *     summary: Get details of a specific car
 *     tags: [Car]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Car ID
 *     responses:
 *       200:
 *         description: Car details retrieved successfully
 *       404:
 *         description: Car not found
 */
router.get("/:id", getCar);

/**
 * @swagger
 * /cars/{id}:
 *   put:
 *     summary: Update a car
 *     tags: [Car]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Car ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Car updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Car not found
 */
router.put("/:id", updateCar);

/**
 * @swagger
 * /cars/{id}:
 *   delete:
 *     summary: Delete a car
 *     tags: [Car]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Car ID
 *     responses:
 *       204:
 *         description: Car deleted successfully
 *       404:
 *         description: Car not found
 */
router.delete("/:id", deleteCar);

module.exports = router;
