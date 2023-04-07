import express, { Router } from "express";
import resController from "./controllers/resController";
import revController from "./controllers/revController";
import userController from "./controllers/userController";
import imgController from "./controllers/imgController";

// Create a new router object
const router: Router = express.Router();

// Define routes for images
router
  .get("/api/images", imgController.getAllImages)
  .get("/api/images/:id", imgController.getImageById)
  .post("/api/images", imgController.createImage)
  .put("/api/images/update/:id", imgController.updateImage)
  .delete("api/images/delete/:id", imgController.deleteImage);

// Define routes for restaurants
router
  .get("/api/restaurants", resController.getAllRestaurants)
  .get("/api/restaurant/:id", resController.getRestaurantById)
  .post("/apirestaurants", resController.createRestaurant)
  .put("/api/restaurants/update/name/:id", resController.updateRestaurant)
  .delete("/api/restaurants/delete/:id", resController.deleteRestaurant);

// Define routes for users
router
  .get("/api/users", userController.getAllUsers)
  .get("/api/users/:id", userController.getUserById)
  .post("/api/users", userController.createUser)
  .put("/api/users/update/:id", userController.updateUser)
  .delete("/api/users/delete/:id", userController.deleteUser);

// Define routes for reviews
router
  .get("/api/reviews", revController.getAllReviews)
  .get("/api/reviews/:id", revController.getReviewById)
  .get("/api/reviews/avg/:id", revController.getAverageStars)
  .post("/api/reviews", revController.createReview)
  .put("/api/reviews/update/:id", revController.updateReview)
  .delete("/api/reviews/delete/:id", revController.deleteReview)

export default router;
