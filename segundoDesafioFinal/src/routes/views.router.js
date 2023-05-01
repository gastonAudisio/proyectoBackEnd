import {Router} from 'express';

const router = Router();



/*=============================================
=                   Session                   =
=============================================*/

// Session management 
router.get('/session', (req, res)=>{
    if(req.session.counter){
        req.session.counter++;
        res.send(`Se ha visitado este sitio ${req.session.counter} veces` )
    }else{
        req.session.counter = 1;
        res.send("Bienvenido!!")
    }
})


// // Login
// router.get('/login', (req, res)=>{
//     const {username, password} = req.query;

//     if(username !== 'pepe' || password !== 'pepepass'){
//         return res.status(401).send("Login failed, check your username")
//     }else{
//         req.session.user = username;
//         req.session.admin = false;
//         res.send("Login Successful!!")
//     }
// })



// // destruir la session
// router.get('/logout', (req, res)=>{
//     req.session.destroy(error => {
//         if(error){
//             res.json({error: "Error de logout", msg: 'Error al cerrar session'})
//         }
//         res.clearCookie('connect.sid').send("Sesion cerrada correctamente!!")
//     })
// })



// // Auth middleware
// function auth(req, res,next){
//     if(req.session.user === 'pepe' && req.session.admin){
//         return next();
//     }else{
//         return res.status(403).send('Usuario no autorizado, para ingresar al recurso')
//     }
// }

// router.get('/private', auth,  (req, res)=>{
//     res.send("Si estas viendo esto es porque pasaste la autorizacion a este recurso!!")
// })


export default router;