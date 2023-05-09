
//-------------------------------  MONGO  ---------------------------------------------------
import {Router} from "express";
import { productModel } from "../models/product.model.js";
import { checkUser } from '../routes/sessions.router.js';
const router = Router();
    
        
    router.get('/products',checkUser, async (req,res)=>{
        
      let page = parseInt(req.query.page);
      if(!page) page=1;
      const user = req.session.user;
      let result = await productModel.paginate({},{page,limit:2,lean:true})
    //   console.log(result)
      result.prevLink = result.hasPrevPage?`http://localhost:9090/api/products/products?page=${result.prevPage}`:'';
      result.nextLink = result.hasNextPage?`http://localhost:9090/api/products/products?page=${result.nextPage}`:'';
      result.isValid= !(page<=0||page>result.totalPages)

      res.render('products', { ...result, user } );
  })
    
      

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




export default router;



