const BACKEND_ROOT_URL = "http://localhost:3001/api/restaurants";

class Restaurant {
  id: number
  name: string
  phone_number: string
  street_address: string
  city: string
  zip_code: string
  restaurants: Array<Restaurant> = [];


  constructor( id:number, name:string, phone_number:string, street_address:string, city:string, zip_code:string) {
    this.id = id
    this.name = name
    this.phone_number = phone_number
    this.street_address = street_address
    this.city = city
    this.zip_code = zip_code

  }

  getRestuarant = async () => {
    return new Promise(async (resolve, reject) => {
      fetch(BACKEND_ROOT_URL)
  
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(
          (data) => {
            this.#readJson(data);
            resolve(this.restaurants);
          },
          (error) => {
            reject(error);
          }
        );
    });
  };
  
  //readJson
  #readJson(restaurantsAsJson: any): void {
    restaurantsAsJson.forEach((element) => {
      const restaurant: Restaurant = new Restaurant(
        element.id,
        element.name,
        element.phone_number,
        element.street_address,
        element.city,
        element.zip_code
      );
      this.restaurants.push(restaurant);
    });
  }
}
//export { Restaurant }

/* 
<div class="col-md-8 mx-auto text-center">
            <h6 class="text-success">More about restaurant</h6>
            <h1>Name / Rocket Burger</h1>
            <p>phone_number: string
              street_address: string
              city: string
              zip_code: string
            </p>
          </div>
 */
/* // create div element with class "col-md-8 mx-auto text-center"
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
pElement.textContent = 'phone_number: string street_address: string city: string zip_code: string';

// append child elements to div element
divElement.appendChild(h6Element);
divElement.appendChild(h1Element);
divElement.appendChild(pElement);

// get parent element and append div element to it
const parentElement = document.getElementById("restaurant-info");
parentElement.appendChild(divElement);
 */

function addRestaurantInfo(phoneNumber, address, city, zipCode, parentID) {
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
  pElement.textContent = `phone_number: ${phoneNumber} street_address: ${address} city: ${city} zip_code: ${zipCode}`;

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

addRestaurantInfo('123-456-7890', '123 Main St', 'Anytown', '12345', 'restaurant-info');