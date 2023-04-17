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
  
  const cardDiv: HTMLDivElement = document.createElement("div");
  cardDiv.setAttribute("class", "service card-effect");
  
  // const h4img: HTMLHeadElement = document.createElement('h4')
  // h4.innerHTML = image_from_db.title
  // div.append(h4)

  const image: HTMLImageElement = document.createElement("img");
  image.setAttribute("class", "restrantImage img-fluid");
  image.alt = `food1`;
  image.src = `http://localhost:3001/images/${image_from_db.name}`;
  // image.src = `./server/public/img/${image_from_db.name}`
  //image.src = BACKEND_ROOT_URL + '/images/' + data.name
  cardDiv.appendChild(image);
  imgDiv.appendChild(cardDiv);
  images_div.appendChild(imgDiv);
};

const imgDiv: HTMLDivElement = document.createElement("div");
  imgDiv.setAttribute("class", "col-lg-4 col-sm-6");
  
  const cardDiv: HTMLDivElement = document.createElement("div");
  cardDiv.setAttribute("class", "service card-effect");

  imgDiv.appendChild(cardDiv);
  images_div.appendChild(imgDiv);