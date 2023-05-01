import { Image } from "./Image.js";

class Gallery {
  images: Array<Image> = [];
  #backend_url = "";

  constructor(url) {
    this.#backend_url = url;
  }

  getImages = async () => {
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
            resolve(this.images);
          },
          (error) => {
            reject(error);
          }
        );
    });
  };

  #readJson(imagesAsJson: any): void {
    imagesAsJson.forEach((element) => {
      const image: Image = new Image(
        element.id,
        element.img_title,
        element.img_name,
        element.user_id
      );
      this.images.push(image);
    });
  }
}

export { Gallery };
