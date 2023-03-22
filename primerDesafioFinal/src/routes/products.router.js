
import {Router} from "express";
import ProductManager from "../service/ProductManager.js";

const router = Router();
const userManager = new ProductManager();


//-------------------------------------------------------------------
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
//-------------------------------------------------------------------
router.post("/", async (req, res) =>{
    try {
        console.log("llamando a Crear producto:");
        const user = req.body;
        await userManager.addProduct(user.code, user.title, user.description, user.price, user.thumbnail, user.stock ,user.category ,user.status );
        res.status(201).send({mensaje: "producto creado con éxito!:" + user.title});
    } catch (error) {
        console.log("Error guardando producto. Error: " + error); 
        res.status(500).send({error: "Error guardando producto", mensagge: error});
    }
});

//-------------------------------------------------------------------

router.get("/:pid", async (req, res) => {
    const productId = parseInt(req.params.pid);
    let productById = await userManager.getProductById(productId);
    res.send(productById)
});


//-------------------------------------------------------------------
router.put("/:pid", async (req, res) => {
    const productId = parseInt(req.params.pid);
    let productById = await userManager.updateProduct(productId,{
        productId:productId,
        code:"111",
        title:"reemplazoooooooo",
        description:"lala",
        price:5600,
        thumbnail:"src/libros/franken.svg",
        stock:2,
        category:"Accion",
        status:true
        
});
    
    res.status(201).send({mensaje: "producto modificado con éxito!"});
});

//-------------------------------------------------------------------


router.delete("/:pid", async (req, res) => {
    
    const productId = parseInt(req.params.pid);
    await userManager.deleteProduct(productId);
    
    res.status(201).send({mensaje: "producto eliminado con éxito!"});
});

//-------------------------------------------------------------------

export default router;