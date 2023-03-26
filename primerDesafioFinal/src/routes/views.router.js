import express from 'express'
const router = express.Router()
import ProductManager from "../service/ProductManager.js";



const userManager = new ProductManager();


router.get("/productList", async (req, res) => {
    res.render("productList");
    
    
});



  router.get("/realTimeProduct", async (req, res) => {
    res.render("realTimeProduct");
    
    
});


export default router;