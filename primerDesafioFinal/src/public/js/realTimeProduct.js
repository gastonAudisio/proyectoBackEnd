const socket = io();

socket.emit("realTimeProducts", "productos en tiempo real!");

