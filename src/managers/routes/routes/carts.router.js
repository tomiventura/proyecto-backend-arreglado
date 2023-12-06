import { Router } from "express";
const CartManager = require("../cartManager.js") ;

const cartManager = new CartManager

const router = Router();
router.post('/', async (req, res) => {
    try {
        const response = await cartManager.newCart()
        res.json(response)
    } catch (error) {
        res.send('Error al crear el carrito')
    }
})


router.get('/:cid', async (req, res) => {
    const {cid} = req.params;
    try {
        const response = await cartManager.getCartProducts(cid)
        res.json(response)
    } catch (error) {
        res.send('Error al enviar los productos al carrito')
    }
})
router.post('/:cid/products/:pid', async (req, res) => {
    const {cid, pid} = req.params;
    try {
        await cartManager.addProductToCart(cid, pid)
        res.send('Producto agregado exitosamente')
    } catch (error) {
        res.send('Error al intentar guardar el producto en el carrito')
    }
})


module.exports = router