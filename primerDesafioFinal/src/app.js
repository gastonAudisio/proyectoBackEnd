import express from 'express';
import productRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"

const app = express();

//Preparar la configuracion del servidor para recibir objetos JSON.
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// //Routers
app.use("/api/products", productRouter);
app.use("/api/carts", cartsRouter);

app.get("/", (req, res)=>{
   res.send("Hola mundo!");
});

const SERVER_PORT = 9090;
app.listen(SERVER_PORT, () =>{
    console.log("Servidor escuchando por el puerto: " + SERVER_PORT);
});