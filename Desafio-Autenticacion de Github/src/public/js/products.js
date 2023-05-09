
const socket = io();

const btnCrearProducto = document.getElementById("btnCrearProducto");
const deleteButton = document.getElementById("delButton");



//-------------------------------------------------------------------------

const cartButtons = document.querySelectorAll('.cartButton');

cartButtons.forEach(button => {
  button.addEventListener('click', async (e) => {
    const productId = e.target.dataset.productId; // obtiene el ID del producto que se agregará al carrito
    const cartId = e.target.button.dataset.cartId;
    console.log(productId);
    console.log(cartId);
    console.log("boton apretado");
    try {
      const response = await fetch(`/api/carts/${cartId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productId
        })
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  });
});



function getProductId(button) {
  const productId = button.dataset.productId;
  return productId;
}








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



btnCrearProducto.addEventListener("click", (evt) => {
  let productData = dataProduct();
  socket.emit("product",productData);
});

deleteButton.addEventListener("click", (evt) =>{
  let id = getId()
  socket.emit("id", id)
})