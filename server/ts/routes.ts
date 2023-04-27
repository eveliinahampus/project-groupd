import express, { Router } from "express";
import loggerMiddleware from "./middleware/logger";
import authenticate from "./middleware/authenticate";
import resController from "./controllers/resController";
import revController from "./controllers/revController";
import userController from "./controllers/userController";
import imgController from "./controllers/imgController";
import notFoundController from "./controllers/notFoundController";
import loginController from "./controllers/loginController"

// Create a new router object
const router: Router = express.Router();

// Middleware logger for all routes
//router.use("/api", [loggerMiddleware.logger, authorizeMiddleware.authorize])

// Define routes for images
router
  .get("/api/images", imgController.getAllImages)
  .post("/api/images", imgController.createImage)
  .get("/api/images/:id", imgController.getImageById)
  .put("/api/images/update/:id", imgController.updateImage)
  .delete("/api/images/delete/:id", imgController.deleteImage);

// Define routes for restaurants
router
  .get("/api/restaurants", resController.getAllRestaurants)
  .post("/api/restaurants", resController.createRestaurant)
  .get("/api/restaurants/:id", resController.getRestaurantById)
  .put("/api/restaurants/update/name/:id", resController.updateRestaurant)
  .delete("/api/restaurants/delete/:id", resController.deleteRestaurant);

// Define routes for users
router
  .get("/api/users", authenticate.verifyToken, userController.getAllUsers)
  .post("/api/users", userController.createUser)
  .get("/api/users/:id", authenticate.verifyToken, userController.getUserById)
  .put("/api/users/update/:id", userController.updateUser)
  .delete("/api/users/delete/:id", userController.deleteUser);

// Define routes for reviews (Basic CRUD operations first)
router
  .get("/api/reviews", revController.getAllReviews)
  .post("/api/reviews", revController.createReview)
  .get("/api/reviews/:id", revController.getReviewById)
  .put("/api/reviews/update/:id", revController.updateReview)
  .delete("/api/reviews/delete/:id", revController.deleteReview)
  .get("/api/reviews/avg/:id", revController.getAverageStars);

// Define login route
router.post("/api/login", loginController.login);

// Logout route - NOT IMPLEMENTED YET
router.post("/api/logout", authenticate.verifyToken, loginController.logout);

// Define route for error 404 (resource not found)
router.use("*", notFoundController.handle404Error);

export default router;
