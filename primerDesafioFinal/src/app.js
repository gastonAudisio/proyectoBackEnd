import express from 'express';
import productRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewRouter from './routes/views.router.js'

import {Server} from 'socket.io'

const app = express();


const SERVER_PORT = 9090;
// app.listen(SERVER_PORT, () =>{
//     console.log("Servidor escuchando por el puerto: " + SERVER_PORT);
// });

//Preparar la configuracion del servidor para recibir objetos JSON.
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// //Routers
app.use("/api/products", productRouter);
app.use("/api/carts", cartsRouter);

app.get("/", (req, res)=>{
   res.send("Hola mundo!");
});


//Uso de vista de plantillas
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + "/views");
app.set('view engine', 'handlebars');


//Carpeta public
app.use(express.static(__dirname+'/public'));

const httpServer = app.listen(SERVER_PORT, () => {
    console.log("Servidor escuchando por el puerto: " + SERVER_PORT);
});


// Declaramos el router
app.use('/', viewRouter)


// const socketServer = new Server
const socketServer = new Server(httpServer);


// Abrimos el canal de comunicacion
socketServer.on('connection', socket=>{
    console.log('Nuevo cliente conectado!');
    
        // escuchamos al cliente
        socket.on('mensaje', data=>{
            console.log(data);
        })
    
        socket.emit('msg_02', 'Mesaje enviado desde el back!!')
    
        socket.broadcast.emit("evento_para_todos_excepto_socket_actual", "Este evento es para todos los sockets, menos el socket desde que se emitió el mensaje!");
        
        socketServer.emit("evento_para_todos", "Evento para todos los Sockets!");
    
    //Ejercicio 1
    socket.on("message1",data=>{
        console.log("Recibiendo texto:");
        console.log(data);
        socketServer.emit('log',data);
    });
    
    
     //Ejercicio 2
    const logs = [];
     //Message2 se utiliza para la parte de almacenar y devolver los logs completos.
    socket.on("message2",data=>{
        logs.push({socketid:socket.id,message:data})
        socketServer.emit('log',{logs});
    });
    
    
    })

