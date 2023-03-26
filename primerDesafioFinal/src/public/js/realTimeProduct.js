const socket = io();

socket.emit("realTimeProducts", "productos en tiempo real!");

import {Router} from "express";
import ProductManager from "../service/ProductManager.js";


const router = Router();
const userManager = new ProductManager();


