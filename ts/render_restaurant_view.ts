import { Restaurant_Collection } from "./class/Restaurant_Collection.js";
import { Restaurant } from "./class/Restaurant.js";

const BACKEND_ROOT_URL = "http://localhost:3001/api/restaurants";

const gallery: Restaurant_Collection = new Restaurant_Collection(BACKEND_ROOT_URL);

gallery
  .getRestuarants()
  .then((restaurants: Array<Restaurant>) => {
    restaurants.forEach((restaurant) => {
      renderRestaurant(restaurant);
    });
  })
  .catch((error) => {
    alert(error);
  });

function renderRestaurant(restaurant_from_db) {
  // create div element with class "col-md-8 mx-auto text-center"
  const divElement = document.createElement('div');
  divElement.className = 'col-md-8 mx-auto text-center';

  // create h6 element with class "text-success" and text content "More about restaurant"
  const h6Element = document.createElement('h6');
  h6Element.className = 'text-success';
  h6Element.textContent = 'More about restaurant';

  // create h1 element with text content "Name / Rocket Burger"
  const h1Element = document.createElement('h1');
  h1Element.textContent = 'Name / Rocket Burger';

  // create p element with text content "phone_number: string street_address: string city: string zip_code: string"
  const pElement = document.createElement('p');
  pElement.textContent = `phone_number: ${restaurant_from_db.phone_number} street_address: ${restaurant_from_db.street_address} city: ${restaurant_from_db.city} zip_code: ${restaurant_from_db.zip_code}`;

  // append child elements to div element
  divElement.appendChild(h6Element);
  divElement.appendChild(h1Element);
  divElement.appendChild(pElement);

  // // get parent element and append div element to it
  // const parentElement = document.getElementById(parentID);
  // if (parentElement) {
  //   parentElement.appendChild(divElement);
  // }
}