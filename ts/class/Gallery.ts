import { Gallery_Image } from "./Gallery_Image.js";

class Gallery {
  images: Array<Gallery_Image> = []
  #backend_url = ''

  constructor(url) {
    this.#backend_url = url
  }

  getImages = async() => {
    return new Promise(async(resolve,reject) => {
      fetch(this.#backend_url)
      .then(response => response.json()) 
      .then((response) => {
        this.#readJson(response)
        resolve(this.images)
      },(error) => {
        reject(error) 
      }) 
    })
  }

  #readJson(imagesAsJson: any): void {
    imagesAsJson.forEach(element => {
      const gallery_image: Gallery_Image = new Gallery_Image(element.id,element.title,element.name)
      this.images.push(gallery_image)
    });
  }
}

export { Gallery }