import {Router} from 'express';

 const ProductManager = require("../productManager.js") ;

const productManager = new ProductManager;

const router = Router()

router.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts()
        res.send({
            status: 'Exito',
            payload: products,
          })
        } catch (error) {
          console.error(error)
          res.status(500).send({
            status: 'Error',
            message: 'Error interno al obtener los productos',
          })
        }
})


router.get('/:pid', async (req, res) => {
    const {pid} = req.params;
    try {
        const products = await productManager.getProductById(pid)
        res.json(products)
    } catch (error) {
        console.log(error);
        res.send(`ERROR AL RECIBIR EL PRODUCTO CON ID ${pid}`)
    }
})


router.post('/', async (req, res) => {
    try {
        const product = req.body;
        const newProduct = await productManager.addProduct(product)
        res.json(newProduct)
    } catch (error) {
        console.log(error);
        res.send(`ERROR AL RECIBIR AGREGAR EL PRODUCTO`)
    }
})

router.put('/:pid', async (req, res) => {
    try {
        const { pid } = req.params
        const upd = await productManager.update(pid, req.body.updatedProduct)
        if (upd === null) {
            return res.status(400).send({
              status: 'Error',
              message: 'No existe el producto',
            })
          }
          res.send({
            status: 'Exito',
            payload: upd,
          })
    } catch (error) {
        console.log(error);
        res.send(`ERROR AL INTENTAR MODIFICAR EL PRODUCTO CON ID ${pid}`)
    }
})

router.delete('/:pid', async (req, res) => {
    try {
        const {pid} = req.params;
        await productManager.deleteProduct(pid)
        res.send('PRODUCTO ELIMINADO CORRECTAMENTE')
    } catch (error) {
        console.log(error);
        res.send(`ERROR AL ELIMINAR EL PRODUCTO CON ID ${pid}`)
    }
})

module.exports = router