const socket = io();

socket.emit("message", "productos en tiempo real!");


const input = document.getElementById('textoEntrada');
const log = document.getElementById('log');

input.addEventListener('keyup',evt=>{
    if(evt.key==="Enter"){
        socket.emit('message2',input.value);
        input.value=""
    }
});
socket.on('log',data=>{
    let logs='';
    data.logs.forEach(log=>{
        logs += `${log.socketid} dice: ${log.message}<br/>`
    })
    log.innerHTML=logs;
});