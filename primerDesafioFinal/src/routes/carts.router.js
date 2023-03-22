
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



router.get("/:cid", async (req, res) => {
    const cartId = parseInt(req.params.cid);
    let cartById = await cartManager.getCartById(cartId);
    res.send(cartById)
});





export default router;


