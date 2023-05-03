import { Restaurant_Collection } from "./class/Restaurant_Collection.js";
import { Restaurant } from "./class/Restaurant.js";

const BACKEND_ROOT_URL = "http://localhost:3001/api/restaurants";

const restaurants: Restaurant_Collection = new Restaurant_Collection(BACKEND_ROOT_URL);

const restaurantSelect: HTMLSelectElement = document.querySelector("#restaurant-select")

restaurants
  .getRestaurants()
  .then((restaurants: Array<Restaurant>) => {
    restaurants.forEach((restaurant) => {
      renderRestaurantNames(restaurant);
    });
  })
  .catch((error) => {
    alert(error);
  });

  const renderRestaurantNames = (restaurant_from_db) => {
    const option: HTMLOptionElement = document.createElement("option")
    option.value = restaurant_from_db.restaurant_name
    option.innerText = restaurant_from_db.restaurant_name
    restaurantSelect.appendChild(option)    
  }