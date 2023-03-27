const socket = io();

socket.emit("message", "productos en tiempo real!");


//const input = document.getElementById('textoEntrada');
const log = document.getElementById('log');

const btnCrearProducto = document.getElementById('btnCrearProducto');
const inputCodigo = document.getElementById('codigo');
const inputTitulo = document.getElementById('titulo');
const inputDescripcion = document.getElementById('descripcion');
const inputPrecio = document.getElementById('precio');
const inputThumbnail = document.getElementById('thumbnail');
const inputStock = document.getElementById('stock');
const inputCategoria = document.getElementById('categoria');
const inputStatus = document.getElementById('status');

btnCrearProducto.addEventListener('click', () => {
  const nuevoProducto = {
    codigo: inputCodigo.value,
    titulo: inputTitulo.value,
    descripcion: inputDescripcion.value,
    precio: inputPrecio.value,
    thumbnail: inputThumbnail.value,
    stock: inputStock.value,
    categoria: inputCategoria.value,
    status: inputStatus.value,
  };
  socket.emit('message2', nuevoProducto);
});


socket.on('log',data=>{
    let logs='';
    data.logs.forEach(log=>{
        logs += `${log.socketid} dice: ${log.message}<br/>`
    })
    log.innerHTML=logs;
});

