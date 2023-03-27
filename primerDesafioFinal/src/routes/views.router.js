import express from 'express'
const router = express.Router()
import ProductManager from "../service/ProductManager.js";



const userManager = new ProductManager();


router.get('/productList', async (req, res) => {
    const productList = await userManager.getProduct();
    res.render('productList', { products: productList });
  });



  router.get("/realTimeProduct", async (req, res) => {
    const productList = await userManager.getProduct();
    res.render('realTimeProduct', { products: productList });
    

});
export default router;