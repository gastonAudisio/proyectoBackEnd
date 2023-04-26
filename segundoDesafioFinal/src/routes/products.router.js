
//-------------------------------  MONGO  ---------------------------------------------------
import {Router} from "express";
import { productModel } from "../models/product.model.js";

const router = Router();

    // GET RENDER products
    router.get('/products', async (req, res) => {
        try {
        const products = await productModel.find().lean();
        res.render('products', { products: products });
        
        } catch (error) {
        console.error(`Error fetching products: ${error}`);
        res.status(500).send('Internal server error');
        }
    });
//GET products 
router.get("/", async (req, res)=>{
    try {
        let products = await productModel.find()
        console.log(products);
        res.send(products)
    } catch (error) {
        console.error("No se pudo obtener usuarios con moongose: " + error);
        res.status(500).send({error: "No se pudo obtener usuarios con moongose", message: error});
    }
})

//POST products
router.post('/', async (req, res)=>{
    try {
        let {code, title, description,price,thumbnail,stock,category,status} = req.body;
        let product = await productModel.create({code, title, description,price,thumbnail,stock,category,status})
        res.status(201).send(product)
    } catch (error) {
        console.error("No se pudo obtener usuarios con moongose: " + error);
        res.status(500).send({error: "No se pudo obtener usuarios con moongose", message: error});
    }
})



router.get('/',async (req,res)=>{
    const result = await productModel.paginate({});
    console.log(result);
})
export default router;




