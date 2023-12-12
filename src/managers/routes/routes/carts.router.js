import { Router } from "express";
import CartManager from "../managers/cartManager.js";

const router = Router();
const cartManager = new CartManager("./carts.json")

router.post('/', async (req, res) => {
    try {
        const response = await cartManager.addCart()
        res.json(response)
    } catch (error) {
        res.send('Error al crear el carrito')
    }
})


router.get('/:cid', async (req, res) => {
    const {cid} = req.params;
    try {
        const response = await cartManager.getCart(cid)
        res.json(response)
    } catch (error) {
        res.send('Error al enviar los productos al carrito')
    }
})
router.post("/:cid/product/:pid", async (request, response) => {
    let { cid, pid } = request.params;
    let res = await cartManager.addProductToCart(cid, pid);
    res?.error
      ? response.status(400).send({ ...res })
      : response.send({ ...res });
  });

export default router;