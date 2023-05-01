let reviews_data_allreviews = [];
fetch("http://localhost:3001/api/reviews")
  .then((response) => response.json())
  .then((json) => {
    console.log("full json", json);
    reviews_data_allreviews = json;

    console.log("reviews_data_allreviews", reviews_data_allreviews.length);

    //show all restaurants
    if (reviews_data_allreviews) {
      // excute only if restaurant_data is not undefined

      //for (let i = 0; i < reviews_data_allreviews.length; i++) {
        //console.log("-------title", reviews_data_allreviews[i].review_title);
        //renderReviewCard2(reviews_data_allreviews[i]);
      //}

      //showing the latest 6 reviews
      const sortedReviews = reviews_data_allreviews.sort((a, b) => {
        return b.created_at - a.created_at;
      }).reverse();
      for (let i = 0; i < reviews_data_allreviews.length; i++) {
        renderReviewCard2(sortedReviews[i]);
      }
    }
  })
  .catch((error) => console.log(error));


  let restaurant_data_allreviews = [];
  fetch("http://localhost:3001/api/restaurants")
    .then((response) => response.json())
    .then((json) => {
      console.log("full json", json);
      restaurant_data_allreviews = json;
  
      console.log("restaurant_data_allreviews", restaurant_data_allreviews.length);
  
      //show all restaurants
      if (restaurant_data_allreviews) {
        // excute only if restaurant_data is not undefined
        for (let i = 0; i < restaurant_data_allreviews.length; i++) {
          console.log("-------name", restaurant_data_allreviews[i].restaurant_name);
        }
  
        // const sortedRestaurant = restaurant_data_allreviews.sort((a, b) => {
        //   return b.average_stars - a.average_stars;
        // });
        // for (let i = 0; i < 3 ; i++) {
        //   renderRestaurantCard(sortedRestaurant[i]);
      
        // }
  
      }
    })
    .catch((error) => console.log(error));
  


  
//DOM
const parentID5 = "allReviews";
function renderReviewCard2(reviews_data_allreviews: any) {
  if (!reviews_data_allreviews) return; // checking null

  // create div element with class "col-lg-4 col-sm-6"
  const divElement = document.createElement("div");
  divElement.className = "col-lg-4 col-sm-6";

  // create div element with class "recommendation"
  const divElement2 = document.createElement("div");

  divElement2.className = "recommendation";

  // create img element with src "../server/public/images/breads.jpg" and alt "food"

  const imgElement = document.createElement("img");
  imgElement.src = "../server/public/images/breads.jpg";
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
  h4Element.textContent = `★${reviews_data_allreviews.stars}  `;

  // create h4 element with class "text-white" and text content "title"
  const h4Element2 = document.createElement("h4");
  h4Element2.className = "text-white";
  h4Element2.textContent = `${reviews_data_allreviews.review_title}`;

  // create p element with class "text-white" and text content "date"
  // show only year-month-day
  const dateString = reviews_data_allreviews.created_at;
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
  h4Element3.textContent = `★${reviews_data_allreviews.stars}  `;

  // create h4 element with class "text-white" and text content "title"
  const h4Element4 = document.createElement("h4");
  h4Element4.className = "text-white";
  h4Element4.textContent = `${reviews_data_allreviews.review_title}`;

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
  pElement3.textContent = `${reviews_data_allreviews.review_body}`;

  //create p element with class "text-white" and text content username
  const pElement4 = document.createElement("p");
  pElement4.className = "text-white";
  pElement4.textContent = `${reviews_data_allreviews.username}`;

  // append child elements to div element "overlay"
  divElement5.appendChild(divElement6);
  divElement5.appendChild(h4Element4);
  divElement5.appendChild(pElement3);
  divElement5.appendChild(pElement4);

  // append child elements to div element "recommendation"
  divElement2.appendChild(imgElement);
  divElement2.appendChild(divElement3);
  divElement2.appendChild(divElement5);

  // restaurant name

  const targetId = reviews_data_allreviews.restaurant_id;
  console.log(targetId);

  // IDがtargetIdと一致するオブジェクトを抽出する
  const filteredObjects = restaurant_data_allreviews.filter(
    (restaurant_data_allreviews) => restaurant_data_allreviews.id === targetId
  );

  // 抽出したオブジェクトを出力する
  console.log("----!!!restname", filteredObjects[0].restaurant_name);

  //DOM　 <h4 class="overlay">restaurant name</h4>
  const h4Element5 = document.createElement("h4");
  h4Element5.className = "overlay";
  h4Element5.textContent = `${filteredObjects[0].restaurant_name}`;
  //change color to
  h4Element5.style.color = "#EB6440";

  // append child elements to div element "col-lg-4 col-sm-6"
  divElement.appendChild(h4Element5);

  // append child elements to div element "col-lg-4 col-sm-6"
  divElement.appendChild(divElement2);

  // append child elements to div element "row"
  const parentElement = document.getElementById(parentID5);
  if (parentElement) {
    parentElement.appendChild(divElement);
  }
}

