const ProductManager = require("./ProductManager");

const PATH = "./DB.json";

const productManager = new ProductManager(PATH);

const executeApp = async () => {
   /* await productManager.addProduct({

        id:3,
        title:"Billy Summers",
        description:"Suspenso",
        price:7800,
        thumbnail:"src/libros/billy.jpg",
        stock:5,

     });*/
     try {
        //await productManager.getProducts();
        //await productManager.getProductById(1678045600176); 
       // await productManager.deleteProduct(1678045609987);
        await productManager.updateProduct(1678045600176,PATH.price=40000);
       // await productManager.deleteAllProducts();
      } catch (error) {
        console.error(error);
      }
    
};

executeApp();



/*
        id:1,
        title:"Heidi",
        description:"Drama",
        price:3500,
        thumbnail:"src/libros/heidi.svg",
        stock:3,
*/
/*
        id:2,
        title:"Frankenstein",
        description:"Terror",
        price:5600,
        thumbnail:"src/libros/franken.svg",
        stock:2,
*/
/*
        id:3,
        title:"Billy Summers",
        description:"Suspenso",
        price:7800,
        thumbnail:"src/libros/billy.jpg",
        stock:5,
        */