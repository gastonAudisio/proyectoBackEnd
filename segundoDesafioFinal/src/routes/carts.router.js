
// import {Router} from "express";
// import CartManager from "../service/CartManager.js";


// const router = Router();
// const cartManager = new CartManager();

// //-------------------------------------------------------------------

// router.post("/", async (req, res) =>{
//     try {
//         console.log("llamando a Crear Cart:");
//         const user = req.body;
//         await cartManager.addCart();
//         res.status(201).send( "cart creado con éxito! Con Id:");
//     } catch (error) {
//         console.log("Error guardando producto. Error: " + error); 
//         res.status(500).send({error: "Error guardando cart", mensagge: error});
//     }
// });

// //-------------------------------------------------------------------



// router.get("/:cid", async (req, res) => {
//     const cartId = parseInt(req.params.cid);
//     let cartById = await cartManager.getCartById(cartId);
//     res.send(cartById)
// });

// //-------------------------------------------------------------------

// router.post("/:cid/product/:pid", async (req, res) => {
//     try {
//         const cartId = parseInt(req.params.cid);
//         const productId = parseInt(req.params.pid);
//         const cart = await cartManager.getCartById(cartId);
//         if (!cart) {
//             res.status(404).json({ message: "Cart not found" });
//         } else {
//             const updatedCart = await cartManager.addProductToCart(cartId,productId);
//             res.status(200).json(updatedCart);
//         }
//     } catch (error) {
//         console.log("Error add product to cart: " + error);
//         res.status(500).json({ error: "Error add product to cart", message: error });
//         }
//     });



// export default router;


import {Router} from "express";
import { productModel } from "../models/product.model.js";
import { cartModel } from "../models/cart.model.js";
const router = Router();

//GET 
router.get("/", async (req, res)=>{
    try {
        let carts = await cartModel.find()
        console.log(carts);
        res.send(carts)
    } catch (error) {
        console.error("No se pudo obtener usuarios con moongose: " + error);
        res.status(500).send({error: "No se pudo obtener usuarios con moongose", message: error});
    }
})

//POST 
router.post('/', async (req, res)=>{
    try {
        let {products=[]} = req.body;
        let product = await cartModel.create({products})
        res.status(201).send(product)
    } catch (error) {
        console.error("No se pudo obtener usuarios con moongose: " + error);
        res.status(500).send({error: "No se pudo obtener usuarios con moongose", message: error});
    }
})



export default router;


