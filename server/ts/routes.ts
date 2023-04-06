import express, { Request, Response } from "express";
import resController  from "./resController";
import revController from "./revController";
import userController from "./userController";
import imgController from "./imgController";

// Create a new router object
const router = express.Router();

// Define routes for images
router
  .get("/images", imgController.getAllImages)
  .post("/images/new", imgController.createImage)
  .put("/images/update/:id", imgController.updateImage)
  .delete("/images/delete/:id", imgController.deleteImage)

// Define routes for restaurants
router
  .get("/restaurants", resController.getAllRestaurants)
  .post("/restaurants/new", resController.createRestaurant)
  .put("/restaurants/update/name/:id", resController.updateRestaurant)
  .delete("/restaurants/delete/:id", resController.deleteRestaurant);

// Define routes for users
router
  .get("/users", userController.getAllUsers)
  .post("/users/new", userController.createUser)
  .put("/users/update/name/:id", userController.updateUser)
  .delete("/users/delete/:id", userController.deleteUser)

// Define routes for reviews
router
  .get("/reviews", revController.getAllReviews)
  .get("/reviews/avg/:id", revController.getAverage);

export default router;
