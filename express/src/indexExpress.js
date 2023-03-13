const express = require('express');
const app = express();
const PORT = 8080;
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const ProductManager = require("../../ProductManager");
const DB = "../../DB.json"
const products = require(DB)
const productManager = new ProductManager(DB);

/*
products.forEach(element => {
    productManager.addProduct(element)
});*/

app.listen(PORT,()=>{
    console.log(`server run in port:${PORT}`);
})

 app.get('/products', (req,res)=>{
    //const product =productManager.getProducts();
    const {limit} = req.query;
    res.json(limit ? products.slice(0,limit):products)
})



app.get('/products/:id', (req, res) => {
    const product =  productManager.getProductById(Number.parseInt(req.params.id))  

    if (product) {
        res.send(product)
    }
    res.send({ messasge: "Producto no encontrado!!" })
})