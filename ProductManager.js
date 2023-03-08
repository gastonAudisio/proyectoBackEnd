const fs = require("fs");
class ProductManager {

    constructor(path) {
      this.path = path;
    }
    addProduct = async (newProduct) => {
      try {
        const filenameExists = fs.existsSync(this.path);     
        if (!filenameExists) {
          await fs.promises.writeFile(this.path, "[]");
        }
        const addNewProduct = {
          productId: Date.now(),
          ...newProduct,  
        };
  
        const fileContent = await fs.promises.readFile(this.path, "utf-8");
        const fileContentParsed = JSON.parse(fileContent);
        fileContentParsed.push(addNewProduct);
      
        await fs.promises.writeFile(this.path,JSON.stringify(fileContentParsed, null, 2));
      }
      catch (error) {
        throw error;
      }
    };

//----------------------------------------------------------------
    getProducts = async()=> {
      const fileContent = await fs.promises.readFile(this.path, "utf-8");
      const fileContentParsed = JSON.parse(fileContent);
      console.log(fileContentParsed)
    }
//----------------------------------------------------------------
    getProductById = async (productId) => {
      try {
        const fileContent = await fs.promises.readFile(this.path, "utf-8");
        const fileContentParsed = JSON.parse(fileContent);

        const productFinded = fileContentParsed.find(
          (product) => product.productId === productId
        );

        if (!productFinded) throw new Error(`Product ${productId} Not Found!`);
          console.log("---------getProductById----------");
        console.log(productFinded);
      } catch (error) {
        throw error;
      }

      }
//----------------------------------------------------------------
    deleteProduct = async (productId) => {
      try {
        const fileContent = await fs.promises.readFile(this.path, "utf-8");
        const fileContentParsed = JSON.parse(fileContent);
        if (fileContentParsed){
          const index = fileContentParsed.findIndex((book)=>{
            return book.productId == productId;
          })

          fileContentParsed.splice(index,1);
          console.log(`'--------------Producto ${productId} Eliminado---------------'`);
          console.log(fileContentParsed)
        }
        
      }
      catch (error) {
        throw error;
      }
    };

//----------------------------------------------------------------
    deleteAllProducts = async()=> {
        await fs.promises.unlink(this.path);
        console.log('Se ha eliminado la Base de Datos');
      }

//----------------------------------------------------------------
updateProduct = async (id,updateData) => {
  const update = {...updateData};
    
    if(this.getProductById(id)){
    const fileContent = await fs.promises.readFile(this.path, "utf-8");
    const fileContentParsed = JSON.parse(fileContent);
    fileContentParsed.push(update);
    await fs.promises.writeFile(this.path,JSON.stringify(fileContentParsed, null, 2));
    console.log("producto modificado");
    console.log(update);
    }
    else console.log("no se ha encontrado el producto");
};

    }
  module.exports = ProductManager;
/*

*/