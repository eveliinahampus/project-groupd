// import { Gallery } from "./class/Gallery.js";
// import { Image } from "./class/Image.js";


// const BACKEND_ROOT_URL_IMAGES = "http://localhost:3001/api/images";

// const gallery: Gallery = new Gallery(BACKEND_ROOT_URL_IMAGES);





let reviews_data_index = [];
fetch("http://localhost:3001/api/reviews")
  .then((response) => response.json())
  .then((json) => {
    console.log("full json", json);
    reviews_data_index = json;

    console.log("reviews_data_index", reviews_data_index.length);

    //show all restaurants
    if (reviews_data_index) {
      // excute only if restaurant_data is not undefined

      //for (let i = 0; i < reviews_data_index.length; i++) {
        //console.log("-------title", reviews_data_index[i].review_title);
        //renderReviewCard(reviews_data_index[i]);
      //}

      //showing the latest 6 reviews
      const sortedReviews = reviews_data_index.sort((a, b) => {
        return b.created_at - a.created_at;
      }).reverse();
      for (let i = 0; i < 6; i++) {
        renderReviewCard(sortedReviews[i]);

      }
    }
    
  })
  .catch((error) => console.log(error));


let restaurant_data_index = [];
fetch("http://localhost:3001/api/restaurants")
  .then((response) => response.json())
  .then((json) => {
    console.log("full json", json);
    restaurant_data_index = json;

    console.log("restaurant_data_index", restaurant_data_index.length);

    //show all restaurants
    if (restaurant_data_index) {
      // excute only if restaurant_data is not undefined
      for (let i = 0; i < restaurant_data_index.length; i++) {
        console.log("-------name", restaurant_data_index[i].restaurant_name);
      }

      const sortedRestaurant = restaurant_data_index.sort((a, b) => {
        return b.average_stars - a.average_stars;
      });
      for (let i = 0; i < 3 ; i++) {
        renderRestaurantCard(sortedRestaurant[i]);
      
      }

    }
  })
  .catch((error) => console.log(error));

//DOM
const parentID3 = "latestReview";
function renderReviewCard(reviews_data_index: any) {
  if (!reviews_data_index) return; // checking null

  // for (let i = 0; i < reviews_data_index.length; i++) {

  /* 
      <div class="col-lg-4 col-sm-6">
      <div class="recommendation">
        <img src="../server/public/images/breads.jpg" alt="food">
        
        <div class="beforeoverlay">
          <div class="icons">
            <h4 class="text-white">★4</h4>
            <h4 class="text-white">title</h5>
            <p class="text-white">date</p>
          </div>
        </div>
        <div class="overlay">
            <div class="icons">
              <h4 class="text-white">★4</h4>
              <h4 class="text-white">title</h5>
              <p class="text-white">date</p>
            </div>
            <p class="text-white">
              
              body: string
              
              user_id: number
           
            </p>
         </div>

      </div> */

  // create div element with class "col-lg-4 col-sm-6"
  const divElement = document.createElement("div");
  divElement.className = "col-lg-4 col-sm-6";

  // create div element with class "recommendation"
  const divElement2 = document.createElement("div");

  divElement2.className = "recommendation";

  // create img element with src "../server/public/images/breads.jpg" and alt "food"

  const imgElement = document.createElement("img");
  imgElement.setAttribute("id","reviewImage");



  //////////////////imgElement.src = "./server/public/images/breads.jpg";
  imgElement.src = `http://localhost:3001/images/reviews/${reviews_data_index.image_name}`
  imgElement.alt = "food";

  // create div element with class "beforeoverlay"
  const divElement3 = document.createElement("div");
  divElement3.className = "beforeoverlay";

  // create div element with class "icons"
  const divElement4 = document.createElement("div");
  divElement4.className = "icons";

  // create h4 element with class "text-white" and text content "★4"
  const h4Element = document.createElement("h4");
  h4Element.className = "text-white";
  h4Element.textContent = `★${reviews_data_index.stars}  `;

  // create h4 element with class "text-white" and text content "title"
  const h4Element2 = document.createElement("h4");
  h4Element2.className = "text-white";
  h4Element2.textContent = `${reviews_data_index.review_title}`;

  // create p element with class "text-white" and text content "date"
  // show only year-month-day
  const dateString = reviews_data_index.created_at;
  const date = dateString.substring(0, 10);

  const pElement = document.createElement("p");
  pElement.className = "text-white";
  pElement.textContent = `${date}`;

  // append child elements to div element "icons"
  divElement4.appendChild(h4Element);

  divElement4.appendChild(pElement);

  // append child elements to div element "beforeoverlay"
  divElement3.appendChild(divElement4);
  divElement3.appendChild(h4Element2);

  // create div element with class "overlay"
  const divElement5 = document.createElement("div");
  divElement5.className = "overlay";

  // create div element with class "icons"
  const divElement6 = document.createElement("div");
  divElement6.className = "icons";

  // create h4 element with class "text-white" and text content "★4"
  const h4Element3 = document.createElement("h4");
  h4Element3.className = "text-white";
  h4Element3.textContent = `★${reviews_data_index.stars}  `;

  // create h4 element with class "text-white" and text content "title"
  const h4Element4 = document.createElement("h4");
  h4Element4.className = "text-white";
  h4Element4.textContent = `${reviews_data_index.review_title}`;

  // create p element with class "text-white" and text content "date"
  const pElement2 = document.createElement("p");
  pElement2.className = "text-white";
  pElement2.textContent = `${date}`;

  // append child elements to div element "icons"
  divElement6.appendChild(h4Element3);

  divElement6.appendChild(pElement2);

  // create p element with class "text-white" and text content
  const pElement3 = document.createElement("p");
  pElement3.className = "text-white";
  pElement3.textContent = `${reviews_data_index.review_body}`;

  //create p element with class "text-white" and text content username
  const pElement4 = document.createElement("p");
  pElement4.className = "text-white";
  pElement4.textContent = `${reviews_data_index.username}`;

  // append child elements to div element "overlay"
  divElement5.appendChild(divElement6);
  divElement5.appendChild(h4Element4);
  divElement5.appendChild(pElement3);
  divElement5.appendChild(pElement4);

  // append child elements to div element "recommendation"
  divElement2.appendChild(imgElement);
  divElement2.appendChild(divElement3);
  divElement2.appendChild(divElement5);

//   // restaurant name

//   const targetId = reviews_data_index.restaurant_id;
//   console.log(targetId);

//   // IDがtargetIdと一致するオブジェクトを抽出する
//   const filteredObjects = restaurant_data_index.filter(
//     (restaurant_data_index) => restaurant_data_index.id === targetId
//   );

//   // 抽出したオブジェクトを出力する
//   console.log("----!!!restname", filteredObjects[0].restaurant_name);

  //DOM　 <h4 class="overlay">restaurant name</h4>
  const h4Element5 = document.createElement("h4");
  h4Element5.className = "overlay";
  h4Element5.textContent = `${reviews_data_index.restaurant_name}`;
  //change color to
  h4Element5.style.color = "#EB6440";

  // append child elements to div element "col-lg-4 col-sm-6"
  divElement.appendChild(h4Element5);

  // append child elements to div element "col-lg-4 col-sm-6"
  divElement.appendChild(divElement2);

  // append child elements to div element "row"
  const parentElement = document.getElementById(parentID3);
  if (parentElement) {
    parentElement.appendChild(divElement);
  }
}

//DOM
const parentID4 = "top3";
function renderRestaurantCard(restaurant_data_index: any) {
  if (!reviews_data_index) return; // checking null

//DOM
// <div class="col-lg-4 col-sm-6">
//             <div class="service card-effect">
//               <div class="icons" class="recommendation">
//                   <div class="stars">
//                     <div class="icons">
//                       <i class="bi bi-star-fill"></i>
//                       <h5>&nbsp; 4.5</h5>
//                     </div>
//                   </div>
//                   <div class="reviews">
//                     <div class="icons">
//                       <i class="bi bi-chat-left-dots"> </i>
//                       <h6>&nbsp;&nbsp;&nbsp;32</h6>
//                     </div>
//                   </div>
//               </div>
//               <img class="restaurantImage img-fluid mt-3" src="./server/public/images/pizza.jpg" alt="food1">       
//               <h5 class="mt-4 mb-2" >Cafe Rooster</h5>
//               <p>Pohjoisesplanadi 5 ,Helsinki , 00100</p>
//               <p>+358 10 320 6250</p>
//             </div>
//           </div>

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
  h5Element.textContent = restaurant_data_index.average_stars;

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
  h6Element.textContent = restaurant_data_index.reviews.length  ;

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
  imgElement.src = "../server/public/images/pizza.jpg";
  imgElement.alt = "food";

  // create h5 element with class "mt-4 mb-2" and text content "Cafe Rooster"
  const h5Element2 = document.createElement("h5");
  h5Element2.className = "mt-4 mb-2";
  h5Element2.textContent = `${restaurant_data_index.restaurant_name}`
  //change color to
  h5Element2.style.color = "#EB6440";

  // create p element with text content "Pohjoisesplanadi 5 ,Helsinki , 00100"
  const pElement = document.createElement("p");
  pElement.textContent = `${restaurant_data_index.street_address}  ,${restaurant_data_index.city}  , ${restaurant_data_index.zip_code} `

  // create p element with text content "+358 10 320 6250"
  const pElement2 = document.createElement("p");
  pElement2.textContent = `${restaurant_data_index.phone_number}`

  // append child elements to div element "service card-effect"
  divElement2.appendChild(divElement3);
  divElement2.appendChild(imgElement);
  divElement2.appendChild(h5Element2);
  divElement2.appendChild(pElement);
  divElement2.appendChild(pElement2);

  // append child elements to div element "col-lg-4 col-sm-6"
  divElement.appendChild(divElement2);

  // append child elements to div element "row"
  const parentElement = document.getElementById(parentID4);
  if (parentElement) {
    parentElement.appendChild(divElement);
  }


  ///////////////////////////////////next target   add eventhandler
//function clickRestaurantCard(restaurant_data_index){
  //console.log("clicked"+restaurant_data_index.id);
}



