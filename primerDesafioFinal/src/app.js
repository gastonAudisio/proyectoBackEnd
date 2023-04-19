import express from 'express';
import productRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewRouter from './routes/views.router.js'
import {Server} from 'socket.io'
import ProductManager from './service/ProductManager.js';

import mongoose from 'mongoose';
import usersRouter from './routes/users.router.js'

const app = express();
const userManager = new ProductManager()


const SERVER_PORT = 9090;


//Preparar la configuracion del servidor para recibir objetos JSON.
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// //Routers
app.use("/api/products", productRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/users", usersRouter);

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
app.use('/views', viewRouter)
// const socketServer = new Server
const socketServer = new Server(httpServer);

// Abrimos el canal de comunicacion
socketServer.on('connection', socket=>{
    console.log('Nuevo cliente conectado!');

    socket.on("product", product =>{
    userManager.addProductForm(product)
    })

    socket.on("id", data => {
    userManager.deleteProduct(data)
    })

    // Conectamos la base de datos
const DB = 'mongodb+srv://admin:audisio1@cluster0.7on3jcb.mongodb.net/ecommerce?retryWrites=true&w=majority'
const connectMongoDB = async()=>{
    try {
        await mongoose.connect(DB)
        console.log("Conectado con exito a MongoDB usando Mongoose");
    } catch (error) {
        console.error("No se pudo conectar a la BD usando Moongose: " + error);
        process.exit();
    }
}
connectMongoDB()
});
    
    




