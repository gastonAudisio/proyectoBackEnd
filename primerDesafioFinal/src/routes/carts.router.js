
import {Router} from "express";
import CartManager from "../service/CartManager.js";


const router = Router();
const cartManager = new CartManager();


//-------------------------------------------------------------------
/*
router.get("/", async (req, res) => {
    console.log("Consultando carts GET.");
    try {
        let usuarios = await userManager.getCart();
        const limit = req.query.limit;
        if (limit){
            usuarios = usuarios.slice(0, parseInt(limit));
        }
        res.send(usuarios);
    }catch (error){
        console.log("Error consultando los carts. Error: " + error); 
        res.status(500, {error: "Error consultando los carts", mensagge: error});
    }
});
*/
//-------------------------------------------------------------------
/*
router.post("/:cartId", async (req, res) => {
    try {
        console.log("llamando a Crear producto:");
        const cartId = req.params.cartId;
        const { product, quantity } = req.body;
        await userManager.addProduct(cartId);
        res.status(201).send({ mensaje: `Producto agregado con éxito al carrito ${cartId}!`, product, quantity });
    } catch (error) {
        console.log("Error guardando producto. Error: " + error); 
        res.status(500).send({error: "Error guardando producto", mensagge: error});
    }
});*/
//-------------------------------------------------------------------
router.post('/', async(req, res) => {
    const newCart = await cartManager.addCart();
    res.status(201).json(newCart);
  });


  router.get('/:cid',async (req, res) => {
    const { cid } = req.params;
    const cart = await cartManager.getCart(cid);
    if (!cart) {
      res.status(404).json({ message: 'Cart not found' });
    } else {
      res.json(cart.products);
    }
  });
/*
  router.post('/:cid/product/:pid', (req, res) => {
    const { cid, pid } = req.params;
    const quantity = parseInt(req.body.quantity) || 1;
    const added = cartManager.addProduct(cid, pid, quantity);
    if (!added) {
      res.status(404).json({ message: 'Cart or product not found' });
    } else {
      res.status(201).json(added);
    }
  });*/
  



export default router;


