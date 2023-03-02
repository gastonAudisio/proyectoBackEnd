class ProductManager {
  static code = 1;
 
    constructor() {
     
      this.products = [];
      this.nameFile = path;
    }
    addProduct=(title,description,price,thumbnail,stock)=>{
      
      
      const existe = this.products.some(el => el.code === ProductManager.code)
      if (existe) {
        return console.log(existe)
      } else {

        this.products.push({code:ProductManager.code,title,description,price,thumbnail,stock})
       ProductManager.code++
      
      }

    }
    getProducts() {
      console.log(this.products)
     }
    getProductById=(id)=>{
      const existe = this.products.some(el => el.code === id)
      const productId = this.products.find( el => el.code === id)
      if(existe){  
        return (console.log("-------------------getProductById-------------------"),
        console.log(productId))
      }
     
   } 

}
const product = new ProductManager()

product.addProduct('ford fiesta','azul','5000','url',5)
product.addProduct('renault clio','rojo','2000','url',6)
product.addProduct('fiat cronos','negro','6000','url',4)

product.getProducts()
product.getProductById(2)





