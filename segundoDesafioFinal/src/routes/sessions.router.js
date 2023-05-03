import { Router } from 'express';
import userModel from '../models/user.model.js';
import { cartModel } from '../models/cart.model.js';
const router = Router();

//-----------------------------------------------------------------------------
router.post("/register", async (req, res)=>{
    const { first_name, last_name, email, age, password} = req.body;
    console.log("Registrando usuario:");
    console.log(req.body);

    const exists = await userModel.findOne({email});
    if (exists){
        return res.status(400).send({status: "error", message: "Usuario ya existe."});
    }
    const user = {
        first_name,
        last_name,
        email,
        age,
        password 
    };
    const result = await userModel.create(user);

    res.status(201).send({status: "success", message: "Usuario creado con extito con ID: " + result.id});
}); 

//-----------------------------------------------------------------------------

router.post("/login", async (req, res)=>{
    const {email, password} = req.body;

    // Verificar si el correo electrónico es igual al del administrador
    if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
        req.session.admin = true;
        console.log('es admin');
        const user = await userModel.findOne({email, password}); 
        req.session.user = {
            name : `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age,
            rol: "admin"
        };
        console.log(user.email + ' logueado con exito');
        console.log(req.session.user);
        res.send({status:"success", payload:req.session.user, message:"¡Primer logueo realizado! :)" });
    } else {
        req.session.admin = false;
        console.log('no es admin');
        const user = await userModel.findOne({email, password}); 
        if(!user) {
            return res.status(401).send({status:"error",error:"Incorrect credentials"});
        }
            
        req.session.user = {
            name : `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age,
            rol: "usuario"
        }
        // Crear carrito para el usuario
        const cart = {
            user_id: user._id,
            products: []
        };
        const cartResult = await cartModel.create(cart);
        console.log('carrito numero ' + cartResult._id +' creado con exito');


        console.log(user.email + ' logueado con exito');
        console.log(req.session.user);
        res.send({status:"success", payload:req.session.user, message:"¡Primer logueo realizado! :)" });
    }
});

//-----------------------------------------------------------------------------
router.get('/logout', (req, res)=>{
    if (req.session && req.session.user) {
        console.log(`${req.session.user.email}  'deslogueado con mucho exito'`);
     }
     req.session.destroy(error => {
        if(error){
            res.json({error: "Error de logout", msg: 'Error al cerrar session'})
        }
        
        console.log('deslogueado con exito');
        res.clearCookie('connect.sid').send("Sesion cerrada correctamente!!")
    })
})
//-----------------------------------------------------------------------------
function auth(req, res,next){
    if(req.session.user.email === 'adminCoder@coder.com' && req.session.admin){
        return next();
    }else{
        return res.status(403).send('Usuario no autorizado para ingresar al recurso')
    }
}

router.get('/private', auth,  (req, res)=>{
    console.log('usuario autorizado');
    res.render("private", {user: req.session.user})
})
//-----------------------------------------------------------------------------

export default router;