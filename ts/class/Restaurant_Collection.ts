import { Restaurant } from "./Restaurant.js";

class Restaurant_Collection {
  restaurants_collection: Array<Restaurant> = [];
  #backend_url = "";

  constructor(url) {
    this.#backend_url = url;
  }

  getRestuarants = async () => {
    return new Promise(async (resolve, reject) => {
      fetch(this.#backend_url)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(
          (data) => {
            this.#readJson(data);
            resolve(this.restaurants_collection);
          },
          (error) => {
            reject(error);
          }
        );
    });
  };

  #readJson(restaurantsAsJson: any): void {
    restaurantsAsJson.forEach((element) => {
      const restaurants: Restaurant = new Restaurant(
        element.id,
        element.name,
        element.phone_number,
        element.street_address,
        element.city,
        element.zip_code
      );
      this.restaurants_collection.push(restaurants);
    });
  }
}

export { Restaurant_Collection }