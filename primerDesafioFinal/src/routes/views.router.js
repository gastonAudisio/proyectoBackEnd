import express from 'express'
const router = express.Router()



router.get("/productList", async (req, res) => {
    res.render("productList");
    
});




export default router;