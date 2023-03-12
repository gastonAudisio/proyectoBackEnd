const express = require('express');
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const ProductManager = require("../../ProductManager");
const products = "../../DB.json"
const productManager = new ProductManager(products);

const PORT = 8080

app.listen(PORT,()=>{
    console.log(`server run in port:${PORT}`);
})

 app.get('/products', (req,res)=>{
    
    res.send(productManager.getProducts(products))
})


/*
app.get('/:productId',async (req, res) => {

    const product = await productManager.getProductById(req.params.productId)

    if (product) {
        res.send(product)
    }
    res.send({ messasge: "Producto no encontrado!!" })
})*/