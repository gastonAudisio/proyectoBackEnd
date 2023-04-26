// const socket = io();
// const btnCrearProducto = document.getElementById("btnCrearProducto");
// const deleteButton = document.getElementById("delButton");
// const log = document.getElementById("log");
// let products 

// function getId(){
//   const idToDelete = document.getElementById("delId").value
//   return idToDelete
// }
// function dataProduct(){

//   const inputCodigo = document.getElementById('codigo').value;
//   const inputTitulo = document.getElementById('titulo').value;
//   const inputDescripcion = document.getElementById('descripcion').value;
//   const inputPrecio = document.getElementById('precio').value;
//   const inputThumbnail = document.getElementById('thumbnail').value;
//   const inputStock = document.getElementById('stock').value;
//   const inputCategoria = document.getElementById('categoria').value;
//   const inputStatus = document.getElementById('status').value;

//   if (!(inputCodigo == "" || inputTitulo == "" || inputDescripcion == "" || inputThumbnail == "" || inputCategoria == ""))
//   {
//     if(isNaN(inputPrecio) || isNaN(inputStock)) {
//       return alert("Los campos Precio y Stock deben ser números");
//     } else {
//       products = {
//             code: inputCodigo,
//             title: inputTitulo,
//             description: inputDescripcion,
//             price: inputPrecio,
//             thumbnail: inputThumbnail,
//             stock: inputStock,
//             category: inputCategoria,
//             status: inputStatus
//       }
//       return products;
//     }
//   }
//   else 
//     {
//     return alert("Debe completar todos los campos");
//     }
// }

// btnCrearProducto.addEventListener("click", (evt) => {
//   const product = dataProduct();
//   ecommerce.collection("products").insertOne(product, function(err, res) {
//     if (err) throw err;
//     console.log("Producto creado");
//   });
// });

// deleteButton.addEventListener("click", (evt) =>{
//   const id = getId();
//   ecommerce.collection("products").deleteOne({ _id: ObjectId(id) }, function(err, res) {
//     if (err) throw err;
//     console.log("Producto eliminado");
//   });
// });
// import { productModel } from "../../models/product.model.js";
const socket = io();

const btnCrearProducto = document.getElementById("btnCrearProducto");
const deleteButton = document.getElementById("delButton");
const log = document.getElementById("log");


function getId() {
  const idToDelete = document.getElementById("delId").value;
  return idToDelete;
}

function dataProduct() {
  const inputCodigo = document.getElementById("codigo").value;
  const inputTitulo = document.getElementById("titulo").value;
  const inputDescripcion = document.getElementById("descripcion").value;
  const inputPrecio = document.getElementById("precio").value;
  const inputThumbnail = document.getElementById("thumbnail").value;
  const inputStock = document.getElementById("stock").value;
  const inputCategoria = document.getElementById("categoria").value;
  const inputStatus = document.getElementById("status").value;

  if (!(inputCodigo == "" || inputTitulo == "" || inputDescripcion == "" || inputThumbnail == "" || inputCategoria == "")) {
    if (isNaN(inputPrecio) || isNaN(inputStock)) {
      return alert("Los campos Precio y Stock deben ser números");
    } else {
      const product = {
        code: inputCodigo,
        title: inputTitulo,
        description: inputDescripcion,
        price: inputPrecio,
        thumbnail: inputThumbnail,
        stock: inputStock,
        category: inputCategoria,
        status: inputStatus,
      };
      console.log(product)
      return product;

    }
  } else {
    return alert("Debe completar todos los campos");
  }
}

// btnCrearProducto.addEventListener("click", (evt) => {
//   const product = dataProduct();
//   console.log(product)
//   if (product) {
//       productModel.insertOne(product, function (err, res) {
//       if (err) {
//         console.log("Error al crear el producto", err);
//         log.innerHTML = "Error al crear el producto";
//         return;
//       }
//       console.log("Producto creado");
//       log.innerHTML = "Producto creado";
//     });
//   }
// });

// btnCrearProducto.addEventListener("click", (evt) => {
//   const product = dataProduct();
//   console.log(product)
//   if (product) {
//     productModel.insertOne(product, function (err, res) {
//       if (err) {
//         console.log("Error al crear el producto", err);
//         log.innerHTML = "Error al crear el producto";
//         return;
//       }
//       console.log("Producto creado");
//       log.innerHTML = "Producto creado";

//       // Emite el evento 'product' con el objeto 'product' como datos
//       socket.emit('product', product);
//     });
//   }
// });

// deleteButton.addEventListener("click", (evt) => {
//   const id = getId();
//   productModel.deleteOne({ _id: id }, function (err, res) {
//     if (err) {
//       console.log("Error al eliminar el producto", err);
//       log.innerHTML = "Error al eliminar el producto";
//       return;
//     }
//     console.log("Producto eliminado");
//     log.innerHTML = "Producto eliminado";
//     socket.emit('product', product);
//   });
// });


btnCrearProducto.addEventListener("click", (evt) => {
  let productData = dataProduct();
  socket.emit("product",productData);
});

deleteButton.addEventListener("click", (evt) =>{
  let id = getId()
  socket.emit("id", id)
})