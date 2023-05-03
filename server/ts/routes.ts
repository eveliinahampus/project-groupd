import express, { Router } from "express";
import fileUpload from 'express-fileupload';
import authenticate from "./middleware/authenticate";
import resController from "./controllers/resController";
import revController from "./controllers/revController";
import userController from "./controllers/userController";
import imgController from "./controllers/imgController";
import notFoundController from "./controllers/notFoundController";
import authController from "./controllers/authcontroller"

// Create a new router object
const router: Router = express.Router();

// Define routes for images
router
  .get("/api/images", imgController.getAllImages)
  // .post("/api/images", imgController.createImage)
  .get("/api/images/:id", imgController.getImageById)
  .put("/api/images/update/:id", imgController.updateImage)
  .delete("/api/images/delete/:id", imgController.deleteImage);

// Define routes for restaurants
router
  .get("/api/restaurants", resController.getAllRestaurants)
  .post("/api/restaurants", fileUpload(),resController.createRestaurant)
  .get("/api/restaurants/:id", resController.getRestaurantById)
  .put("/api/restaurants/update/name/:id", resController.updateRestaurant)
  .delete("/api/restaurants/delete/:id", resController.deleteRestaurant);

// Define routes for users
router
  .get("/api/users", userController.getAllUsers)
  .post("/api/users", userController.createUser)
  .get("/api/users/:id", userController.getUserById)
  .put("/api/users/update/:id", userController.updateUser)
  .delete("/api/users/delete/:id", userController.deleteUser);

// Define routes for reviews
router
  .get("/api/reviews", revController.getAllReviews)
  .post("/api/reviews", fileUpload(), revController.createReview)
  .get("/api/reviews/:id", revController.getReviewById)
  .put("/api/reviews/update/:id", revController.updateReview)
  .delete("/api/reviews/delete/:id", revController.deleteReview)

// Define routes for authentification
router.post("/api/register")
router.post("/api/login", authController.login);
router.post("/api/logout", authenticate.verifyToken, authController.logout)
// Define route for error 404 (resource not found)
router.use("*", notFoundController.handle404Error);

export default router;
