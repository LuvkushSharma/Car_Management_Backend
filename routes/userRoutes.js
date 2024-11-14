const express = require("express");
const path = require("path");

const authController = require(path.join(
  __dirname,
  "../controllers/authController"
));
const userController = require(path.join(
  __dirname,
  "../controllers/userController"
));

const router = express.Router();

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */
router.route("/signup").post(authController.signUp);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Log in an existing user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Unauthorized
 */
router.route("/login").post(authController.login);

/**
 * @swagger
 * /users/logout:
 *   get:
 *     summary: Log out the current user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User logged out successfully
 */
router.route("/logout").get(authController.logout);

/**
 * @swagger
 * /users/checkAuth:
 *   get:
 *     summary: Check if user is authenticated
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User is authenticated
 *       401:
 *         description: Unauthorized
 */
router.route("/checkAuth").get(authController.isLoggedIn);

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get the profile of the logged-in user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile
 *       401:
 *         description: Unauthorized
 */
router.route("/profile").get(authController.protect, userController.getUser);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *       404:
 *         description: User not found
 */
router.route("/:id").get(userController.getUserById);

/**
 * @swagger
 * /users/deleteMe:
 *   delete:
 *     summary: Delete the current logged-in user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 */
router
  .route("/deleteMe")
  .delete(authController.protect, authController.deleteMe);

/**
 * @swagger
 * /users/update:
 *   patch:
 *     summary: Update user schema (password, etc.)
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *               passwordConfirm:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request
 */
router
  .route("/update")
  .patch(authController.protect, userController.updateUserSchema);

/**
 * @swagger
 * /users/updateMe:
 *   patch:
 *     summary: Update the current logged-in user's name or email
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request
 */
router
  .route("/updateMe")
  .patch(authController.protect, userController.updateNameEmail);

/**
 * @swagger
 * /users/forgotPassword:
 *   post:
 *     summary: Send a password reset link to the user's email
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset link sent
 *       404:
 *         description: User not found
 */
router.route("/forgotPassword").post(authController.forgotPassword);

/**
 * @swagger
 * /users/resetPassword/{token}:
 *   patch:
 *     summary: Reset password using token
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Password reset token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *               passwordConfirm:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Bad request
 */
router.route("/resetPassword/:token").patch(authController.resetPassword);

/**
 * @swagger
 * /users/contact:
 *   post:
 *     summary: Contact us form submission
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Message sent successfully
 */
router.route("/contact").post(authController.contactUs);

module.exports = router;
