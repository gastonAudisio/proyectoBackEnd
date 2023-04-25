
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

    // // Route to render products template
    // router.get('/products', async (req, res) => {
    //     try {
    //     const products = await productModel.find().lean();
    //     res.render('products', { products: products });
        
    //     } catch (error) {
    //     console.error(`Error fetching products: ${error}`);
    //     res.status(500).send('Internal server error');
    //     }
    // });
// //GET products
// router.get("/", async (req, res)=>{
//     try {
//         let products = await productModel.find()
//         console.log(products);
//         res.send(products)
//     } catch (error) {
//         console.error("No se pudo obtener usuarios con moongose: " + error);
//         res.status(500).send({error: "No se pudo obtener usuarios con moongose", message: error});
//     }
// })

//POST products
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

// router.get('/',(req,res)=>{
//     res.render('index',{})
// })

// router.get('/',(req,res)=>{
//     res.render('index',{})
// })
router.get('/',async (req,res)=>{
    // let page = parseInt(req.query.page);
    // let limit = parseInt(req.query.limit);
    // const query = {};
    // const sort = {price:1};
    const options = {page:1,limit:10}
    // if(!page) page=1;
    //Lean es crucial para mostrar en Handlebars, ya que evita la "hidratación" del documento de mongoose,
    //esto hace que a Handlebars llegue el documento como plain object y no como Document.
    // let result = await productModel.paginate({},options)
    // result.prevLink = result.hasPrevPage?`http://localhost:9090/products?page=${result.prevPage}`:'';
    // result.nextLink = result.hasNextPage?`http://localhost:9090/products?page=${result.nextPage}`:'';
    // res.render('products',{products:result.docs,totalPages:products.totalPages,currentPage:page})
    const result = await productModel.paginate({}, options);
    console.log(result);
})
export default router;




