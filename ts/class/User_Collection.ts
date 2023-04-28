import { User } from "./User";

class User_Collection {
  users_collection: Array<User> = [];
  #backend_url = "";

  constructor(url) {
    this.#backend_url = url;
  }

  getUsers = async () => {
    return new Promise(async (resolve, reject) => {
      fetch(`${this.#backend_url}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(
          (data) => {
            this.#readJson(data);
            resolve(this.users_collection);
          },
          (error) => {
            reject(error);
          }
        );
    });
  };

  #readJson(usersAsJson: any): void {
    usersAsJson.forEach((element) => {
      const user: User = new User(
        element.id,
        element.username,
        element.email,
        element.password
      );
      this.users_collection.push(user);
    });
  }
}

export { User_Collection }