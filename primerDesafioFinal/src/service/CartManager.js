

import fs from 'node:fs';

class Cart {
  constructor() {
    
    this.products = [];
  }
}


class CartManager {
  #users;
  #userDirPath;
  #usersFilePath;
  #fileSystem;

  constructor() {
    this.#users = new Array();
    this.#userDirPath = "./files";
    this.#usersFilePath = this.#userDirPath+"/carts.json";
    this.#fileSystem = fs;
  }

  //------------------------ METHODS ---------------------------------------

  #prepararDirectorioBase = async () => {
    // Create the directory
    await this.#fileSystem.promises.mkdir(this.#userDirPath, { recursive: true });

    if(!this.#fileSystem.existsSync(this.#usersFilePath)) {
      // Create empty file.
      await this.#fileSystem.promises.writeFile(this.#usersFilePath, "[]");
    }
  }

  addCart = async () => {
    const newCart = new Cart();
    const addNewCart = {
      ...newCart,
      cartId: Date.now()
    };
    console.log("Create Cart:");
    console.log(newCart);
    try {
      await this.#prepararDirectorioBase();
      await this.getCart();
      if (this.#users.find(u => u.cartId === addNewCart.cartId)) {
        console.warn("Cart already exists, check the data again.");
      } else {
        this.#users.push(addNewCart);
        console.log("Updated cart list: ");
        console.log(this.#users);
        // Overwrite the users file for persistence.
        await this.#fileSystem.promises.writeFile(this.#usersFilePath, JSON.stringify(this.#users,null, 2));
      }
    } catch (error) {
      console.error(`Error creating new cart: ${JSON.stringify(addNewCart)}, error detail: ${error}`);
      throw Error(`Error creating new cart: ${JSON.stringify(addNewCart)}, error detail: ${error}`);
    }
  }

  getCart = async () => {
    try {
      // Validate if the file with users already exists or not, if not, create it to add new ones:
      await this.#prepararDirectorioBase();
      // Read the file.
      let usuariosFile = await this.#fileSystem.promises.readFile(this.#usersFilePath, "utf-8");
      // Load found users to add the new ones:
      // Get the JSON String 
      this.#users = JSON.parse(usuariosFile);
      console.log("Found carts: ");
      console.log(this.#users);
      return this.#users;
    } catch (error) {
      console.error(`Error querying users by file, check the file: ${this.#userDirPath}, 
          error detail: ${error}`);
      throw Error(`Error querying users by file, check the file: ${this.#userDirPath},
          error detail: ${error}`);
    }
  }

  getCartById = async (cartId) => {
    try {
      await this.#prepararDirectorioBase();
      await this.getCart();
      const cartFinded = this.#users.find((cart) => cart.cartId === cartId);
      if (!cartFinded) throw new Error(`Cart ${cartId} Not Found!`);
      console.log("---------getCartById----------");
      console.log(cartFinded);
      return cartFinded;
    } catch (error) {
      throw error;
    }
  }
  
};

export default CartManager;



