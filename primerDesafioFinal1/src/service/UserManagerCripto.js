
import fs from 'node:fs';


class User{
    constructor(nombre, apellido, username ){
        this.nombre = nombre;
        this.apellido = apellido;
        this.username = username;
        
    }
};

class UserManager {
    #users;
    #userDirPath;
    #usersFilePath;
    #fileSystem;

    

    constructor(){
        this.#users = new Array();
        this.#userDirPath = "./files";
        this.#usersFilePath = this.#userDirPath+"/UsuariosHash.json";
        this.#fileSystem = fs;
    }

    #prepararDirectorioBase = async () =>{
         //Creamos el directorio
         await this.#fileSystem.promises.mkdir(this.#userDirPath, { recursive: true });
        if(!this.#fileSystem.existsSync(this.#usersFilePath)) {
            //Se crea el archivo vacio.
            await this.#fileSystem.promises.writeFile(this.#usersFilePath, "[]");
        }
    }

    crearUsuario = async (nombre, apellido, username) => {
        let usuarioNuevo = new User(nombre, apellido, username);

        console.log("Crear Usuario: usuario a registrar:");
        console.log(usuarioNuevo);
        try {
            //Validamos que exista ya el archivo con usuarios sino se crea vacío para ingresar nuevos:
            await this.#prepararDirectorioBase();
            //Cargamos los usuarios encontrados para agregar el nuevo:
            await this.consultarUsuarios();
            if (this.#users.find(u => u.username === username)) {
                console.warn("Usuario ya existe, revise los datos nuevamente.");
            } else {
                this.#users.push(usuarioNuevo);
                console.log("Lista actualizada de usuaros: ");
                console.log(this.#users);
                //Se sobreescribe el archivos de usuarios para persistencia.
                await this.#fileSystem.promises.writeFile(this.#usersFilePath, JSON.stringify(this.#users));
            }
        } catch (error) {
            console.error(`Error creando usuario nuevo: ${JSON.stringify(usuarioNuevo)}, detalle del error: ${error}`);
            throw Error(`Error creando usuario nuevo: ${JSON.stringify(usuarioNuevo)}, detalle del error: ${error}`);
        }
    }

    consultarUsuarios = async () =>{
        try {
            //Validamos que exista ya el archivo con usuarios sino se crea vacío para ingresar nuevos:
            await this.#prepararDirectorioBase();
            //leemos el archivo
            let usuariosFile = await this.#fileSystem.promises.readFile(this.#usersFilePath, "utf-8");
            //Cargamos los usuarios encontrados para agregar el nuevo:
            //Obtenemos el JSON String 
            //console.info("Archivo JSON obtenido desde archivo: ");
            console.log(usuariosFile);
            this.#users = JSON.parse(usuariosFile);
            console.log("Usuarios encontrados: ");
            console.log(this.#users);
            return this.#users;
        } catch (error) {
            console.error(`Error consultando los usuarios por archivo, valide el archivo: ${this.#userDirPath}, 
                detalle del error: ${error}`);
            throw Error(`Error consultando los usuarios por archivo, valide el archivo: ${this.#userDirPath},
             detalle del error: ${error}`);
        }
    }

    
};

export default UserManager;