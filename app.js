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

        this.products.push({code:ProductManager.code++,title,description,price,thumbnail,stock})
       
      
      }

    }
    getProducts() {
      console.log(this.products)
     }
    /*getProductById=(id)=>{
      const existe = products.some(el => el.id === parseInt(id))
      const productId = products.find( el => el.code === parseInt(id))
      if(existe){  
        return console.log(productId)
      }
     
   } */

}
const product1 = new ProductManager('ford fiesta','azul','5000','https://www.google.com/url?sa=i&url=https%3A%2F%2Ffordpussetto.com.ar%2Fvehiculos%2F0km%2Fnuevo-fiesta-4&psig=AOvVaw15PO0EipwGNLFVajx0ecyg&ust=1677077753845000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCPjSgNDvpv0CFQAAAAAdAAAAABAE',5); 
const product2 = new ProductManager('renault clio','rojo','2000','https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.auto10.com%2Fsegunda-mano%2Frenault-clio-rojo%2Fq&psig=AOvVaw17-C6g8cwe1J6OIhT-wqs0&ust=1677078315722000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCKjkv9vxpv0CFQAAAAAdAAAAABAJ',6);
const product3 = new ProductManager('fiat cronos','negro','6000','https://www.google.com/url?sa=i&url=https%3A%2F%2Ffiat.fiorasisa.com.ar%2Ffiat-cronos%2F&psig=AOvVaw00tPRiOYxzHx9SbqBJPNqz&ust=1677082335390000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCICBntiAp_0CFQAAAAAdAAAAABAE://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.auto10.com%2Fsegunda-mano%2Frenault-clio-rojo%2Fq&psig=AOvVaw17-C6g8cwe1J6OIhT-wqs0&ust=1677078315722000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCKjkv9vxpv0CFQAAAAAdAAAAABAJ',4);

product1.addProduct()
product1.getProducts()
//product1.getProductById(1)





