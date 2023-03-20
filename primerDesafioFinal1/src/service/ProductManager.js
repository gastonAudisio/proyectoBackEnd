import fs from 'node:fs';

class Product{
  constructor(code, title, description,price,thumbnail,stock ){
      this.code = code;
      this.title = title;
      this.description = description;
      this.price = price;
      this.thumbnail = thumbnail;
      this.stock = stock;
  }
};

class ProductManager {

  #users;
  #userDirPath;
  #usersFilePath;
  #fileSystem;

  

  constructor(){
      this.#users = new Array();
      this.#userDirPath = "./files";
      this.#usersFilePath = this.#userDirPath+"/DB.json";
      this.#fileSystem = fs;
  }

//------------------------ METODOS ---------------------------------------

#prepararDirectorioBase = async () =>{
  //Creamos el directorio
  await this.#fileSystem.promises.mkdir(this.#userDirPath, { recursive: true });
 if(!this.#fileSystem.existsSync(this.#usersFilePath)) {
     //Se crea el archivo vacio.
     await this.#fileSystem.promises.writeFile(this.#usersFilePath, "[]");
 }
}

//------------------------------------------------------------------------

addProduct = async (code, title, description,price,thumbnail,stock) => {
  let usuarioNuevo = new Product(code, title, description,price,thumbnail,stock);
  const addNewProduct = {
    productId: Date.now(),
    ...usuarioNuevo,  
  };
  console.log("Crear Producto:");
  console.log(usuarioNuevo);
  try {
      await this.#prepararDirectorioBase();
      await this.getProduct();
      
      if (this.#users.find(u => u.productId === addNewProduct.productId)) {
          console.warn("El producto ya existe, revise los datos nuevamente.");
      } else {
      
          this.#users.push(addNewProduct);
          console.log("Lista actualizada de Productos: ");
          console.log(this.#users);
          //Se sobreescribe el archivos de usuarios para persistencia.
          await this.#fileSystem.promises.writeFile(this.#usersFilePath, JSON.stringify(this.#users,null, 2));
      }
  } catch (error) {
      console.error(`Error creando producto nuevo: ${JSON.stringify(addNewProduct)}, detalle del error: ${error}`);
      throw Error(`Error creando producto nuevo: ${JSON.stringify(addNewProduct)}, detalle del error: ${error}`);
  }
}

//---------------------------------------------------------------------------


getProduct = async () =>{
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


//----------------------------------------------------------------------------

getProductById = async (productId) => {
  try {
    await this.#prepararDirectorioBase();
    await this.getProduct();
    const productFinded = this.#users.find(
      (product) => product.productId === productId
    );

    if (!productFinded) throw new Error(`Product ${productId} Not Found!`);
      console.log("---------getProductById----------");
      return(productFinded);
  } catch (error) {
    throw error;
  }

  }

//----------------------------------------------------------------------------

updateProduct = async (productId,updateData) => {

  const update = updateData;
    if(this.getProductById(productId)){
      await this.#prepararDirectorioBase();
  
      const userPosition =  this.#users.findIndex((u => u.productId === productId));
    
    if (userPosition < 0) {
      return console.log( "Producto no encontrado" );
  }
  this.#users[userPosition] = update;
    await this.#fileSystem.promises.writeFile(this.#usersFilePath, JSON.stringify(this.#users,null, 2));
    console.log("producto modificado");
    return(update);
    }
    else console.log("no se ha encontrado el producto");
};

//----------------------------------------------------------------------------


deleteProduct = async (productId) => {
  try {
    await this.#prepararDirectorioBase();
    await this.getProductById(productId);
    
    if (this.getProductById(productId)){
      const userPosition =  this.getProductById(productId).findIndex((u => u.productId === productId));
      }

      this.#users.splice(index,1);
      console.log(`'--------------Producto ${productId} Eliminado---------------'`);
      console.log(this.#users)
    }
    
  catch (error) {
    throw error;
  }
}



};


export default ProductManager;

