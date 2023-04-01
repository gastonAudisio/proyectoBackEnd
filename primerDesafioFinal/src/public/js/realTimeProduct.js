const socket = io();
const btnCrearProducto = document.getElementById("btnCrearProducto");

let products 

function dataProduct(){

  const inputCodigo = document.getElementById('codigo').value;
  const inputTitulo = document.getElementById('titulo').value;
  const inputDescripcion = document.getElementById('descripcion').value;
  const inputPrecio = document.getElementById('precio').value;
  const inputThumbnail = document.getElementById('thumbnail').value;
  const inputStock = document.getElementById('stock').value;
  const inputCategoria = document.getElementById('categoria').value;
  const inputStatus = document.getElementById('status').value;

  if (!(inputCodigo == "" || inputTitulo == "" || inputDescripcion == "" || inputPrecio == "" || inputThumbnail == "" || inputStock == "" || inputCategoria == ""))
  {
    products = {
          code: inputCodigo,
          title: inputTitulo,
          description: inputDescripcion,
          price: inputPrecio,
          thumbnail: inputThumbnail,
          stock: inputStock,
          category: inputCategoria,
          status: inputStatus
    }
    return products;
  }
  else 
    {
    return alert("Debe completar todos los campos");
    }
}

btnCrearProducto.addEventListener("click", (evt) => {
  let productData = dataProduct();
  socket.emit("product",productData);
});

