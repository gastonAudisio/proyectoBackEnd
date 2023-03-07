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
    
    updateProduct = async (productId, updatedData) => {
      const fileContent = await fs.promises.readFile(this.path, "utf-8")
      const fileContentParsed = await JSON.parse(fileContent)

      if (await this.getProductById(productId)) {
        const newArr = fileContentParsed.map((item) => {
          return productId == item.productId ? { ...item, ...updatedData } : item 
        })
        console.log( { ...item, ...updatedData });
        await fs.promises.writeFile(this.path, JSON.stringify(newArr))
      } else {
        console.log(`Product ID ${productId} does not exist`)
      }
    }
    }




  module.exports = ProductManager;

