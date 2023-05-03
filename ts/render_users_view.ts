import { User_Collection } from "./class/User_Collection.js";
import { User } from "./class/User.js";

const BACKEND_ROOT_URL = "http://localhost:3001/api/users";

const users: User_Collection = new User_Collection(BACKEND_ROOT_URL);

users
  .getUsers()
  .then((users: Array<User>) => {
    users.forEach((user) => {
      renderUser(user);
    });
  })
  .catch((error) => {
    alert(error);
  });

function renderUser(user_data:any) {
  // Your code to render HTML goes here


}