
import {Router} from "express";
import CartManager from "../service/CartManager.js";


const router = Router();
const cartManager = new CartManager();


router.post("/", async (req, res) =>{
    try {
        console.log("llamando a Crear Cart:");
        const user = req.body;
        await cartManager.addCart();
        res.status(201).send( "cart creado con éxito! Con Id:");
    } catch (error) {
        console.log("Error guardando producto. Error: " + error); 
        res.status(500).send({error: "Error guardando cart", mensagge: error});
    }
});

//-------------------------------------------------------------------



  router.get('/:cid',async (req, res) => {
    const { cid } = req.params;
    const cart = await cartManager.getCart(cid);
    if (!cart) {
      res.status(404).json({ message: 'Cart not found' });
    } else {
      res.json(cart.products);
    }
  });




export default router;


