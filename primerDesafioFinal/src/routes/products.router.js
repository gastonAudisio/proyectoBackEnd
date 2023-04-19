
// import {Router} from "express";
// import ProductManager from "../service/ProductManager.js";

// const router = Router();
// const userManager = new ProductManager();


// //-------------------------------------------------------------------
// router.get("/", async (req, res) => {
//     console.log("Consultando productos GET.");
//     try {
//         let usuarios = await userManager.getProduct();
//         const limit = req.query.limit;
//         if (limit){
//             usuarios = usuarios.slice(0, parseInt(limit));
//         }
//         res.send(usuarios);
//     }catch (error){
//         console.log("Error consultando los productos. Error: " + error); 
//         res.status(500, {error: "Error consultando los productos", mensagge: error});
//     }
// });
// //-------------------------------------------------------------------
// router.post("/", async (req, res) =>{
//     try {
//         console.log("llamando a Crear producto:");
//         const user = req.body;
//         await userManager.addProduct(user.code, user.title, user.description, user.price, user.thumbnail, user.stock ,user.category ,user.status );
//         res.status(201).send({mensaje: "producto creado con éxito!:" + user.title});
//     } catch (error) {
//         console.log("Error guardando producto. Error: " + error); 
//         res.status(500).send({error: "Error guardando producto", mensagge: error});
//     }
// });

// //-------------------------------------------------------------------

// router.get("/:pid", async (req, res) => {
//     const productId = parseInt(req.params.pid);
//     let productById = await userManager.getProductById(productId);
//     res.send(productById)
// });


// //-------------------------------------------------------------------
// router.put("/:pid", async (req, res) => {
//     const productId = parseInt(req.params.pid);
//     let productById = await userManager.updateProduct(productId,{
//         productId:productId,
//         code:"111",
//         title:"reemplazoooooooo",
//         description:"lala",
//         price:5600,
//         thumbnail:"src/libros/franken.svg",
//         stock:2,
//         category:"Accion",
//         status:true
        
// });
    
//     res.status(201).send({mensaje: "producto modificado con éxito!"});
// });

// //-------------------------------------------------------------------


// router.delete("/:pid", async (req, res) => {
    
//     const productId = parseInt(req.params.pid);
//     await userManager.deleteProduct(productId);
    
//     res.status(201).send({mensaje: "producto eliminado con éxito!"});
// });

// //-------------------------------------------------------------------

// export default router;

//-------------------------------  MONGO  ---------------------------------------------------


import {Router} from "express";
import { productModel } from "../models/product.model.js";

const router = Router();

//GET
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

//POST
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

// // PUT
// router.put('/:id', async (req, res)=>{
//     try {
//         let userUpdated = req.body;
//         let user = await productModel.updateOne({_id: req.params.id}, userUpdated);
//         res.status(202).send(user);
//     } catch (error) {
//         console.error("No se pudo obtener usuarios con moongose: " + error);
//         res.status(500).send({error: "No se pudo obtener usuarios con moongose", message: error});
//     }
// })



// "productId": 1679520487162,
// "productId": 1679520651635,
// "productId": 1679522677597,
// "productId": 1679523610673,
// "productId": 1679523678382,