

let restaurant_data_allrestaurant = [];
fetch("http://localhost:3001/api/restaurants")
  .then((response) => response.json())
  .then((json) => {
    console.log("full json", json);
    let restaurant_data_allrestaurant = [] = json;

    console.log("restaurant_data_allrestaurant", restaurant_data_allrestaurant.length);

    //show all restaurants
    if (restaurant_data_allrestaurant) {
      // excute only if restaurant_data is not undefined
      for (let i = 0; i < restaurant_data_allrestaurant.length; i++) {
        console.log("-------name", restaurant_data_allrestaurant[i].restaurant_name);
      }

      // const sortedRestaurant = restaurant_data_allrestaurant.sort((a, b) => {
      //   return b.average_stars - a.average_stars;
      // });
      // for (let i = 0; i < 3 ; i++) {
      //   renderRestaurantCard(sortedRestaurant[i]);
    
      // }

    }
  })
  .catch((error) => console.log(error));
