import { Gallery } from "./class/Gallery.js";
import { Image } from "./class/Image.js";
import { Restaurant_Collection } from "./class/Restaurant_Collection.js";
import { Restaurant } from "./class/Restaurant.js";

const BACKEND_ROOT_URL_IMAGES = "http://localhost:3001/api/images";

const gallery: Gallery = new Gallery(BACKEND_ROOT_URL_IMAGES);

gallery
  .getImages()
  .then((images: Array<Image>) => {
    images.forEach((image) => {
      renderImage(image);
    });
  })
  .catch((error) => {
    alert(error);
  });

const renderImage = (image_from_db) => {
  const images_div: HTMLDivElement = <HTMLDivElement>(
    document.querySelector("#recommendations-container")
  );

  const imgDiv: HTMLDivElement = document.createElement("div");
  imgDiv.setAttribute("class", "col-lg-4 col-sm-6");

  const serviceDiv = document.createElement("div");
  serviceDiv.setAttribute("class", "service card-effect");
  serviceDiv.style.borderRadius = "5%"
  serviceDiv.addEventListener("click", test)

  const iconsDiv = document.createElement("div");
  iconsDiv.classList.add("icons","pb-2");

  // Displays rating-stars
  const starsDiv = document.createElement("div");
  starsDiv.classList.add("stars");
  // for (let i = 0; i < 4; i++) {
  //   const starIcon = document.createElement("i");
  //   starIcon.classList.add("bi", "bi-star-fill");
  //   starsDiv.appendChild(starIcon);
  // }
  const starIcon = document.createElement("i");
  starIcon.classList.add("bi", "bi-star-fill");
  starsDiv.appendChild(starIcon);
  const starsCount = document.createElement("p");
  starsCount.style.display = "inline"
  starsCount.textContent = "4.5";
  starsCount.classList.add("mx-2")
  starsDiv.appendChild(starsCount);
  iconsDiv.appendChild(starsDiv);

  // Displays the hearts
  const favoriteDiv = document.createElement("div");
  favoriteDiv.classList.add("favorite");
  const favoriteIcon = document.createElement("i");
  favoriteIcon.classList.add("bi", "bi-suit-heart-fill", "mx-2");
  const favoriteCount = document.createElement("p");
  favoriteCount.style.display = "inline"
  favoriteCount.textContent = "100";
  favoriteDiv.appendChild(favoriteIcon);
  favoriteDiv.appendChild(favoriteCount);
  iconsDiv.appendChild(favoriteDiv);

  // Displays number of reviews
  const recommendationDiv = document.createElement("div");
  recommendationDiv.classList.add("recommendation");
  const recommendationIcon = document.createElement("i");
  recommendationIcon.classList.add("bi", "bi-chat-left-dots", "mx-2");
  const recommendationCount = document.createElement("p");
  recommendationCount.style.display = "inline"
  recommendationCount.textContent = "32";
  recommendationDiv.appendChild(recommendationIcon);
  recommendationDiv.appendChild(recommendationCount);
  iconsDiv.appendChild(recommendationDiv);

  serviceDiv.appendChild(iconsDiv);

  const restaurantImage = document.createElement("img");
  restaurantImage.setAttribute("class", "restaurantImage img-fluid")
  restaurantImage.src = `http://localhost:3001/images/${image_from_db.img_name}`;
  restaurantImage.alt = "Tasty dinner here!";
  serviceDiv.appendChild(restaurantImage);

  const restaurantName = document.createElement("h5");
  restaurantName.setAttribute("class","mt-4 mb-2")
  restaurantName.textContent = "Royal Garden";
  serviceDiv.appendChild(restaurantName);

  const restaurantDescription = document.createElement("p");
  restaurantDescription.textContent =
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias expedita impedit neque dolorum eius veniam!";
  serviceDiv.appendChild(restaurantDescription);

  imgDiv.appendChild(serviceDiv);
  images_div.appendChild(imgDiv);
};


const BACKEND_ROOT_URL_RESTAURANTS = "http://localhost:3001/api/restaurants";

const restaurants: Restaurant_Collection = new Restaurant_Collection(BACKEND_ROOT_URL_RESTAURANTS);

function test() {
  restaurants
.getRestaurants()
.then((restaurants: Array<Restaurant>) => {
  restaurants.forEach((restaurant) => {
    renderRestaurant(restaurant);
  });
})
.catch((error) => {
  alert(error);
})
}

function renderRestaurant(restaurant_data:any) {
  const sectionView = document.querySelector("#services")
  sectionView.innerHTML = ""

// if (!restaurant_data) return; // checking null

// create div element with class "col-md-8 mx-auto text-center"
const divElement = document.createElement("div");
divElement.className = "col-md-8 mx-auto text-center";

// create h6 element with class "text-success" and text content "More about restaurant"
const h6Element = document.createElement("h6");
h6Element.className = "text-success";
h6Element.textContent = `average | ${restaurant_data.average_stars}`;

// create h1 element with text content "Name / Rocket Burger"
const h1Element = document.createElement("h1");
h1Element.textContent = `${restaurant_data.restaurant_name}`;

// create p element with text content "phone_number: string street_address: string city: string zip_code: string"
const pElement = document.createElement("p");
pElement.textContent = `${restaurant_data.street_address}  ,${restaurant_data.city}  , ${restaurant_data.zip_code} | ${restaurant_data.phone_number}`;

// append child elements to div element
divElement.appendChild(h6Element);
divElement.appendChild(h1Element);
divElement.appendChild(pElement);

// get parent element and append div element to it
const parentElement = document.getElementById("services");
if (parentElement) {
  parentElement.appendChild(divElement);
}
}