

let restaurant_data_alls = [];
fetch("http://localhost:3001/api/restaurants")
  .then((response) => response.json())
  .then((json) => {
    console.log("full json", json);
    restaurant_data_alls = json;

    console.log("restaurant_data_alls", restaurant_data_alls.length);

    //show all restaurants
    if (restaurant_data_alls) {
      // excute only if restaurant_data is not undefined
      for (let i = 0; i < restaurant_data_alls.length; i++) {
        console.log("-------name", restaurant_data_alls[i].restaurant_name);
      }

      const sortedRestaurant = restaurant_data_alls.sort((a, b) => {
        return b.average_stars - a.average_stars;
      });
      for (let i = 0; restaurant_data_alls.length ; i++) {
        renderRestaurantCard3(sortedRestaurant[i]);
      
      }

    }
  })
  .catch((error) => console.log(error));






//DOM
const parentID7 = "allRestaurant";
function renderRestaurantCard3(restaurant_data_alls: any) {
  if (!restaurant_data_alls) return; // checking null


  // create div element with class "col-lg-4 col-sm-6"
  const divElement = document.createElement("div");
  divElement.className = "col-lg-4 col-sm-6";

  // create div element with class "service card-effect"
  const divElement2 = document.createElement("div");
  divElement2.className = "service card-effect";
  /////////////next target   add eventhandler
  //const test =
  //divElement2.addEventListener("click", () => { 
  //console.log("clicked"+restaurant_data_index.id);
  //});


  // create div element with class "icons"
  const divElement3 = document.createElement("div");
  divElement3.className = "icons";

  // create div element with class "stars"
  const divElement4 = document.createElement("div");
  divElement4.className = "stars";

  // create div element with class "icons"
  const divElement5 = document.createElement("div");
  divElement5.className = "icons";

  // create i element with class "bi bi-star-fill"
  const iElement = document.createElement("i");
  iElement.className = "bi bi-star-fill";

  // create h5 element with text content "4.5"
  const h5Element = document.createElement("h5");
  h5Element.textContent = restaurant_data_alls.average_stars;

  // append child elements to div element "icons"
  divElement5.appendChild(iElement);
  divElement5.appendChild(h5Element);

  // create div element with class "reviews"
  const divElement6 = document.createElement("div");
  divElement6.className = "reviews";

  // create div element with class "icons"
  const divElement7 = document.createElement("div");
  divElement7.className = "icons";

  // create i element with class "bi bi-chat-left-dots"
  const iElement2 = document.createElement("i");
  iElement2.className = "bi bi-chat-left-dots";
  
  // create h6 element with text content total reviews number
  const h6Element = document.createElement("h6");
  h6Element.textContent = restaurant_data_alls.reviews.length  ;

  // append child elements to div element "icons"
  divElement7.appendChild(iElement2);
  divElement7.appendChild(h6Element);

  // append child elements to div element "reviews"
  divElement6.appendChild(divElement7);

  // append child elements to div element "stars"
  divElement4.appendChild(divElement5);

  // append child elements to div element "icons"
  divElement3.appendChild(divElement4);

  // append child elements to div element "icons"
  divElement3.appendChild(divElement6);

  // create img element with class "restaurantImage img-fluid mt-3" and src
  const imgElement = document.createElement("img");
  imgElement.className = "restaurantImage img-fluid mt-3";
  imgElement.src = "http://localhost:3001/images/restaurants/${restaurant_data_index.image_name}";
  imgElement.alt = "food";

  // create h5 element with class "mt-4 mb-2" and text content "Cafe Rooster"
  const h5Element2 = document.createElement("h5");
  h5Element2.className = "mt-4 mb-2";
  h5Element2.textContent = `${restaurant_data_alls.restaurant_name}`
  //change color to
  h5Element2.style.color = "#EB6440";

  // create p element with text content "Pohjoisesplanadi 5 ,Helsinki , 00100"
  const pElement = document.createElement("p");
  pElement.textContent = `${restaurant_data_alls.street_address}  ,${restaurant_data_alls.city}  , ${restaurant_data_alls.zip_code} `

  // create p element with text content "+358 10 320 6250"
  const pElement2 = document.createElement("p");
  pElement2.textContent = `${restaurant_data_alls.phone_number}`

  // append child elements to div element "service card-effect"
  divElement2.appendChild(divElement3);
  divElement2.appendChild(imgElement);
  divElement2.appendChild(h5Element2);
  divElement2.appendChild(pElement);
  divElement2.appendChild(pElement2);

  // append child elements to div element "col-lg-4 col-sm-6"
  divElement.appendChild(divElement2);

  // append child elements to div element "row"
  const parentElement = document.getElementById(parentID7);
  if (parentElement) {
    parentElement.appendChild(divElement);
  }


  ///////////////////////////////////next target   add eventhandler
//function clickRestaurantCard(restaurant_data_index){
  //console.log("clicked"+restaurant_data_index.id);
}

