import { Gallery } from "./class/Gallery.js";
import { Image } from "./class/Image.js";

const BACKEND_ROOT_URL = "http://localhost:3001/api/images";

const images_div: HTMLDivElement = <HTMLDivElement>(
  document.querySelector(".row.g-4")
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

  const iconsDiv = document.createElement("div");
  iconsDiv.classList.add("icons");

  const recommendationDiv = document.createElement("div");
  recommendationDiv.classList.add("recommendation");
  const recommendationIcon = document.createElement("i");
  recommendationIcon.classList.add("bi", "bi-chat-left-dots");
  const recommendationCount = document.createElement("p");
  recommendationCount.textContent = "32";
  recommendationDiv.appendChild(recommendationIcon);
  recommendationDiv.appendChild(recommendationCount);
  iconsDiv.appendChild(recommendationDiv);

  const favoriteDiv = document.createElement("div");
  favoriteDiv.classList.add("favorite");
  const favoriteIcon = document.createElement("i");
  favoriteIcon.classList.add("bi", "bi-suit-heart-fill");
  const favoriteCount = document.createElement("p");
  favoriteCount.textContent = "100";
  favoriteDiv.appendChild(favoriteIcon);
  favoriteDiv.appendChild(favoriteCount);
  iconsDiv.appendChild(favoriteDiv);

  const starsDiv = document.createElement("div");
  starsDiv.classList.add("stars");
  for (let i = 0; i < 4; i++) {
    const starIcon = document.createElement("i");
    starIcon.classList.add("bi", "bi-star-fill");
    starsDiv.appendChild(starIcon);
  }
  const halfStarIcon = document.createElement("i");
  halfStarIcon.classList.add("bi", "bi-star-half");
  starsDiv.appendChild(halfStarIcon);
  const starsCount = document.createElement("p");
  starsCount.textContent = "4.5";
  starsDiv.appendChild(starsCount);
  iconsDiv.appendChild(starsDiv);

  serviceDiv.appendChild(iconsDiv);

  const restaurantImage = document.createElement("img");
  restaurantImage.setAttribute("class", "restaurantImage img-fluid")
  restaurantImage.src = `http://localhost:3001/images/${image_from_db.name}`;
  restaurantImage.alt = "food1";
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
