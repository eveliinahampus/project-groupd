const BACKEND_ROOT_URL_INDEX = "http://localhost:3001/api/restaurants";


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
        console.log("-------name", restaurant_data[i].restaurant_name);
      }
      //set the first restaurant as default ,change it later for another restaurant page
      renderRestaurant(restaurant_data[1]);
      renderReview(restaurant_data[1]);
    }
  })
  .catch((error) => console.log(error));