/*
import fs from 'node:fs';

class Cart{
    constructor(cartId){
        this.cartId = cartId;
        this.products = [];
    }
};

class CartManager {


    #users;
    #userDirPath;
    #usersFilePath;
    #fileSystem;

    constructor(){
        this.#users = new Array();
        this.#userDirPath = "./files";
        this.#usersFilePath = this.#userDirPath+"/carts.json";
        this.#fileSystem = fs;
    };

  //------------------------ METODOS ---------------------------------------

    #prepararDirectorioBase = async () =>{
        //Creamos el directorio
        await this.#fileSystem.promises.mkdir(this.#userDirPath, { recursive: true });
    if(!this.#fileSystem.existsSync(this.#usersFilePath)) {
        //Se crea el archivo vacio.
        await this.#fileSystem.promises.writeFile(this.#usersFilePath, "[]");
    }
    }

  //----------------------------------------------------------------------------

    addCart = async (cartId) => {
  const newCart = new Cart(cartId);
  const addNewCart = {
    ...newCart,
    cartId: Date.now()
  };
  console.log("Crear Cart:");
  console.log(newCart);
  try {
    await this.#prepararDirectorioBase();
    await this.getCart();
    if (this.#users.find(u => u.cartId === addNewCart.cartId)) {
      console.warn("El cart ya existe, revise los datos nuevamente.");
    } else {
      this.#users.push(addNewCart);
      console.log("Lista actualizada de carts: ");
      console.log(this.#users);
      //Se sobreescribe el archivos de usuarios para persistencia.
      await this.#fileSystem.promises.writeFile(this.#usersFilePath, JSON.stringify(this.#users,null, 2));
    }
  } catch (error) {
    console.error(`Error creando producto nuevo: ${JSON.stringify(addNewCart)}, detalle del error: ${error}`);
    throw Error(`Error creando producto nuevo: ${JSON.stringify(addNewCart)}, detalle del error: ${error}`);
  }
}
  //----------------------------------------------------------------------------

    getCart = async () =>{
        try {
            //Validamos que exista ya el archivo con usuarios sino se crea vacío para ingresar nuevos:
            await this.#prepararDirectorioBase();
            //leemos el archivo
            let usuariosFile = await this.#fileSystem.promises.readFile(this.#usersFilePath, "utf-8");
            //Cargamos los usuarios encontrados para agregar el nuevo:
            //Obtenemos el JSON String 
            this.#users = JSON.parse(usuariosFile);
            console.log("Productos encontrados: ");
            console.log(this.#users);
            return this.#users;
        } catch (error) {
            console.error(`Error consultando los usuarios por archivo, valide el archivo: ${this.#userDirPath}, 
                detalle del error: ${error}`);
            throw Error(`Error consultando los usuarios por archivo, valide el archivo: ${this.#userDirPath},
            detalle del error: ${error}`);
        }
        }
  //----------------------------------------------------------------------------

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
  //----------------------------------------------------------------------------

}

export default CartManager;

*/