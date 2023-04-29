import { Restaurant_Collection } from "./class/Restaurant_Collection.js";
import { Restaurant } from "./class/Restaurant.js";
//import { Gallery } from "./class/Gallery.js";
//import { Image } from "./class/Image.js";

const BACKEND_ROOT_URL = "http://localhost:3001/api/restaurants";

/* const restaurants: Restaurant_Collection = new Restaurant_Collection(BACKEND_ROOT_URL);

restaurants
  .getRestaurants()
  .then((restaurants: Array<Restaurant>) => {
    restaurants.forEach((restaurant) => {
      renderRestaurant(restaurant);
    });
  })
  .catch((error) => {
    alert(error);
  }); */

  /*
const gallery: Gallery = new Gallery(BACKEND_ROOT_URL);

gallery
  .getImages()
  .then((images: Array<Image>) => {
    images.forEach((image) => {
      renderReview(image);
    });
  })
  .catch((error) => {
    alert(error);
  });
*/
  

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
      //set the first restaurant as default ,change it later for another restaurant page
      renderRestaurant(restaurant_data[1]);
      renderReview(restaurant_data[1]);
  }})
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
  h6Element.textContent = `average/${restaurant_data.average_stars}`;

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


// let reviews_data = [];
// fetch("http://localhost:3001/api/reviews")
//   .then((response) => response.json())
//   .then((json) => {
//     console.log("full json", json);
//     reviews_data = json;

//     console.log("reviews_data", reviews_data.length);

//     //show all restaurants
//     if (reviews_data) {
//       // excute only if restaurant_data is not undefined
//       for (let i = 0; i < restaurant_data.length; i++) {
//         console.log("-------title",reviews_data[i].review_title);
//       }
//     }
//   })
//   .catch((error) => console.log(error));

/* 
  <div class="col-lg-4 col-sm-6">
            <div class="recommendation">
              <img src="../server/public/images/breads.jpg" alt="food">
              <div class="beforeoverlay">
                <h4 class="text-white">stars: number / title / date</h4>
               </div>
               <div class="overlay">
                <h4 class="text-white">stars: number / title / date</h4>
                <p class="text-white">
                  id: number
                  title: string
                  body: string
                  stars: number
                  restaurant_id: number
                  user_id: number
                  date: string</p>
              </div>
            </div> */

//dom 
const parentID2 = "full-reviews";

function renderReview( restaurant_data: any) {
  if (!restaurant_data) return; // checking null

    for (let i = 0; i < restaurant_data.reviews.length; i++) {
      

      // create div element with class "col-lg-4 col-sm-6"
      const divElement = document.createElement("div");
      divElement.className = "col-lg-4 col-sm-6";

      // create div element with class "recommendation"
      const divElement2 = document.createElement("div");
      divElement2.className = "recommendation";

      // !create img element with src "../server/public/images/breads.jpg" and alt "food"
      const imgElement = document.createElement("img");
      imgElement.src = "../server/public/images/breads.jpg";
      imgElement.alt = "food";

      // create div element with class "beforeoverlay"
      const divElement3 = document.createElement("div");
      divElement3.className = "beforeoverlay";

      // create h4 element with class "text-white" and text content "stars: number / title / date"
      const h4Element = document.createElement("h4");
      h4Element.className = "text-white";
      h4Element.textContent = `${restaurant_data.reviews[i].stars} / ${restaurant_data.reviews[i].review_title} `;

      // create div element with class "overlay"
      const divElement4 = document.createElement("div");
      divElement4.className = "overlay";

      // create h4 element with class "text-white" and text content "stars: number / title / date"
      const h4Element2 = document.createElement("h4");
      h4Element2.className = "text-white";

      
      h4Element2.textContent = `${restaurant_data.reviews[i].stars} / ${restaurant_data.reviews[i].review_title} `; 

      // create p element with class "text-white" and text content "id: number title: string body: string stars: number restaurant_id: number user_id: number date: string"
      const pElement = document.createElement("p");
      pElement.className = "text-white";

      // show only year-month-day
      const dateString = restaurant_data.reviews[i].created_at;
      const date = dateString.substring(0, 10);

      pElement.textContent = `${restaurant_data.reviews[i].review_body} date: ${date}`;

      // append child elements to div element
      divElement.appendChild(divElement2);

      divElement2.appendChild(imgElement);
      divElement2.appendChild(divElement3);
      divElement2.appendChild(divElement4);

      divElement3.appendChild(h4Element);
      divElement4.appendChild(h4Element2);
      divElement4.appendChild(pElement);

      // get parent element and append div element to it
      const parentElement = document.getElementById(parentID2);
      if (parentElement) {
        parentElement.appendChild(divElement);
      }
    }

}
