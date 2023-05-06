import { Router } from 'express';
import passport from 'passport';
import {cartModel} from '../models/cart.model.js';



const router = Router();

//-----------------------------------------------------------------------------
router.post("/register", passport.authenticate('register', { failureRedirect: '/api/sessions/fail-register' }),
    async (req, res) => {
        console.log("Registrando nuevo usuario.");
        res.status(201).send({ status: "success", message: "Usuario creado con extito." });
    });

//-----------------------------------------------------------------------------
 router.post("/login", passport.authenticate('login', { failureRedirect: '/api/sessions/fail-login' }), async (req, res) => {
    console.log("User found to login:");
    const user = req.user;
    console.log(user);
    // Verificar si el correo electrónico es igual al del administrador
    if (user.email === 'adminCoder@coder.com' && user.password === 'adminCod3r123') {
        req.session.admin = true;
        console.log('es admin');
        
        if(!user) return res.status(401).send({status:"error",error:"Incorrect credentials"});
        
        req.session.user = {
            _id: user._id,
            name : `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age,
            rol: "admin"
        };
        const uuser= req.session.user;
        console.log(user.email + ' logueado con exito');
        console.log(uuser._id);
        res.send({status:"success", payload:req.session.user, message:"¡Primer logueo realizado! :)" });
    } else {
        req.session.admin = false;
        console.log('no es admin');
      
        if(!user) return res.status(401).send({status:"error",error:"Incorrect credentials"});
        
            
        req.session.user = {
            _id: user._id,
            name : `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age,
            rol: "usuario"
        }
        const uuser= req.session.user;
        // Crear carrito para el usuario
        const cart = {
            cart_id: user._id,
            products: []
        };
        const cartResult = await cartModel.create(cart);
        console.log('carrito numero ' + cartResult._id +' creado con exito');
        console.log(uuser._id);
        res.send({status:"success", payload:uuser, message:"¡Primer logueo realizado! :)" });
        
    
        }
});

router.get("/fail-register", (req, res) => {
    res.status(401).send({ error: "Failed to process register!" });
});

router.get("/fail-login", (req, res) => {
    res.status(401).send({ error: "Failed to process login!" });
});

    

// router.post("/login", passport.authenticate('login', { failureRedirect: '/api/sessions/fail-login' }), async (req, res) => {
//     console.log("User found to login:");
//     const user = req.user;
//     console.log(user);
//     if (!user) return res.status(401).send({ status: "error", error: "El usuario y la contraseña no coinciden!" });
//     req.session.user = {
//         name: `${user.first_name} ${user.last_name}`,
//         email: user.email,
//         age: user.age
//     }
//     res.send({ status: "success", payload: req.session.user, message: "¡Primer logueo realizado! :)" });
// });

// router.get("/fail-register", (req, res) => {
//     res.status(401).send({ error: "Failed to process register!" });
// });

// router.get("/fail-login", (req, res) => {
//     res.status(401).send({ error: "Failed to process login!" });
// });

//-----------------------------------------------------------------------------
// router.post("/register", async (req, res)=>{
//     const { first_name, last_name, email, age, password} = req.body;
//     console.log("Registrando usuario:");
//     console.log(req.body);

//     const exists = await userModel.findOne({email});
//     if (exists){
//         return res.status(400).send({status: "error", message: "Usuario ya existe."});
//     }
//     const user = {
        
//         first_name,
//         last_name,
//         email,
//         age,
//         password: createHash(password) 
//     };
//     const result = await userModel.create(user)
//     console.log("Usuario creado con ID: " + result.id);
//     res.status(201).send({status: "success", message: "Usuario creado con extito con ID: " + result.id});
// }); 
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------

// router.post("/login", async (req, res)=>{
//     const {email, password} = req.body;

//     // Verificar si el correo electrónico es igual al del administrador
//     if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
//         req.session.admin = true;
//         console.log('es admin');
//         const user = await userModel.findOne({email}); 
//         if(!user) return res.status(401).send({status:"error",error:"Incorrect credentials"});
//             if(!isValidPassword(user,password )){
//                 return res.status(401).send({status:"error",error:"Incorrect credentials"});
//         }
//         req.session.user = {
//             _id: user._id,
//             name : `${user.first_name} ${user.last_name}`,
//             email: user.email,
//             age: user.age,
//             rol: "admin"
//         };
//         const uuser= req.session.user;
//         console.log(user.email + ' logueado con exito');
//         console.log(uuser._id);
//         res.send({status:"success", payload:req.session.user, message:"¡Primer logueo realizado! :)" });
//     } else {
//         req.session.admin = false;
//         console.log('no es admin');
//         const user = await userModel.findOne({email}); 
//         if(!user) return res.status(401).send({status:"error",error:"Incorrect credentials"});
//             if(!isValidPassword(user,password )){
//                 return res.status(401).send({status:"error",error:"Incorrect credentials"});
//         }
            
//         req.session.user = {
//             _id: user._id,
//             name : `${user.first_name} ${user.last_name}`,
//             email: user.email,
//             age: user.age,
//             rol: "usuario"
//         }
//         const uuser= req.session.user;
//         // Crear carrito para el usuario
//         const cart = {
//             cart_id: user._id,
//             products: []
//         };
//         const cartResult = await cartModel.create(cart);
//         console.log('carrito numero ' + cartResult._id +' creado con exito');
//         console.log(uuser._id);
//         res.send({status:"success", payload:uuser, message:"¡Primer logueo realizado! :)" });
        
    
//         }
// });

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
export function checkUser(req, res,next){
    if (req.session.user) {
        next();
      } else {
        console.log("no se ve la sesion de usuario");
        res.redirect('/users/login');
      }
}
export default router;