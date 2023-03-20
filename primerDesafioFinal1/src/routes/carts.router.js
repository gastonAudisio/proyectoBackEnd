/*
import {Router} from "express";
import CartManager from "../service/CartManager";

const router = Router();
const userManager = new CartManager();


//-------------------------------------------------------------------
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
//-------------------------------------------------------------------

router.post("/", async (req, res) =>{
    try {
        console.log("llamando a Crear cart:");
        const user = req.body;
        await userManager.addCart( user.cartId);
        res.status(201).send({mensaje: "producto creado con éxito! Con username:" + user.cartId});
    } catch (error) {
        console.log("Error guardando producto. Error: " + error); 
        res.status(500).send({error: "Error guardando producto", mensagge: error});
    }
});
//-------------------------------------------------------------------
router.post("/", async (req, res) =>{
    try {
        console.log("llamando a Crear producto:");
        const user = req.body;
        await userManager.addProduct(user.products,user.quantity);
        res.status(201).send({mensaje: "producto agregado con éxito!:" + user.products});
    } catch (error) {
        console.log("Error guardando producto. Error: " + error); 
        res.status(500).send({error: "Error guardando producto", mensagge: error});
    }
});

export default router;

*/
import {Router} from "express";
import ProductManager from "../service/ProductManager.js";

const userManager = new ProductManager();
const router = Router();


// construir los endpoints
router.get("/", async (req, res) => {
    console.log("Consultando productos GET.");
    try {
        let usuarios = await userManager.getProduct();
        const limit = req.query.limit;
        if (limit){
            usuarios = usuarios.slice(0, parseInt(limit));
        }
        res.send(usuarios);
    }catch (error){
        console.log("Error consultando los productos. Error: " + error); 
        res.status(500, {error: "Error consultando los productos", mensagge: error});
    }
});


router.post("/", async (req, res) =>{
    try {
        console.log("llamando a Crear producto:");
        const user = req.body;
        await userManager.addProduct(user.code, user.title, user.description, user.price, user.thumbnail, user.stock);
        res.status(201).send({mensaje: "producto creado con éxito! Con username:" + user.productId});
    } catch (error) {
        console.log("Error guardando producto. Error: " + error); 
        res.status(500).send({error: "Error guardando producto", mensagge: error});
    }
});

router.delete("/", async (req, res) =>{
    try {
        console.log("llamando a eliminar producto:");
        const user = req.body;
        await userManager.deleteProduct(user.productId);
        res.status(201).send({mensaje: "producto eliminado con éxito! Con producto:" + user.productId});
    } catch (error) {
        console.log("Error guardando producto. Error: " + error); 
        res.status(500).send({error: "Error guardando producto", mensagge: error});
    }
});


export default router;