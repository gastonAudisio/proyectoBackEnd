class ProductManager {
    constructor() {
      this.products = [];
    } 

    addProduct=(code,title,description,price,thumbnail,stock,products)=>{
     
      
      this.code = code;
      this.title = title;
      this.description = description;
      this.price = price;
      this.thumbnail = thumbnail;
      this.stock = stock;
      const existe = this.products.some(el => el.code === parseInt(code))
    if (existe) {
        return existe
      } else {
        this.products.push(product1,product2,product3)
        return console.log(this.products)
      }

    }
    /*getProducts() {
      console.log(this.products)
     }*/
     /*getProductById=(id)=>{
      const existe = products.some(el => el.id === parseInt(id))
      const productId = products.find( el => el.code === parseInt(id))
      if(existe){  }
      console.log(productId)
   }*/  
}
const product1 = new ProductManager(1,'ford fiesta','azul','5000','https://www.google.com/url?sa=i&url=https%3A%2F%2Ffordpussetto.com.ar%2Fvehiculos%2F0km%2Fnuevo-fiesta-4&psig=AOvVaw15PO0EipwGNLFVajx0ecyg&ust=1677077753845000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCPjSgNDvpv0CFQAAAAAdAAAAABAE',5); 
const product2 = new ProductManager(2,'renault clio','rojo','2000','https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.auto10.com%2Fsegunda-mano%2Frenault-clio-rojo%2Fq&psig=AOvVaw17-C6g8cwe1J6OIhT-wqs0&ust=1677078315722000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCKjkv9vxpv0CFQAAAAAdAAAAABAJ',6);
const product3 = new ProductManager(3,'fiat cronos','negro','6000','https://www.google.com/url?sa=i&url=https%3A%2F%2Ffiat.fiorasisa.com.ar%2Ffiat-cronos%2F&psig=AOvVaw00tPRiOYxzHx9SbqBJPNqz&ust=1677082335390000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCICBntiAp_0CFQAAAAAdAAAAABAE://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.auto10.com%2Fsegunda-mano%2Frenault-clio-rojo%2Fq&psig=AOvVaw17-C6g8cwe1J6OIhT-wqs0&ust=1677078315722000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCKjkv9vxpv0CFQAAAAAdAAAAABAJ',4);

product1.addProduct()
//product1.getProducts()
//product1.getProductById(1)





