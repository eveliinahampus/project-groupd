
import { Gallery } from "./class/Gallery.js"
import { Gallery_Image } from "./class/Gallery_Image.js"

const BACKEND_ROOT_URL = 'http://localhost:3001/api'

const images_div: HTMLDivElement  = <HTMLDivElement>document.querySelector('.row g-4')

const gallery: Gallery = new Gallery(BACKEND_ROOT_URL)

gallery.getImages().then((images: Array<Gallery_Image>) => {
  images.forEach(image => {
    renderImage(image)
  })
}).catch(error => {
  alert(error)
})


const renderImage = (image_from_db) => {
  const imgDiv: HTMLDivElement = document.createElement('div')
  imgDiv.setAttribute('class','col-lg-4 col-sm-6')
  images_div.appendChild(imgDiv)

  const cardDiv: HTMLDivElement = document.createElement('div')
  cardDiv.setAttribute('class','service card-effect')
  imgDiv.appendChild(cardDiv)

  // const h4img: HTMLHeadElement = document.createElement('h4')
  // h4.innerHTML = image_from_db.title
  // div.append(h4)

  const image: HTMLImageElement = document.createElement('img')
  image.setAttribute("class", "restrantImage img-fluid")
  image.alt = `food1`
  image.src = `${BACKEND_ROOT_URL}/images/${image_from_db.id}`
  //image.src = BACKEND_ROOT_URL + '/images/' + data.name 
  cardDiv.appendChild(image)
  
}