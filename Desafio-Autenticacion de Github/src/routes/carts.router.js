
import {Router} from "express";
import { cartModel } from "../models/cart.model.js";
const router = Router();
//------------------------------------------------------------------
// CARTS RENDERIZADOS
 router.get('/carts', async (req, res) => {
    try {
    const carts = await cartModel.find().populate("products.product").lean();
    res.render('carts',{carts});
    } catch (error) {
    console.error(`Error fetching products: ${error}`);
    res.status(500).send('Internal server error');
    }
});
//------------------------------------------------------------------
//CART POR ID RENDERIZADO
router.get('/carts/:id', async (req, res) => {
    try {
      const cart = await cartModel.findById(req.params.id).populate("products.product").lean(); 
      
      res.render('cartId', { cart }); 
      console.log(cart);
    } catch (error) {
      console.error(`Error fetching cart: ${error}`);
      res.status(500).send('Internal server error');
    }
  });
//------------------------------------------------------------------
//GET 
router.get("/", async (req, res)=>{
    try {
        let carts = await cartModel.find()
        // console.log(carts);
        res.send(carts)
    } catch (error) {
        console.error("No se pudo obtener usuarios con moongose: " + error);
        res.status(500).send({error: "No se pudo obtener usuarios con moongose", message: error});
    }
})
//------------------------------------------------------------------
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

//------------------------------------------------------------------
//PUT
router.put("/:id", async (req, res)=>{
    try {
        const {productId} = req.body;
        const cartId = req.params.id;
        const updatedCart = await cartModel.findByIdAndUpdate(cartId, {$addToSet: {products: {product: productId}}}, {new: true});
        res.status(200).json(updatedCart);
    } catch (error) {
        console.error("No se pudo actualizar el carrito con Mongoose: " + error);
        res.status(500).send({error: "No se pudo actualizar el carrito con Mongoose", message: error});
    }
})
//--------------------------------------------------------------------
router.delete("/:id/products/:pid", async (req, res) => {
    try {
      const productId = req.params.pid;
      const cartId = req.params.id;
  
      const updatedCart = await cartModel.findOneAndUpdate(
        { _id: cartId },
        { $pull: { products: { product: productId } } },
        { new: true }
      );
  
      res.status(200).json(updatedCart);
    } catch (error) {
      console.error("No se pudo actualizar el carrito con Mongoose: " + error);
      res.status(500).send({
        error: "No se pudo actualizar el carrito con Mongoose",
        message: error,
      });
    }
  });
//------------------------------------------------------------------
router.delete("/:id/products", async (req, res) => {
  try {
    const cartId = req.params.id;

    const updatedCart = await cartModel.findByIdAndUpdate(
      { _id: cartId },
      { $set: { products: [] } },
      { new: true }
    );

    res.status(200).json(updatedCart);
  } catch (error) {
    console.error("No se pudo actualizar el carrito con Mongoose: " + error);
    res.status(500).send({
      error: "No se pudo actualizar el carrito con Mongoose",
      message: error,
    });
  }
});

//------------------------------------------------------------------
export default router;


