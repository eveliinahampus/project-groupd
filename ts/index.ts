import { Gallery } from "./class/Gallery.js";
import { Image } from "./class/Image.js";

const BACKEND_ROOT_URL = "http://localhost:3001/api/images";

const images_div: HTMLDivElement = <HTMLDivElement>(
  document.querySelector("#recommendations-container")
);

const gallery: Gallery = new Gallery(BACKEND_ROOT_URL);

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
  const imgDiv: HTMLDivElement = document.createElement("div");
  imgDiv.setAttribute("class", "col-lg-4 col-sm-6");

  const serviceDiv = document.createElement("div");
  serviceDiv.setAttribute("class", "service card-effect");
  serviceDiv.style.borderRadius = "5%"

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
