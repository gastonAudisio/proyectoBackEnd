
import passport from 'passport';
import passportLocal from 'passport-local';
import {userModel} from '../models/user.model.js';
import {cartModel} from '../models/cart.model.js';
import { createHash, isValidPassword } from '../utils.js';


// Declaramos nuestra estrategia
const localStrategy = passportLocal.Strategy;

const initializePassport = ()=>{

    // estrategia register
    passport.use('register', new localStrategy(
    
        { passReqToCallback: true, usernameField: 'email' },
        async(req, username, password, done) =>{
            const { first_name, last_name, email, age } = req.body;
            try {

                const exists = await userModel.findOne({ email });
                if (exists) {
                    console.log("El usuario ya existe.");
                    return done(null, false);
                }
                const user = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password)
                };
                const result = await userModel.create(user);
                console.log("Usuario creado con ID: " + result.id);
                // res.status(201).send({status: "success", message: "Usuario creado con extito con ID: " + result.id});
                return done(null, result);
            } catch (error) {
                return done("Error registrando el usuario: " + error);
            }
        }

    ))


    // estrategia login
    passport.use('login', new localStrategy(
        { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
            try {
                const email = username;
                // Verificar si el correo electrónico es igual al del administrador
                if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
                    req.session.admin = true;
                    console.log('es admin');
                    const user = await userModel.findOne({ email: username }); 
                    if(!user) return done(null, false);
                    
                        if(!isValidPassword(user,password )){
                            return done(null, false);
                    }
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
                    return done(null, user);
                    // res.send({status:"success", payload:req.session.user, message:"¡Primer logueo realizado! :)" });
                } else {
                    req.session.admin = false;
                    console.log('no es admin');
                    const user = await userModel.findOne({email}); 
                    if(!user)return done(null, false);
                    // if(!user) return res.status(401).send({status:"error",error:"Incorrect credentials"});
                        if(!isValidPassword(user,password )){
                            // return res.status(401).send({status:"error",error:"Incorrect credentials"});
                            return done(null, false);
                    }
                        
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
                    return done(null, user);
                    
                
                    }

            } catch (error) {
                return done(error);
            }
        })
    );




    //Funciones de Serializacion y Desserializacion
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await userModel.findById(id);
            done(null, user);
        } catch (error) {
            console.error("Error deserializando el usuario: " + error);
        }
    });
}


export default initializePassport;