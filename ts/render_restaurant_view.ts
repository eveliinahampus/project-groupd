import { Restaurant_Collection } from "./class/Restaurant_Collection.js";
import { Restaurant } from "./class/Restaurant.js";

const BACKEND_ROOT_URL = "http://localhost:3001/api/restaurants";

/* const gallery: Restaurant_Collection = new Restaurant_Collection(BACKEND_ROOT_URL);

gallery
  .getRestaurants()
  .then((restaurants: Array<Restaurant>) => {
    restaurants.forEach((restaurant) => {
      renderRestaurant(restaurant);
    });
  })
  .catch((error) => {
    alert(error);
  }); */
  

let restaurant_data = [];
fetch("http://localhost:3001/api/restaurants")
  .then((response) => response.json())
  .then((json) => {
    console.log("full json", json);
    restaurant_data = json;

    console.log("restaurant_data", restaurant_data.length);

    //show all restaurants
    if (restaurant_data) {
      // excute only if restaurant_data is not undefined
      for (let i = 0; i < restaurant_data.length; i++) {
        console.log("-------name",restaurant_data[i].restaurant_name);
      }
      renderRestaurant(restaurant_data[0]);

    }
  })
  .catch((error) => console.log(error));


const parentID = "restaurant-info";

function renderRestaurant( restaurant_data: any) {
  if (!restaurant_data) return; // checking null

  // create div element with class "col-md-8 mx-auto text-center"
  const divElement = document.createElement("div");
  divElement.className = "col-md-8 mx-auto text-center";

  // create h6 element with class "text-success" and text content "More about restaurant"
  const h6Element = document.createElement("h6");
  h6Element.className = "text-success";
  h6Element.textContent = "More about restaurant";

  // create h1 element with text content "Name / Rocket Burger"
  const h1Element = document.createElement("h1");
  h1Element.textContent = `${restaurant_data.restaurant_name}`;

  // create p element with text content "phone_number: string street_address: string city: string zip_code: string"
  const pElement = document.createElement("p");
  pElement.textContent = `${restaurant_data.street_address}  ,${restaurant_data.city}  , ${restaurant_data.zip_code} / ${restaurant_data.phone_number}`;

  // append child elements to div element
  divElement.appendChild(h6Element);
  divElement.appendChild(h1Element);
  divElement.appendChild(pElement);

  // get parent element and append div element to it
  const parentElement = document.getElementById(parentID);
  if (parentElement) {
    parentElement.appendChild(divElement);
  }
}

//review  section

