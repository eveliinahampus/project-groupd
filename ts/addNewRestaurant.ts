const addRestaurantBtn: HTMLButtonElement = document.querySelector('#add-restaurant')

addRestaurantBtn.addEventListener('click', () => {
  const h6Content: HTMLHeadingElement = document.querySelector("h6")
  const h1Content: HTMLHeadingElement = document.querySelector("h1")
  const form: HTMLFormElement = document.querySelector('form')
  const restaurantNameInput: HTMLInputElement = form.querySelector('input[name="restaurant_id"]')
  const restaurantPhoneInput: HTMLInputElement = form.querySelector('input[name="stars"]')
  const restaurantAddressInput: HTMLInputElement = form.querySelector('input[name="review_title"]')
  const cityDiv: HTMLDivElement = form.querySelector('#textarea')
  const textareaTag: HTMLTextAreaElement = form.querySelector('textarea[name="review_body"]')
  cityDiv.removeChild(textareaTag)

  // Set new values for the headings
  h6Content.innerText = "Add the restaurant's details below"
  h1Content.innerText = "NEW RESTAURANT"

  // Set new attributes for name input
  restaurantNameInput.setAttribute("name","name")
  restaurantNameInput.setAttribute("type","text")
  restaurantNameInput.setAttribute("required","required")
  restaurantNameInput.removeAttribute("min")
  restaurantNameInput.removeAttribute("max")

  // Set new attributes for phone number
  restaurantPhoneInput.setAttribute("name","phone")
  restaurantPhoneInput.setAttribute("type","tel")
  restaurantPhoneInput.removeAttribute("min")
  restaurantPhoneInput.removeAttribute("max")

  // Set new attributes for restaurant address
  restaurantAddressInput.setAttribute("name","address")
  restaurantAddressInput.setAttribute("required","required")

  // Update the placehilders for the input fields
  restaurantNameInput.placeholder = 'Restaurant name *';
  restaurantPhoneInput.placeholder = 'Phone number'
  restaurantAddressInput.placeholder = 'Address *';

  // Clear the inputs and update the form for adding a restaurant
  restaurantNameInput.value = '';
  restaurantPhoneInput.value = '';
  restaurantAddressInput.value = '';

  // Create and set new attributes for restaurant city
  const restaurantCity: HTMLInputElement = document.createElement("input")
  restaurantCity.setAttribute("type","text")
  restaurantCity.setAttribute("class","form-control")
  restaurantCity.setAttribute("name","city")
  restaurantCity.setAttribute("placeholder","City")
   //restaurantCity.value = '';
  cityDiv.appendChild(restaurantCity)

  // Create and set new attributes for restaurant zip code
  const restaurantZipCodeDiv: HTMLDivElement = document.createElement("div")
  restaurantZipCodeDiv.setAttribute("class","col-md-10")
  
  const restaurantZipCodeInput: HTMLInputElement = document.createElement("input")
  restaurantZipCodeInput.setAttribute("type","tel")
  restaurantZipCodeInput.setAttribute("class","form-control")
  restaurantZipCodeInput.setAttribute("name","zip_code")
  restaurantZipCodeInput.setAttribute("placeholder","Zip code")
   //restaurantCity.value = '';
  restaurantZipCodeDiv.appendChild(restaurantZipCodeInput)
  // const fileInputDiv = document.querySelector("#file-input")
  // fileInputDiv.insertBefore(restaurantZipCodeDiv,fileInputDiv)
  cityDiv.insertAdjacentElement("afterend",restaurantZipCodeDiv)

  // Set attribute for button
  const submitFormButton: HTMLButtonElement = form.querySelector("#post-review")
  submitFormButton.innerText = "Add this restaurant"

  // Set new attributes for add restaurant button
  const addRestaurantBtn: HTMLButtonElement = document.querySelector("#add-restaurant")
  addRestaurantBtn.innerText = "Post your review!"
  addRestaurantBtn.addEventListener("click", () => {
    location.reload()
  })

  form.action = 'http://localhost:3001/api/restaurants';
  form.method = 'POST';


});

/*
  "restaurant_name":"Kosmos",
  "phone_number":"+358 9 647 835",
  "street_address":"Kalevankatu 3",
  "city":"Tampere",
  "zip_code":"00100"
*/
