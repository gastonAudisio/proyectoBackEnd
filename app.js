class ProductManager {
  static code = 1;
 
    constructor() {
     
      this.products = [];
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

product.addProduct('ford fiesta','azul','5000','https://www.google.com/url?sa=i&url=https%3A%2F%2Ffordpussetto.com.ar%2Fvehiculos%2F0km%2Fnuevo-fiesta-4&psig=AOvVaw15PO0EipwGNLFVajx0ecyg&ust=1677077753845000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCPjSgNDvpv0CFQAAAAAdAAAAABAE',5)
product.addProduct('renault clio','rojo','2000','https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.auto10.com%2Fsegunda-mano%2Frenault-clio-rojo%2Fq&psig=AOvVaw17-C6g8cwe1J6OIhT-wqs0&ust=1677078315722000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCKjkv9vxpv0CFQAAAAAdAAAAABAJ',6)
product.addProduct('fiat cronos','negro','6000','https://www.google.com/url?sa=i&url=https%3A%2F%2Ffiat.fiorasisa.com.ar%2Ffiat-cronos%2F&psig=AOvVaw00tPRiOYxzHx9SbqBJPNqz&ust=1677082335390000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCICBntiAp_0CFQAAAAAdAAAAABAE://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.auto10.com%2Fsegunda-mano%2Frenault-clio-rojo%2Fq&psig=AOvVaw17-C6g8cwe1J6OIhT-wqs0&ust=1677078315722000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCKjkv9vxpv0CFQAAAAAdAAAAABAJ',4)

product.getProducts()
product.getProductById(2)





