import { User_Collection } from "./class/User_Collection.js";
import { User } from "./class/User.js";

const BACKEND_ROOT_URL = "http://localhost:3001/api/users";

const gallery: User_Collection = new User_Collection(BACKEND_ROOT_URL);

gallery
  .getUsers()
  .then((restaurants: Array<User>) => {
    restaurants.forEach((restaurant) => {
      renderUser(restaurant);
    });
  })
  .catch((error) => {
    alert(error);
  });

function renderUser(user_data:any) {
  // Your code to render HTML goes here


}