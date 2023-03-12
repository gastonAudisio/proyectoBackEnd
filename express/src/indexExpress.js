import express from 'express';

const ProductManager = import("./ProductManager");
const products = "./DB.json"
const productManager = new ProductManager(products);


const app = express();
const PORT = 8080

app.listen(PORT,()=>{
    console.log(`server run in port:${PORT}`);
})

 app.get('/products', (req,res)=>{
    res.send(products)
})


/*
app.get('/:userId', (req, res) => {
    // hacemos una busqueda
    const usuario = usuarios.find(u => u.id === req.params.userId);
    if (usuario) {
        res.send(usuario)
    }
    res.send({ messasge: "Usuario no encontrado!!" })
})*/